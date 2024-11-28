document.addEventListener('DOMContentLoaded', function () {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || []; //Recuperar carrito

    //Mostrar productos lista
    function mostrarCarrito() {
        var productosCarrito = document.getElementById('productosCarrito');
        productosCarrito.innerHTML = ''; // Limpiar lista

        var cantidadTotal = 0;
        var precioTotal = 0;

        carrito.forEach(function (producto) {
            var fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio} €</td>
            `;
            productosCarrito.appendChild(fila);

            cantidadTotal += producto.cantidad;
            precioTotal += producto.precio * producto.cantidad;
        });

        //Actualizar el resumen
        document.getElementById('cantidadTotal').textContent = cantidadTotal;
        document.getElementById('precioTotal').textContent = precioTotal.toFixed(2) + ' €';
    }

    //Calcular presupuesto
    function calcularResumen() {
        var productoSelect = document.getElementById('producto');
        var plazoInput = document.getElementById('plazo');
        var extrasSeleccionados = document.querySelectorAll('.extras input[type="checkbox"]:checked');
    
        //Precio del producto
        var precioProducto = parseFloat(productoSelect.options[productoSelect.selectedIndex].dataset.precio);
    
        //Capturar el plazo
        var plazo = parseInt(plazoInput.value);
        var descuento = (precioProducto * plazo) / 100;
    
        //Sumar los extras
        var extrasNombres = [];
        var extrasPrecio = 0;
    
        extrasSeleccionados.forEach(function(extra) {
            extrasNombres.push(extra.nextElementSibling.textContent);
            extrasPrecio += parseFloat(extra.value);
        });
    
        //calcular subtotal
        var subtotal = precioProducto + extrasPrecio - descuento;
    
        //calcular IVA y total
        var iva = subtotal * 0.21;
        var total = subtotal + iva;
    
        //Actualizar el resumen
        document.getElementById('productoElegido').textContent = productoSelect.options[productoSelect.selectedIndex].text;
        document.getElementById('plazoElegido').textContent = plazo + ' días';
        document.getElementById('subtotal').textContent = subtotal.toFixed(2) + ' €';
        document.getElementById('iva').textContent = iva.toFixed(2) + ' €';
        document.getElementById('total').textContent = total.toFixed(2) + ' €';
    
        //Mostrar los extras seleccionados
        var extrasResumen = document.getElementById('extrasResumen');
        if (extrasResumen) {
            extrasResumen.innerHTML = extrasNombres.length > 0 ? extrasNombres.join('<br>') : 'Ninguno';
        }
    }

    //Validar los datos
    function validarFormularioContacto(event) {
        event.preventDefault(); //esta seccion la hice con la ayuda de chat GPT por que no podia validar lo que queria o me daba errores.
        var nombre = document.getElementById('nombre');
        var apellidos = document.getElementById('apellidos');
        var telefono = document.getElementById('telefono');
        var correo = document.getElementById('correo');

        //Validaciones
        if (!/^[\p{L}\s]{1,40}$/u.test(nombre.value)) {
            alert('Nombre no válido. Debe contener solo letras y máximo 15 caracteres.');
            return;
        }

        if (!/^[\p{L}\s]{1,20}$/u.test(apellidos.value)) {
            alert('Apellidos no válidos. Deben contener solo letras y máximo 20 caracteres.');
            return;
        }

        if (!/^\d{9}$/.test(telefono.value)) {
            alert('Teléfono no válido. Debe contener 9 dígitos.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(correo.value)) {
            alert('Correo electrónico no válido.');
            return;
        }
        finalizarCompra();
    }

    //Finalizar la compra
    function finalizarCompra() {
        alert('Gracias por su compra');
        localStorage.removeItem('carrito'); 
        carrito = []; 
        actualizarContador(); 
        document.getElementById('formularioPresupuesto').reset();
        document.getElementById('formularioContacto').reset();
        location.reload();
}
    //Actualizar carrito
    mostrarCarrito();

   
    document.getElementById('formularioPresupuesto').addEventListener('change', calcularResumen);    
    document.getElementById('formularioContacto').addEventListener('submit', validarFormularioContacto);
});