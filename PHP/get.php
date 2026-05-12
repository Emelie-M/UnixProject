<?php
session_start();
header("Content-Type: application/json");
include "database.php";

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$userId = $_SESSION["user_id"];

$stmt = $pdo->prepare("
    SELECT m.MusicId, m.SongName, m.Artist
    FROM Playlist p
    JOIN Music m ON p.MusicId = m.MusicId
    WHERE p.UserId = ?
");
$stmt->execute([$userId]);
$rows = $stmt->fetchAll();

$playlist = array_map(fn($row) => [
    "musicId" => $row["MusicId"],
    "name"    => $row["SongName"],
    "artist"  => $row["Artist"]
], $rows);

echo json_encode(["success" => true, "playlist" => $playlist]);
?>