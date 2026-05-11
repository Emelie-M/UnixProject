<?php
/*
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


$stmt = $pdo->prepare("SELECT id, Username, Password FROM User WHERE Username = ?");
$stmt->execute([$username]);

$user = $stmt->fetch();

if (!$user) {
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit;
}

if (password_verify($password, $user["Password"])) {

    $_SESSION["user_id"] = $user["id"];
    $_SESSION["username"] = $user["Username"];

    echo json_encode([
        "success" => true,
        "message" => "Login successful"
    ]);

} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid password"
    ]);
}

?><?php

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


$stmt = $pdo->prepare("SELECT id, Username, Password FROM User WHERE Username = ?");
$stmt->execute([$username]);

$user = $stmt->fetch();

if (!$user) {
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit;
}


if (password_verify($password, $user["Password"])) {

    $_SESSION["user_id"] = $user["id"];
    $_SESSION["username"] = $user["Username"];

    echo json_encode([
        "success" => true,
        "message" => "Login successful"
    ]);

} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid password"
    ]);
}
*/


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

$stmt = $pdo->prepare("SELECT id, Username, Password FROM User WHERE Username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit;
}

if (password_verify($password, $user["Password"])) {
    $_SESSION["user_id"] = $user["id"];
    $_SESSION["username"] = $user["Username"];
    echo json_encode(["success" => true, "message" => "Login successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid password"]);
}

?>