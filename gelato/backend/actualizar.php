<?php
require 'conectar.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $tipo = $_POST['tipo'];
    $cantidad = $_POST['cantidad'];
    $precioCompra = $_POST['precioCompra'];
    $precioVenta = $_POST['precioVenta'];

    if (empty($nombre) || $cantidad <= 0 || $precioCompra <= 0 || $precioVenta <= 0) {
        echo json_encode(["status" => "error", "message" => "Por favor completa todos los campos correctamente."]);
        exit;
    }

    $sql = "UPDATE productos SET 
            nombre = '$nombre',
            tipo = '$tipo',
            cantidad = $cantidad,
            precio_compra = $precioCompra,
            precio_venta = $precioVenta 
            WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Producto actualizado exitosamente"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al actualizar el producto: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}

$conn->close();
?>