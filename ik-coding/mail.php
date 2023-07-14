<?php
// Декодинг json данных (если передаем в этом формате)
//$_POST = json_decode(file_get_contents("php://input"), true);

// E-Mail получателя
$mailTo = "info@ik-coding.co.ua";
// E-Mail отправителя
$mailFrom = "noreply@ik-coding.co.ua";
// Название сайта
$sitename = "ik-coding.co.ua";

// ID формы
$formID = htmlspecialchars(urldecode(trim($_POST['form-id'])));
// Имя пользователя
$name = htmlspecialchars(urldecode(trim($_POST['name'])));
// E-Mail пользователя
$email = htmlspecialchars(urldecode(trim($_POST['email'])));
// Сообщение пользователя
$msg = htmlspecialchars(urldecode(trim($_POST['message'])));

// ПИСЬМО ==============================================================================

// Кодировка, заголовок
$headers  = "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=utf-8\n";
$headers .= "From: {$mailFrom}\n";

// Тема письма
$subject = "Заявка с сайта \"$sitename\"";

// Текст сообщения
$message .= "<p><strong> С какой версии сайта заявка:</strong> {$formID}</p>";
$message .= isset($name) && !empty($name) ? "<p><strong>Имя: </strong> {$name}</p>" : '';
$message .= isset($email) && !empty($email) ? "<p><strong>E-Mail: </strong> {$email}</p>" : '';
$message .= isset($msg) && !empty($msg) ? "<p><strong>Сообщение: </strong><br> {$msg}</p>" : '';

//======================================================================================

// ОТПРАВКА
if (mail($mailTo,$subject,$message,$headers, "-f{$mailFrom}")) {
	return true;
} else {
	return false;
}
?>