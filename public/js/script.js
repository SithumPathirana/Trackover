 
 var lattitude=6.874092099999999;
 var longitude=79.8604934;



  function myMap() {
  var myCenter = new google.maps.LatLng(lattitude,longitude);
  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: myCenter, zoom: 12};
  var map = new google.maps.Map(mapCanvas, mapOptions);
  var marker = new google.maps.Marker
  ({position:myCenter
    //,
    //icon:'Images/Location_marker_pin_map_gps.png' 
  });
  marker.setMap(map);
}







