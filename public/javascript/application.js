var Google500 = Google500 || {};

Google500.markers = [];

Google500.initialize = function() {
  var myLatlng = new google.maps.LatLng(49.289801, -123.123913);

  var mapOptions = {
    zoom: 13,
    center: myLatlng
  }

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var input = ( document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(10, 10),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  function getPhotos(latlng) { //type of latlng is google.maps.LatLng
    var url_500 = 'https://api.500px.com/v1/photos/search?geo=' + latlng.lat() + ',' + latlng.lng() + ',' + "2km&rpp=6&image_size=2&consumer_key=w1bf65Ok4pc4a8vE5SJPiDReCOwTiuub0vkROOTu";
    var url_instagram = 'https://api.instagram.com/v1/media/search?lat='+ latlng.lat() +'&lng=' + latlng.lng() + '&access_token=1492901827.7772142.31c51d8c25244a9192b59d0017d6018a';
    //Remove old markers
    Google500.markers.forEach(function(marker) {
      marker.setMap(null);
    });
    if(!window.stopGrabbingMarkers) {
      Google500.instagramMash(url_instagram, map);
      Google500.mash500px(url_500, map);
    }

  }

  google.maps.event.addListener(map, 'dragend', function onMapDragEnd() {
    console.info("Drag end");
    getPhotos(map.getCenter());
  });


  console.info("Initializing");
  getPhotos(map.getCenter()); //this runs once on page load

}

google.maps.event.addDomListener(window, 'load', Google500.initialize);
