 function myMap() {
  var myCenter = new google.maps.LatLng(6.874092099999999,79.8604934);
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


function getLocation(){
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("trackover");
  var query = { lattitude: 6.4185 };
  dbo.collection("locations").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

}

