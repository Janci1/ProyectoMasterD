    //botones del slider
    $(document).ready(function () {
        let currentIndex = 0;
        const slides = $('#slider .sliderImagen'); 
        const totalSlides = slides.length;
    
        //Creamos indicadores
        for (let i = 0; i < totalSlides; i++) {
            $('.indicadores').append(`<button data-index="${i}"></button>`);
        }
    
        const indicators = $('.indicadores button');
        updateIndicators(); //indicador activo
    
        //imagen específica
        function showSlide(index) {
            currentIndex = index;
            slides.hide();
            slides.eq(currentIndex).fadeIn(400); // Mostrar la actual con efecto
            updateIndicators();
        }
    
        function updateIndicators() {
            indicators.removeClass('active');
            indicators.eq(currentIndex).addClass('active');
        }
    
        //Botón "Siguiente"
        $('.siguiente').click(function () {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        });
    
        //Botón "Anterior"
        $('.anterior').click(function () {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            showSlide(currentIndex);
        });
    
        //funcion del indicador
        indicators.click(function () {
            const index = $(this).data('index');
            showSlide(index);
        });

        //Navegacion automatica
        setInterval((function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
        }), 9000);
    
    });

    

//LOS MAS VENDIDOS desde JSON

document.addEventListener('DOMContentLoaded', function() {
    const cajaProductos = document.querySelector('.productosVenta .cajaProductos');

    //productos
    fetch('js/productos.json')
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

            // Insertar en la caja de productos
            cajaProductos.innerHTML = productosHTML;

            // Iniciar
            asignarBotones();
        })
});

$(document).ready(function() {
    //productos desde  JSON
    let productos = [];
    $.getJSON('js/productos.json', function(data) {
        productos = data;
    });

    //Abrir la galeria
    $(document).on('click', '.producto-img', function() {
        const tarjetaProducto = $(this).closest('.tarjetaProducto');
        const rutaImagen = $(this).attr('src');
        const nombreProducto = tarjetaProducto.find('.efectoPrecio p:first-child').text();
        const precioProducto = tarjetaProducto.find('.efectoPrecio p:nth-child(2)').text();

        //descripcion de JSON
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

    //Cerrar la galeria botón de cerrar
    $('.cerrarGaleria').on('click', function() {
        $('#ventanaGaleria').fadeOut();
    });

    //Cerrar la galeria clic fuera
    $('#ventanaGaleria').on('click', function(evento) {
        if ($(evento.target).is('#imagenGaleria')) return;
        $(this).fadeOut();
    });
});

//agregar noticias desde el archivo JSON

document.addEventListener('DOMContentLoaded', function() {
    const cajaNoticias = document.querySelector('.reportaje .cajaNoticiasPosicion');

    // Obtener los datos de las noticias
    fetch('js/noticias.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (noticias) {
            // Generar el HTML para las noticias
            const noticiasHTML = noticias.map(function (noticia) {
                // Recortar el contenido para mostrar solo las primeras líneas
                const resumen = noticia.contenido.split(' ').slice(0, 12).join(' ') + '...';

                return `
                    <div class="tarjetaNoticia">
                        <div class="imagenNoticia">
                            <a href="${noticia.link}" target="_blank" rel="noopener noreferrer">
                                <img src="${noticia.imagen}" alt="${noticia.titulo}">
                            </a>
                        </div>
                        <div class="contenidoNoticia">
                            <h3>${noticia.titulo}</h3>
                            <div>
                                <p class="resumen">${resumen}</p>
                                <a href='${noticia.link}' target='_blank' class='leerMas'>Leer más</a>
                            </div>
                            <a href="./views/Contacto.html" class="linkUnete">¡Unete al movimiento libre!</a>
                        </div>
                    </div>
                `;
            }).join('');

            // Insertar el HTML en la caja de noticias
            cajaNoticias.innerHTML = noticiasHTML;
        })
})