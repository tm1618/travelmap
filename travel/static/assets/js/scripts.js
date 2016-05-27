
/* Declar initMap function */
    function initMap() {
        /* Declare in inital latlng variable to center map on */
        var latlng = new google.maps.LatLng(35.2135184,-14.193599 );
        var myOptions = {
            zoom: 2,
            center: latlng,
        };

    /* Define the google map */
    var map = new google.maps.Map(document.getElementById("map"),myOptions);

    /* Wait til map is loaded, then load Legend into map */
    google.maps.event.addListenerOnce(map, 'idle', function(){
        $('#legend').show();
    });


    /* Define information windows to show name of markers */
    var infowindow = new google.maps.InfoWindow(), marker, i;

    /* Loop through django variable "marker" and "type".  Type checks for "Visited" or "Want to Visit" and defines the icon
    type to be used based on the variable outcome */
    for (i = 0; i < markers.length; i++) {
            if (type[i] == "Visited") {
                var iconVar = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            } else if (type[i] == "Want to Visit") {
                var iconVar = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            }

        /* Defines markers on each part of the map using the markers variable defined in the django template */
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i][1], markers[i][2]),
            map: map,
            icon: iconVar
        });

        /*Creates the information window on mouse click */
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(markers[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
    document.getElementById('legend'));
}



function capitalize(str) {
    strVal = '';
    str = str.split(' ');
    for (var chr = 0; chr < str.length; chr++) {
        strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
    }
    return strVal
}




$(document).ready(function() {
    formwidth = $('.form').width();
    formheight = $('.form').height();
    mapwidth = $('#map').width();
    mapheight = $('#map').height();
    displaywidth = $(document).width();
    margin = 130;

    $('#map').css({'height': formheight, 'width': displaywidth-formwidth-margin})

});



// Form validation code will come here.
      function validate()
      {

         errors = 0;
        $('#div_id_title p').remove();
        $('form input, select').css('border-color', '');
         if( document.locationForm.id_title.value == "" )
         {
            errors += 1;
            $('#div_id_title').prepend('<p style="color:red">Please provide a title</p>');
            $('#id_title').css('border-color', 'red');

         }   if( document.locationForm.id_type.value == "" )
         {
            errors += 1;
            $('#div_id_title').prepend('<p style="color:red">Please provide a type</p>');
            $('#id_type').css('border-color', 'red');

         }   if( document.locationForm.id_city.value == "" )
         {
            errors += 1;
            $('#div_id_title').prepend('<p style="color:red">Please provide a city</p>');
            $('#id_city').css('border-color', 'red');

         }   if (document.locationForm.id_zipcode.value.length > 0 && document.locationForm.id_zipcode.value.length != 5 )
         {
            errors += 1;
            $('#div_id_title').prepend('<p style="color:red">Please provide a zip in the format #####.</p>');
            $('#id_zipcode').css('border-color', 'red');

         }   if ( document.locationForm.id_country.value == "" )
         {
            errors += 1;
            $('#div_id_title').prepend('<p style="color:red">Please provide a country</p>');
            $('#id_country').css('border-color', 'red');
         }


        if (errors > 0) {
            return false;
        } else {
            return( true );
        }

      }