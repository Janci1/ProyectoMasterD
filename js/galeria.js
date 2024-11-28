//LOS MAS VENDIDOS desde JSON

document.addEventListener('DOMContentLoaded', function() {
    const cajaProductos = document.querySelector('.productosVenta .cajaProductos');
    const cajaProductosTipo = document.querySelector('.tienda .cajaProductoPorTipo');

    //datos de los productos
    fetch('../js/productos.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(productos) {
            //Ordenar los productos
            const productosMasVendidos = productos.sort(function(a, b) {
                return b.ventas - a.ventas;
            }).slice(0, 5);

            //Generar los productos
            const productosHTML = productosMasVendidos.map(function(producto) {
                return `
                    <div class="tarjetaProducto">
                        <div class="imagenProducto">
                            <img src="${producto.imagen}" 
                                 alt="${producto.nombre}" 
                                 class="producto-img"
                                 width="401"
                                 height="567">

                            <div class="nombrePrecio">
                                <div class="efectoPrecio">
                                    <p>${producto.nombre}</p>
                                    <p>${producto.precio} €</p>
                                </div>
                            </div>
                        </div>
                        <div class="productInfo">
                            <button class="botonComprar" 
                                data-nombre="${producto.nombre}" 
                                data-tipo="${producto.tipo}" 
                                data-precio="${producto.precio}">
                                Añadir al carrito
                            </button>                            
                        </div>
                    </div>
                    `;
                    }).join('');
               //Insertar en la caja de productos
                cajaProductos.innerHTML = productosHTML;
                
                           
            
            //Agrupar por tipo
            const productosAgrupados = productos.reduce(function (grupos, producto) {
                const tipo = producto.tipo;
                if (!grupos[tipo]) {
                    grupos[tipo] = [];
                }
                grupos[tipo].push(producto);
                return grupos;
            }, {});
            //Generar cada tipo
            Object.keys(productosAgrupados).forEach(function(tipo) {
                const productosDelTipo = productosAgrupados[tipo];

                //Crear el titulo
                const tituloSeccion = document.createElement('div');
                tituloSeccion.classList.add('tituloProductos');
                tituloSeccion.id = tipo.replace(/\s+/g, ''); // ID basado en el tipo
                tituloSeccion.innerHTML = `<h2>${tipo.toUpperCase()}</h2>`;

                //Crear el contenedor
                const cajaProductos = document.createElement('div');
                cajaProductos.classList.add('cajaProductos');

                //generar producto
                productosDelTipo.forEach(function(producto) {
                    const tarjetaHTML = `
                        <div class="tarjetaProducto">
                            <div class="imagenProducto">
                                <img src="${producto.imagen}" 
                                     alt="${producto.nombre}" 
                                     class="producto-img"
                                     width="401"
                                     height="567">

                                <div class="nombrePrecio">
                                    <div class="efectoPrecio">
                                        <p>${producto.nombre}</p>
                                        <p>${producto.precio} €</p>
                                    </div>
                                </div>
                            </div>
                            <div class="productInfo">
                                <button class="botonComprar" 
                                    data-nombre="${producto.nombre}" 
                                    data-tipo="${producto.tipo}" 
                                    data-precio="${producto.precio}">
                                    Añadir al carrito
                                </button>                            
                            </div>
                        </div>
                    `;
                    cajaProductos.innerHTML += tarjetaHTML;
                });

                //Insertar
                cajaProductosTipo.appendChild(tituloSeccion);
                cajaProductosTipo.appendChild(cajaProductos);
            });
            
            //Iniciar carrito
            asignarBotones();
        });
});

$(document).ready(function() {
    //Cargar los datos
    let productos = [];
    $.getJSON('../js/productos.json', function(data) {
        productos = data;
    });

    //Abrir la galeria al hacer click
    $(document).on('click', '.producto-img', function() {
        const tarjetaProducto = $(this).closest('.tarjetaProducto');
        const rutaImagen = $(this).attr('src'); 
        const nombreProducto = tarjetaProducto.find('.efectoPrecio p:first-child').text(); 
        const precioProducto = tarjetaProducto.find('.efectoPrecio p:nth-child(2)').text(); 

        //descripcion del producto
        const productoJSON = productos.find(function(producto) {
            return producto.nombre === nombreProducto;
        });

        const descripcionProducto = productoJSON ? productoJSON.descripcion : 'Descripción no disponible.';

        //datos del producto
        $('#imagenGaleria').attr('src', rutaImagen); 
        $('#nombreProducto').text(nombreProducto); 
        $('#descripcionProducto').text(descripcionProducto); 
        $('#precioProducto').text(precioProducto);

        //Mostrar la galeria
        $('#ventanaGaleria').fadeIn();
    });

    //Cerrar la galeria boton de cerrar
    $('.cerrarGaleria').on('click', function() {
        $('#ventanaGaleria').fadeOut();
    });

    //Cerrar la galeri click fuera
    $('#ventanaGaleria').on('click', function(evento) {
        if ($(evento.target).is('#imagenGaleria')) return;
        $(this).fadeOut();
    });
});
            
