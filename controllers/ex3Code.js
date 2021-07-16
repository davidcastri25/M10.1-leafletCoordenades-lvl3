/* ////////// Nivel 3 ////////// */
let myMarker = L.icon({
    iconUrl: "./images/miMarcador.png",
    iconSize: [40, 60],
    iconAnchor: [20.5, 60],
    popupAnchor: [0, -60] //x = 30 (ancho) y = 60 (altura) Con esto definimos el punto de la imagen que marcará la ubicación
});



/* ////////// Nivel 1 - Fase 1 ////////// */

//Proveedor de Tiles: Open Street Map
const tilesProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

let mapFase1 = L.map("mapFase1").setView([41.38715190920178, 2.1700741025685213], 16); //setView(arrayCoordenadas, zoom)

//Definimos

//En el tileLayer le pasamos nustro proveedor y un objeto con las características, y lo añadimos a nuestro mapa.
let tileLayerOptions = {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18
};

L.tileLayer(tilesProvider, tileLayerOptions).addTo(mapFase1);



/* ////////// Nivel 2 - Fase 2 ////////// */
//Marcador en Carrer Balmes 16
let marker = L.marker([41.3868561, 2.1661102]).addTo(mapFase1);

marker.bindPopup("<b>Restaurant Centfocs</b><br><br>Restaurante mediterráneo<br>Carrer de Balmes, 16, 08007 Barcelona");




/* ////////// Nivel 2 - Fase 1 y 2 ////////// */
mapFase1.on("click", e => {
    //Primero obtenemos la latitud y longitud del click
    let latLng = mapFase1.mouseEventToLatLng(e.originalEvent);

    //Borramos marcador anterior
    mapFase1.removeLayer(marker);

    //Agregamos nuevo marcador y ///NIVEL 3 /// le añadimos mi icono
    marker = L.marker([latLng.lat, latLng.lng], { icon: myMarker }).addTo(mapFase1);

    //Agregamos popUp al nuevo marcador, queremos que se abra automáticamente
    marker.bindPopup("<b>Mis coordenadas son:</b><br><br>Lat: " + latLng.lat + "<br>Lng: " + latLng.lng).openPopup();

    //Ajustamos el centro del mapa y el zoom a la nueva selección (el zoom será el zoom máximo definido en las opciones de tileLayer)
    mapFase1.setView(latLng, tileLayerOptions.maxZoom);
});