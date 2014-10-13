var Google500 = Google500 || {};

Google500.mash500px = function(url, map){
  
$.ajax({
    type: "GET",
    dataType: "json",
    url: url,
    success: function(data)
    {
      // Google500.markers = [];
      data.photos.forEach(function photoIterator(photo)
      {
        var marker = new google.maps.Marker({
          icon: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSPKG4Q7NkGMPHAAW9xauI9R_kfYHBPY3iTQBUv_9zvJUQ0irXV',
          position: new google.maps.LatLng(photo.latitude, photo.longitude),
          map: map,
          draggable: false,
          animation: google.maps.Animation.DROP,
          title: name || "Unnamed"
        });
        Google500.markers.push(marker);

        var dom = $('<div>').append($("<h1>").text(photo.name)).append($("<img>").attr('src', photo.image_url)); 

        var infoWindow = new google.maps.InfoWindow(
        {
          content: dom.html()
        });

         // infoWindow.open(map, marker);

        google.maps.event.addListener(marker, 'click', function onMarkerClick()
        {
          infoWindow.open(map, marker);
        });
      })

    }
});
};