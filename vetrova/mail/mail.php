<?php
// Название сайта
$sitename = "ik-coding.co.ua";
// E-Mail отправителя
$mailFrom = "noreply@ik-coding.co.ua";
// E-Mail получателя
$mailTo = "info@ik-coding.co.ua";
// E-Mail получателя копии письма
$copyTo = "spxfrontend@gmail.com";

// Поля формы
$formID = trim(urldecode(htmlspecialchars($_POST["form_id"])));
$name = trim(urldecode(htmlspecialchars($_POST["name"])));
$email = trim(urldecode(htmlspecialchars($_POST["email"])));
$phone = trim(urldecode(htmlspecialchars($_POST["phone"])));
$msg = trim(urldecode(htmlspecialchars($_POST["message"])));

// Письмо
$subject = "Заявка с сайта \"$sitename\"";

$message .= "<h1>Данные формы:</h1>";

if(!empty($formID)) {
  $message .= "<p><strong>ID-формы: </strong>{$formID}</p>";
}

if(!empty($name)) {
  $message .= "<p><strong>Имя: </strong> {$name}</p>";
}

if(!empty($email)) {
  $message .= "<p><strong>E-Mail: </strong> {$email}</p>";
}

if(!empty($phone)) {
  $message .= "<p><strong>Телефон: </strong> {$phone}</p>";
}

if(!empty($msg)) {
  $message .= "<p><strong>Сообщение: </strong><br> {$msg}</p>";
}

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: {$mailFrom}" . "\r\n";

$success = mail($mailTo,$subject,$message,$headers, "-f{$mailFrom}");

if ($success) {
  http_response_code(200);
  echo "Письмо успешно отправлено отправлено";
} else {
  http_response_code(500);
  echo "Письмо не отправлено";
}