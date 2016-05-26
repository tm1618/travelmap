
/* Declar initMap function */
    function initMap() {
        /* Declare in inital latlng variable to center map on */
        var latlng = new google.maps.LatLng(42.2847009,-33.720468 );
        var myOptions = {
            zoom: 3,
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
            console.log(type[i])
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


