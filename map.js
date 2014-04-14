var map, infowindow; //to expose for console debugging / devving

var markercols = ['pink', 'lightblue', 'orange', 'lightgreen'];

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

    for (var i=0; i < allplaces.length; ++i) {
        var color = markercols[i];
        var circleSymbol = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: color,
            //strokeColor: 'gold',
            fillOpacity: 0.8,
            scale: 10,
            strokeWeight: 1
        };
        markersForPlaces(map, circleSymbol, infowindow, allplaces[i]);
    }
    
    console.log("init done");
}

function markersForPlaces(map, symbol, infowindow, places) {
    for (var num in places) {
        var info = places[num];
        console.log(num, info);
        //var geopos = info[0];
        //var geopos = [65.01424953761347, 25.47029972076416]
        var name = info[0];
        var addr = info[1];
        var desc = info[2];
        var text = "<b>" + name + "</b>" + " " + desc;
        
        var linkdata = info[3];
        var links = linkdata.split(',');
        text += "<br/>";
        for (var i=0; i < links.length; ++i) {
            var url = links[i].trim();         
            text += '<a href="http://' + url + '">' + url + '</a> ';
        }

        var geopos = addr2geoloc[addr];
        var latlng = new google.maps.LatLng(geopos[0],
                                            geopos[1]);

        /*var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: circleSymbol,
            title: num + ' - ' + text
        });*/

        var anchorOffset = {
            1: [2.6, 7],
            2: [5.7, 7]
        }[num.length];
        var anchor = new google.maps.Point(anchorOffset[0], 
                                           anchorOffset[1]);

        var marker = new MarkerWithLabel({
            position: latlng,
            draggable: false,
            raiseOnDrag: false,
            map: map,
            labelContent: num,
            labelAnchor: anchor,
            labelClass: "labels", // the CSS class for the label
            labelStyle: {opacity: 0.75},
            icon : symbol
        });
        
        addHandler(map, marker, infowindow, text);
    }
}

function addHandler(map, marker, infowindow, text) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.content = text;
        infowindow.open(map, marker);
        console.log("onclick", marker.title);
    });    
}

google.maps.event.addDomListener(window, 'load', initialize);
