<?php

header("Content-Type: application/json");
include "database.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"] ?? '');
$password = trim($data["password"] ?? '');

if (!$username || !$password) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

/* check if user exists */
$check = $pdo->prepare("SELECT id FROM User WHERE Username = ?");
$check->execute([$username]);

if ($check->fetch()) {
    echo json_encode(["success" => false, "message" => "Username already exists"]);
    exit;
}

/* hash password */
$hashed = password_hash($password, PASSWORD_DEFAULT);

/* insert */
$stmt = $pdo->prepare("INSERT INTO User (Username, Password) VALUES (?, ?)");
$stmt->execute([$username, $hashed]);

echo json_encode([
    "success" => true,
    "message" => "Signup successful"
]);

?>