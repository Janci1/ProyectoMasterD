let carrito = [];

//cargar carrito
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

//guardar carrito
function guardarCarrito() {
    try {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log('Carrito guardado con éxito:', carrito);
    } catch (error) {
        console.error('Error al guardar en Local Storage:', error);
    }
}

//Añadir producto al carrito
function productoAlCarrito(id, nombre, precio) {
    const productoExistente = carrito.find(function(producto){ 
        return producto.nombre === nombre;
    });

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    guardarCarrito();
    actualizarContador();
}

//actualizar el contador
function actualizarContador() {
    const contadorCesta = document.getElementById('contadorCesta');
    if (!contadorCesta) return;

    const totalProductos = carrito.reduce(function (suma, producto) {
        return suma + producto.cantidad;
    }, 0);
    contadorCesta.textContent = totalProductos;

    contadorCesta.style.display = totalProductos > 0 ? 'inline-block' : 'none';
}

//funcion de botones
function asignarBotones() {
    var botonesComprar = document.querySelectorAll('.botonComprar');

    botonesComprar.forEach(function (boton) {
        boton.addEventListener('click', function () {
            var id = boton.getAttribute('data-tipo');
            var nombre = boton.getAttribute('data-nombre');
            var precio = parseFloat(boton.getAttribute('data-precio'));

            if (!id || !nombre || isNaN(precio)) {
                console.error('Datos del producto inválidos:', { id: id, nombre: nombre, precio: precio });
                return;
            }

            productoAlCarrito(id, nombre, precio);
        });
    });
}

//Iniciar el carrito
document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();
    actualizarContador();
});