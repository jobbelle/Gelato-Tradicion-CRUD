// Función para cargar los productos en la tabla
async function cargarProductos() {
    try {
        const response = await fetch('backend/consultar.php');
        const productos = await response.json();
        actualizarTabla(productos);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Función para actualizar la tabla con los productos
function actualizarTabla(productos) {
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = '';

    productos.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.tipo || 'N/A'}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio_compra}</td>
            <td>${producto.precio_venta}</td>
            <td>
                <button onclick="editarProducto(${producto.id})" class="btn-editar">
                    Editar
                </button>
                <button onclick="eliminarProducto(${producto.id})" class="btn-eliminar">
                    Eliminar
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para eliminar un producto
async function eliminarProducto(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        return;
    }

    try {
        const formData = new FormData();
        formData.append('id', id);

        const response = await fetch('backend/eliminar.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert(result.message);
            cargarProductos();
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al intentar eliminar el producto');
    }
}

// Función para cargar los datos del producto en el formulario de edición
async function editarProducto(id) {
    try {
        const response = await fetch(`backend/obtener_producto.php?id=${id}`);
        const producto = await response.json();
        
        if (producto) {
            document.getElementById('editModal').style.display = 'block';
            document.getElementById('edit-id').value = producto.id;
            document.getElementById('edit-nombre').value = producto.nombre;
            document.getElementById('edit-tipo').value = producto.tipo;
            document.getElementById('edit-cantidad').value = producto.cantidad;
            document.getElementById('edit-precioCompra').value = producto.precio_compra;
            document.getElementById('edit-precioVenta').value = producto.precio_venta;
        }
    } catch (error) {
        console.error('Error al cargar el producto:', error);
        alert('Error al cargar los datos del producto');
    }
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Event listener para el formulario de agregar productos
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('backend/agregar.php', {
            method: 'POST',
            body: formData,
        });
        
        const result = await response.json();
        if (result.status === 'success') {
            alert(result.message);
            e.target.reset();
            cargarProductos();
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error al intentar agregar el producto');
    }
});

// Event listener para el formulario de edición
document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('backend/actualizar.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        if (result.status === 'success') {
            alert(result.message);
            cerrarModal();
            cargarProductos();
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error en la actualización:', error);
        alert('Error al actualizar el producto');
    }
});

// Event listener para la búsqueda
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const tableBody = document.getElementById('productTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let row of rows) {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    }
});

// Cargar productos cuando la página se inicia
document.addEventListener('DOMContentLoaded', cargarProductos);