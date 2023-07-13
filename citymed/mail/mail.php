<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);


// Название сайта
$sitename = "CityMed";
// От кого письмо
$mail_from = "noreply@ik-coding.co.ua";
// Кому
$mail_to = "info@ik-coding.co.ua";

// ID формы
$formID = htmlspecialchars(urldecode(trim($_POST['form-id'])));
// Телефон пользователя
$phone = htmlspecialchars(urldecode(trim($_POST['phone'])));

// ПИСЬМО
$subject = "Заявка с сайта $sitename";
$body_message = 
  (isset($formID) && !empty($formID) ? "<p><strong>Форма, с которой отправлено письмо: </strong> {$formID}</p><br/>" : '') .
  (isset($phone) && !empty($phone)   ? "<p><strong>Телефон: </strong> {$phone}</p>" : '');

try {
  //Recipients
  $mail->setFrom($mail_from, 'Test');
  $mail->addAddress($mail_to);

  //Content
  $mail->isHTML(true);
  $mail->CharSet = 'UTF-8';
  $mail->Subject = $subject;
  $mail->Body    = $body_message;

  $mail->send();
  $res_msg =  'Письмо успешно отправлено';
} catch (Exception $e) {
  $res_msg = "Письмо не отправлено. Mailer Error: {$mail->ErrorInfo}";
}

$response = ['message' => $res_msg];
header('Content-type: application/json');
echo json_encode($response);
?>