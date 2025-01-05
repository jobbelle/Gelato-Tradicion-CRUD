<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gelato";

$conn = new mysqli($servername, $username, $password, $dbname, 3307);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Error de conexión: " . $conn->connect_error]));
}
?>
