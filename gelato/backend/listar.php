<?php
header('Content-Type: application/json');

include 'conectar.php';

$sql = "SELECT id, nombre, tipo, cantidad, precio_compra, precio_venta FROM productos";
$result = $conn->query($sql);

$productos = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

echo json_encode($productos);
$conn->close();
?>