<?php
$host = 'localhost';
$db   = 'Project';
$user = 'webapp';
$pass = 'Passw0rd';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
try {
     $pdo = new PDO($dsn, $user, $pass);
     echo "Connected successfully!";
} catch (PDOException $e) {
     echo "Connection failed: " . $e->getMessage();
}
?>
