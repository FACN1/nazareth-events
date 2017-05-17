// globals L
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW9oYW1lZG9tYXJpaSIsImEiOiJjajJzdGVlcTQwMDU4MzNzM2d5emkxcmhwIn0.9dMJv1kQOZovU2TVvZ5FIw').addTo(mymap);
