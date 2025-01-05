<?php
require 'conectar.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    $sql = "SELECT * FROM productos WHERE id = $id";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode(["status" => "error", "message" => "Producto no encontrado"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "ID no proporcionado"]);
}

$conn->close();
?>