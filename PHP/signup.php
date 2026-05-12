<?php
session_start();
header("Content-Type: application/json");
include "database.php";

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data["username"] ?? '');
$password = trim($data["password"] ?? '');

if (!$username || !$password) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

if (!preg_match('/^[a-f0-9]{64}$/', $password)) {
    echo json_encode(["success" => false, "message" => "Invalid password format"]);
    exit;
}

$check = $pdo->prepare("SELECT UserId FROM User WHERE Username = ?");
$check->execute([$username]);

if ($check->fetch()) {
    echo json_encode(["success" => false, "message" => "Username already exists"]);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("INSERT INTO User (Username, Password) VALUES (?, ?)");
    $stmt->execute([$username, $hashed]);
    echo json_encode(["success" => true, "message" => "Signup successful"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>