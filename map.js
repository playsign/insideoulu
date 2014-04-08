var map, infowindow; //to expose for console debugging / devving

function initialize() {
    var myStyles = [{
        featureType: "poi",
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    }];

    var mapOptions = {
        center: new google.maps.LatLng(65.01424953761347,
                                       25.47029972076416), //NuKu
        zoom: 15,
        disableDefaultUI: false,
        styles: myStyles
    };
    
    map = new google.maps.Map(document.getElementById("map-canvas"),
                                  mapOptions);

    infowindow = new google.maps.InfoWindow({
      content: ""
    });

    for (var num in places) {
        var info = places[num];
        console.log(num, info);
        var geopos = info[0];
        var text = info[1];
        var latlng = new google.maps.LatLng(geopos[0],
                                            geopos[1]);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: num + ' - ' + text
        });
        
        addHandler(map, marker, text);
    }

    console.log("init done");
}

function addHandler(map, marker, text) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.content = text;
        infowindow.open(map, marker);
        console.log("onclick", marker.title);
    });    
}

google.maps.event.addDomListener(window, 'load', initialize);
