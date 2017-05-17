// globals L
  var mymap = L.map('mapid').setView([32.70454, 35.29818], 18);
  var popup = L.popup();

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW9oYW1lZG9tYXJpaSIsImEiOiJjajJzdGVlcTQwMDU4MzNzM2d5emkxcmhwIn0.9dMJv1kQOZovU2TVvZ5FIw').addTo(mymap);

function onMapClick(position){
    console.log(position.latlng.toString());
}
mymap.on('click', onMapClick);

var circle = L.circle([32.70456, 35.29810], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 10
}).addTo(mymap);
