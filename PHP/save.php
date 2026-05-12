<?php
session_start();
header("Content-Type: application/json");
include "database.php";

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$musicIds = $data["musicIds"] ?? [];
$userId = $_SESSION["user_id"];

$pdo->prepare("DELETE FROM Playlist WHERE UserId = ?")->execute([$userId]);

$stmt = $pdo->prepare("INSERT INTO Playlist (UserId, MusicId, Name, Time) VALUES (?, ?, ?, '00:00:00')");

foreach ($musicIds as $item) {
    $stmt->execute([$userId, $item["musicId"], $item["name"]]);
}

echo json_encode(["success" => true, "message" => "Playlist saved"]);
?>