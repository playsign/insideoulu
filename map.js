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
        content: "",
        maxWidth: 200
    });

    var circleSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'yellow',
        strokeColor: 'gold',
        fillOpacity: 0.8,
        scale: 10,
        strokeWeight: 1
    };

/*    var numberSymbol = {
        path: "M1511 480q0 -5 -1 -7q-64 -268 -268 -434.5t-478 -166.5q-146 0 -282.5 55t-243.5 157l-129 -129q-19 -19 -45 -19t-45 19t-19 45v448q0 26 19 45t45 19h448q26 0 45 -19t19 -45t-19 -45l-137 -137q71 -66 161 -102t187 -36q134 0 250 65t186 179q11 17 53 117 q8 23 30 23h192q13 0 22.5 -9.5t9.5 -22.5zM1536 1280v-448q0 -26 -19 -45t-45 -19h-448q-26 0 -45 19t-19 45t19 45l138 138q-148 137 -349 137q-134 0 -250 -65t-186 -179q-11 -17 -53 -117q-8 -23 -30 -23h-199q-13 0 -22.5 9.5t-9.5 22.5v7q65 268 270 434.5t480 166.5 q146 0 284 -55.5t245 -156.5l130 129q19 19 45 19t45 -19t19 -45z",
        scale: 0.1,
        fillColor: 'black',
        fillOpacity: 1.0,
    };
*/

    for (var num in places) {
        var info = places[num];
        console.log(num, info);
        var geopos = info[0];
        var text = info[1];
        var latlng = new google.maps.LatLng(geopos[0],
                                            geopos[1]);

        /*var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: circleSymbol,
            title: num + ' - ' + text
        });*/

        var marker = new MarkerWithLabel({
            position: latlng,
            draggable: false,
            raiseOnDrag: false,
            map: map,
            labelContent: num,
            labelAnchor: new google.maps.Point(2.5, 7),
            labelClass: "labels", // the CSS class for the label
            labelStyle: {opacity: 0.75},
            icon : circleSymbol
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
