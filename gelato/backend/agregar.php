<?php
header('Content-Type: application/json');

include 'conectar.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $tipo = $_POST['tipo'] ?? '';
    $cantidad = $_POST['cantidad'] ?? 0;
    $precioCompra = $_POST['precioCompra'] ?? 0;
    $precioVenta = $_POST['precioVenta'] ?? 0;

    if (empty($nombre) || empty($tipo) || $cantidad <= 0 || $precioCompra <= 0 || $precioVenta <= 0) {
        echo json_encode(["status" => "error", "message" => "Por favor completa todos los campos correctamente."]);
        exit;
    }

    $sql = "INSERT INTO productos (nombre, tipo, cantidad, precio_compra, precio_venta) 
            VALUES ('$nombre', '$tipo', $cantidad, $precioCompra, $precioVenta)";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Producto agregado exitosamente."]);
    } else {
        error_log("Error en la consulta SQL: " . $conn->error . "\n", 3, "error_log.txt");
        echo json_encode(["status" => "error", "message" => "Error al agregar el producto: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}

$conn->close();
?>