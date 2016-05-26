

    function initMap() {
        var latlng = new google.maps.LatLng(42.2847009,-33.720468 );
        var myOptions = {
            zoom: 3,
            center: latlng,

        };
    var map = new google.maps.Map(document.getElementById("map"),myOptions);
    var infowindow = new google.maps.InfoWindow(), marker, i;
    for (i = 0; i < markers.length; i++) {
            console.log(type[i])
            if (type[i] == "Visited") {
                var iconVar = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            } else if (type[i] == "Want to Visit") {
                var iconVar = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            }
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i][1], markers[i][2]),
            map: map,
            icon: iconVar
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(markers[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}