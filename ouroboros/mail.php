<?php
// E-Mail получателя
$mailTo = "info@ik-coding.co.ua";
// E-Mail отправителя
$mailFrom = "norply@ik-coding.co.ua";
// Название сайта
$sitename = "ouroboros.website";

// ПОЛУЧАЕМ ДАННЫЕ ФОРМЫ ===============================================================
// ID формы
$formID = htmlspecialchars(urldecode(trim($_POST['form-id'])));
// Имя пользователя
$name = htmlspecialchars(urldecode(trim($_POST['name'])));
// Способ связи с пользователем
$contact = htmlspecialchars(urldecode(trim($_POST['contact'])));
// Ответы на вопросы квиза
$q1 = $_POST['question1'];
$q2 = $_POST['question2'];
$q3 = $_POST['question3'];
$q4 = $_POST['question4'];
$q5 = $_POST['question5'];
$q6 = $_POST['question6'];

// ПИСЬМО ==============================================================================
// Кодировка, заголовок
$headers  = "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=utf-8\n";
$headers .= "From: {$mailFrom}\n";

// Тема письма
$subject = "Письмо с сайта \"$sitename\"";

// Текст сообщения
$message .= "<p><strong>Название формы:</strong> {$formID}</p>";
$message .= isset($name) && !empty($name) ? "<p><strong>Имя: </strong> {$name}</p>" : '';
$message .= isset($contact) && !empty($contact) ? "<p><strong>Способ связи: </strong> {$contact}</p>" : '';

if($formID == 'квиз') {
  $message .= "<br><p><strong>Ответы на вопросы квиза:</strong></p>";
  $message .= "<p><strong>Ответ 1: </strong> {$q1}</p>";
  $message .= "<p><strong>Ответ 2: </strong> {$q2}</p>";
  $message .= "<p><strong>Ответ 3: </strong> {$q3}</p>";
  $message .= "<p><strong>Ответ 4: </strong> {$q4}</p>";
  $message .= "<p><strong>Ответ 5: </strong> {$q5}</p>";
  $message .= "<p><strong>Ответ 6: </strong> {$q6}</p>";
}

// ОТПРАВКА ============================================================================
if (mail($mailTo,$subject,$message,$headers, "-f{$mailFrom}")) {
	return true;
} else {
	return false;
}
?>