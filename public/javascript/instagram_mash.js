var Google500 = Google500 || {};

Google500.instagramMash = function(url, map){

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: url,
    success: function(response) {

      // Google500.markers = [];
      
      response.data.forEach(function photoIterator(photo) { 
        var marker = new google.maps.Marker({
          icon: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMGCQeHxwWKSccIiAdJCQsJDQlLyYnJycjLDItMS4uLjowLiE0ODQsOS8tOjcBCgoKDQwNGg8PGjclHyU3NzQ3NzctNDc3Nzc3NzcyNyw3NzcsMjc4LDY3NDc4LDc0LCs3LDQ0NDUsLDQuLTg0NP/AABEIAEAAQAMBIgACEQEDEQH/xAAbAAEAAwEAAwAAAAAAAAAAAAAGBAUHAgEDCP/EADYQAAEDAwICBwcCBwEAAAAAAAECAwQABREGIRIxEyJBYXGBkQcUIyUyUVIzYkJTobGy0vAk/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAMEAgH/xAAjEQADAAEEAgEFAAAAAAAAAAAAAQIDERIhQQUxcQQTIiPh/9oADAMBAAIRAxEAPwC11jrCbeLw9Z7PIUxDYWG3XWzgrVnB3+1R7hpxiKyoqcWV4G+aH6RcK3ytRypS0knvzWj6jXhCt+wf3qb6fJT8lhnr+op8riWPx0VPttgr3AdOv4ih1jjepjMFOB8VfrUTp/8A0uZP8ZqU3Izsnc91YzN/cr5Kca/XPwduwE4/UX61SXpKIMR2QtTikoGcA1cOySDhWR3GqLUznSWmSBvhOazHtHWtJbDSLs66oFppYWT1QFHOfStK9l/tFmJmM228urciuudEhbpyUK7N/tWWWtCul4+XalQNTXXfhLfbOFdMSFD7jG/rVjSlaohmnb0YugabFsaYkSLsWWH0Kw6E44VjHCO3OfLlU912E/1ZusAvJG/BgY/7FN9JobdtbSHW0LQQMpWMikoh29phbpgROokq/TT2eVLhJUrXtd9mstVa2U9UuujFp0e2WG2xr1dpr0n3oFTNvSnhUo52yrP043JwOYr0WbU9+ucgJblN2iIT1GYSQnbx+o+Oao/aDNcuusZZeUVNxAGkJ8sn1JqBZZCm5IUvrKJ6oNUY0k9WuWT5bultTGd7v95trmHJDd4iD62ZiQTjuUOsPHNTtOWK3aySZFquy4IzwrivI4yhf454hkHsON6Me8xX5rjM34XGkgO7nhPgKl6LQ/aNTxlsqKW5gLSgPy5pPkRRliW9dAxXcfi2NF+yFaB1b0wPCMP9qoNR+zd2DEU8u9dIEDZCWuEf5VtTMn3iE0//ADEBVENbr+WPeFIaQ+bpnOkF/LmfClS/iRHW/wAkEf0ofpBfy9rwpWleWyKzJ2/Z83a7iriamdkEENzEhaVfuGyh5EVSMuvNuJUFEY5Gte19ZGXS6JDSlxXFcfE39Ta/yHce0UGjWd1o4Q21cGhyWwoBXmkkEH1p8NMRctPVIpozrzssOKWSM5JAplp15Mi9sPc0QG1POK/dghI8STVW/AeAwWWre32uyVgnySCSTSnRNoQ8ttuOhaYDaw44659Tq+wn7AdgoutAUu3qzVreSzaYravqDQzRXWjmbc94UlccwgCiGsXM293wqdsdKPGkZAEJCTsU7EUuaeBHOjeptPz7Jc37jbGFyLe+ouLbaGShR57fj291V8bVEcDCnOEjmDXGnLN8VyhPdIyJTRBGaA3XSzTjpUGhn7ikI1PDPN0VwvUEBfNxNG4Noctuk2UvBSmc+NPLZGREZSlIAwKoxqGAjk4mvC9URANnRQ6bDaJn3wE86HaukhURaBuTsAK4k6nYUMIXxE8gKtdJ6an3q5sXK6x1x7ewoONtujBWobjb8e3fnRKbZziVyf/Z',
          position: new google.maps.LatLng(photo.location.latitude, photo.location.longitude),
          map: map,
          draggable: false,
          animation: google.maps.Animation.DROP,
          title: name || "Unnamed"
        });
        Google500.markers.push(marker);

        var dom = $('<div>').append($("<h1>").text(photo.caption.text)).append($("<img>").attr('src', photo.images.low_resolution.url)); 

        var infoWindow = new google.maps.InfoWindow({ 
          content: dom.html() 
        });

          // infoWindow.open(map, marker);
          
        google.maps.event.addListener(marker, 'click', function onMarkerClick() {
          infoWindow.open(map, marker);
        });
      })
    }
  });
};