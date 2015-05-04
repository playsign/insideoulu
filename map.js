var map, activeInfoWindow; //to expose for console debugging / devving

var markercols = ['#fb177f', '#1450fb', '#ec7c22', '#1AA07E'];
var markers = []; //so that menu can open a marker
var markercluster;

function initializeOuluMap() {
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
    
    var infowindow = new google.maps.InfoWindow({
        content: "",
        maxWidth: 200
    });
    activeInfoWindow = infowindow;
    markercluster = new MarkerClusterer(map);
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
        populateMenus(i+1, allplaces[i]);
    }



    //console.log("init done");
}


var geocoder;
function cachedAddrToGeoloc(addr, callback) {
    var cachekey = "geoloc-" + addr;
    var cacheHit = window.localStorage.getItem(cachekey);
    if (cacheHit) {
        callback(cacheHit)
        //console.log("cache hit");
        return;
    }

    if (!geocoder)
        geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': addr}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var geoloc = results[0].geometry.location;
            window.localStorage.setItem(cachekey, geoloc);
            if (geoloc[0] === undefined)
                console.log("geocoder status was OK but got undefined position");
            callback(geoloc);
            console.log("cache miss");
        } else {
           console.log("Geocode was not successful for the following reason: " + status);
        }
    });
}

function markersForPlaces(map, symbol, infowindow, places) {
    for (var num in places) {
        //console.log(num, info);
        //var geopos = info[0];
        //var geopos = [65.01424953761347, 25.47029972076416]
        var zaddr = places[num][1];
        cachedAddrToGeoloc(zaddr + ", oulu, finland", function(geopos) {
            
            var info = places[num];
            var name = info[0];
            var addr = info[1];
            var desc = info[2];        
            var linkdata = info[3];
            var origpos = geopos;
            if (typeof(geopos) === "string" && geopos[0] == "(") {
                var kek = geopos.split(", ");
                var x = kek[0].substring(1, kek[0].length+1);
                var y = kek[1].substring(0, kek[1].length-1);
                if (x === undefined || y === undefined) {
                    console.log(geopos);
                    throw "failed to parse geopos";
                }
                geopos = [x, y]
            }
            var latlng = new google.maps.LatLng(geopos[0],
                                                geopos[1]);

            if (geopos[0] === undefined) {
                console.log("skip undefined geopos", geopos[0], origpos[0]);
                return;
            }
            
            var anchorOffset = {
                1: [2.6, 7],
                2: [5.7, 7]
            }[num.toString().length];
            var anchor = new google.maps.Point(anchorOffset[0], 
                                               anchorOffset[1]);
            //console.log("added anchor for " + addr + " to " + geopos[0] +"," + geopos[1]);

            var marker = new MarkerWithLabel({
                position: latlng,
                draggable: false,
                raiseOnDrag: false,
                map: map,
                labelContent: num,
                labelAnchor: anchor,
                labelClass: "labels", // the CSS class for the label
                labelStyle: {
                    opacity: 0.75,
                },
                icon : symbol
            });

            //conf the text for display
            //remove multiple-at-same-location hack
            if (addr.lastIndexOf('Pakkahuoneenkatu 5') > -1) {
                addr = addr.substring(0, 18);
            }
            var text = "<strong>" + name + "</strong> <em>" + addr + "</em> / " + desc;
            var links = linkdata.split(',');
            text += "<br/>";
            for (var i=0; i < links.length; ++i) {
                var url = links[i].trim();         
                text += '<a href="http://' + url + '">' + url + '</a> ';
            }
            
            addHandler(map, marker, infowindow, text);
            markers[num] = marker;
            markercluster.addMarker(marker);
            console.log("markers " + num + " set to " + text);
        });
    }
}

// function addHandler(map, marker, infowindow, text) {
//     google.maps.event.addListener(marker, 'click', function() {
//         infowindow.content = text;
//         infowindow.open(map, marker);
//         console.log("onclick", infowindow);
//     });    
// }

function addHandler(map, marker, infowindow, text) {
    google.maps.event.addListener(marker, 'click', function() {
        //Close active window if exists
        if(activeInfoWindow) {
            activeInfoWindow.close();
        } else {        
            activeInfoWindow = new google.maps.InfoWindow();
        }

        // Update InfoWindow content
        activeInfoWindow.setContent(text);

        // Open InfoWindow
        activeInfoWindow.open(map, marker);
    });    
}

function populateMenus(idx, places) {
    var menu = $('#menu' + idx);
    //var list = $('<ul>')
    for (var num in places) {
        var info = places[num];
        var name = info[0];
        $('<li>').html('<a href="#" id="' + num + '">' + name + '</a>').appendTo(menu);
        //list.appendTo(menu);
    }

    /* Next part of code handles hovering effect and submenu appearing */
    $('.nav li').hover(
      function () { //appearing on hover
        $('ul', this).fadeIn();
      },
      function () { //disappearing on hover
        $('ul', this).fadeOut();
      }
    );
}

google.maps.event.addDomListener(window, 'load', loadOukaData);

/*  jQuery ready function. Specify a function to execute when the DOM is fully loaded.  */
$(document).ready(
  function () {
    /* Next part of code handles hovering effect and submenu appearing */
    $('.nav li').hover(
      function () { //appearing on hover
        $('ul', this).fadeIn();
      },
      function () { //disappearing on hover
        $('ul', this).fadeOut();
      }
    );

    $('#navigation').on('click', function(event) {
        var t = event.target.id;
        var m = markers[t];
        if (m) {
            google.maps.event.trigger(markers[t], 'click');
            var submenu = event.target.parentElement.parentElement;
            $(submenu).fadeOut();
        }
    });
}
);
