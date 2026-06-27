<?php

if (!empty($_POST['message']) && !empty($_POST['agree']))
{
	$dsn = "pgsql:host=pg;port=5432;dbname=studs;";
	$pdo = new PDO($dsn, 'kuchin', 'AYDvFhe9npAczL', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

	$ip = $_SERVER['REMOTE_ADDR'];

	$name = trim($_POST['name']);
	$contact = trim($_POST['contact']);
	$message = trim($_POST['message']);
	
	$query = $pdo->query("INSERT INTO orders VALUES (DEFAULT, '$name', '$contact', '$message', DEFAULT, now(), '$ip')");

	echo "Заявка отправлена, номер 233. <a href='index.html'>Заполнить заново.</a>";

}
else
{
	echo "Заявка не отправлена, пустые поля. <a href='index.html'>Заполнить заново.</a>";

}

?>