// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    //id: 'mapbox/streets-v11',
    //tileSize: 512,
    ///zoomOffset: -1,
    accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    //id: 'mapbox/streets-v11',
    //tileSize: 512,
    ///zoomOffset: -1,
    accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    //id: 'mapbox/streets-v11',
    //tileSize: 512,
    ///zoomOffset: -1,
    accessToken: API_KEY
});


// Create the map object with a center and zoom level.
// let map = L.map("mapid").setView([40.7, -94.5], 4);

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
 center: [40.7, -94.5],
 zoom: 4,
 layers:[streets]
});

let baseMaps= {
    "Streets": streets,
    "Satellite": satellite,
    "Dark": dark
};

let allEarthquakes =new L.LayerGroup();
let tectonicplates= new L.LayerGroup();
let majorEarthquakes = new L.LayerGroup();

let overlays= {
    "Tectonic Plates": tectonicplates,
    "Earthquakes": allEarthquakes,
    "Major Earthquakes": majorEarthquakes
}
// Create Title Layer
//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    maxZoom: 19,
//    attribution: '© OpenStreetMap'
//}).addTo(map);


// Then we add our 'graymap' tile layer to the map.
L.control.layers(baseMaps, overlays).addTo(map);

d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(platedata){
    L.geoJson(platedata,{
        color:"#ff6500"
    }).addTo(tectonicplates);
    tectonicplates.addTo(map);
})
