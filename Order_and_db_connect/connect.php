<PRE>

<?php

$host = 'pg';
$db = 'studs';
$user = 'kuchin';
$password = 'AYDvFhdMe9npAczL';

$dsn = "pgsql:host=$host;port=5432;dbname=studs;";
$pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

$query = $pdo->query('SELECT * FROM students');
$resultset = $query->fetchAll(\PDO::FETCH_ASSOC);

foreach($resultset as $user)
{
    echo $user['lastname'] . " " . $user['firstname'] . "<br>";
}


?>