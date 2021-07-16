// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});


// Create the map with our layers
var map = L.map("map", {
  center: [0, -74.0059],
  zoom: 6,
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);


// Perform an API call to Earthquake Database
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson").then(function(quakeInfo) {

// Loop through the quakes (they're the same size and have partially matching data)
for (var i = 0; i < Math.max(quakeInfo.features.length, 100); i++) {
    // Create a new quake object
    var quake = Object.assign({}, quakeInfo.features[i]);
    var quakeCoordinates = quake.geometry.coordinates
    // Create a new marker with the appropriate icon and coordinates
    var newMarker = L.marker([quakeCoordinates[0], quakeCoordinates[1]]);
    // Bind a popup to the marker that will  display on click. This will be rendered as HTML
    newMarker.bindPopup("popup");
    newMarker.addTo(map);
}
    // Call the updateLegend function, which will... update the legend!
    updateLegend();
});


// Update the legend's innerHTML with the last updated time and quake count
function updateLegend() {
  document.querySelector(".legend").innerHTML = [
    "Earth",
    "Quake"
  ].join("");
}
