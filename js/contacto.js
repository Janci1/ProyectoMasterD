 //Coordenadas
 const businessLocation = { lat: 40.41507, lng: -3.70324 }; // Reemplaza con tus coordenadas

 function initMap() {
     // ubicacion
     const map = new google.maps.Map(document.getElementById("mapa"), {
         center: businessLocation,
         zoom: 20,
     });

     //marcador mapa
     const marker = new google.maps.Marker({
         position: businessLocation,
         map: map,
         title: "Ubicación de nuestro negocio",
     });

     //Street View
     const panorama = new google.maps.StreetViewPanorama(
         document.getElementById("street-view"),
         {
             position: businessLocation,
             pov: { heading: 10, pitch: 0 },
             zoom: 0,
         }
     );

     map.setStreetView(panorama);
 }

 //Inicializar mapa
 window.onload = initMap;

//calcular rutas
function calcularRuta() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    //mapa
    const map = new google.maps.Map(document.getElementById("mapa"), {
        center: businessLocation,
        zoom: 15,
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById("listaIndicaciones"));

    const inputDireccion = document.getElementById("direccion").value;

    if (inputDireccion) {
        //Obtener ruta
        directionsService.route(
            {
                origin: inputDireccion,
                destination: businessLocation,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            function(result, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                } else {
                    alert("No se pudo calcular la ruta. Por favor, verifica la dirección.");
                }
            }
        );
    } else {
        alert("Por favor, introduce una dirección válida.");
    }
}

//boton
document.getElementById("calcularRuta").addEventListener("click", function() {
    calcularRuta();
});