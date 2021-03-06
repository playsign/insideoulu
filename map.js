var map, infowindow; //to expose for console debugging / devving

var markercols = ['#fb177f', '#1450fb', '#ec7c22', '#1AA07E'];
var markers = []; //so that menu can open a marker

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
        populateMenus(i+1, allplaces[i]);
    }

    var logoPos = new google.maps.LatLng(65.016793, 
                                         25.4625477);
    var logoImage = {
        url: 'logos/InsideOulu-logo.png',
        scaledSize: new google.maps.Size(79, 42),
    };
    var logoMarker = new google.maps.Marker({
        position: logoPos,
        map: map,
        icon: logoImage
    });
    addHandler(map, logoMarker, infowindow, abouttext);
    markers['about'] = logoMarker;

    //console.log("init done");
}

function markersForPlaces(map, symbol, infowindow, places) {
    for (var num in places) {
        var info = places[num];
        //console.log(num, info);
        var name = info[0];
        var addr = info[1];
        var open = info[2];
        var desc = info[3];        
        var linkdata = info[4];

        var geopos = addr2geoloc[addr];
        var latlng = new google.maps.LatLng(geopos[0],
                                            geopos[1]);

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
            labelContent: '<div title="' + name + '">' + num + '</div>',
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
        var text = 
            "<strong>" + name + "</strong><br/>" 
            + addr + "<br/>"
            + "<em>" + open + "</em><br/>" 
            + "<p>" + desc + "</p>";
        var links = linkdata.split(',');
        for (var i=0; i < links.length; ++i) {
            var url = links[i].trim();         
            text += '<a target="_blank" href="http://' + url + '">' + url + '</a> ';
        }
        
        addHandler(map, marker, infowindow, text);
        markers[num] = marker;
    }
}

function addHandler(map, marker, infowindow, text) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(text);
        infowindow.open(map, marker);
        //console.log("onclick", marker.title, text, infowindow);
    });    
}

function populateMenus(idx, places) {
    var menu = $('#menu' + idx);
    //var list = $('<ul>')
    for (var num in places) {
        var info = places[num];
        var name = info[0];
        $('<li>').html('<div style="float: left;"><a href="#" id="' + num + '">' + num + '.</div><div>' + name + '</div></a>').appendTo(menu);
        //list.appendTo(menu);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);

/*  jQuery ready function. Specify a function to execute when the DOM is fully loaded.  */
$(document).ready(
    function () {
        /* Next part of code handles hovering effect and submenu appearing */
        $('.nav li').hover(
            function () { //appearing on hover (or after touch)              
                //narrow screen (phone) support:
                if (this.offsetTop == 0) { //is in top bar - may need to lower
                    //check if menu has wrapped:
                    var wrapped = false;
                    $(".category").each(function(idx, menutitle) { 
                        if (menutitle.offsetTop > 0) {
                            wrapped = true;
                        }
                    });
                    if (wrapped) {
                        var cat = $(event.target).parent(".category");
                        cat = cat.detach();
                        $('#nav').append(cat);
                    }
                }
                $('ul', this).fadeIn();
            },
            function () { //disappearing on hover
                $('ul', this).fadeOut();
            }
        );

/* now relies on emulated hover from touch - would be faster with tap handling (if / when the artificial 300ms delay for touch-clicks is in play)
        $('.nav li').tap(
            function (event) { //for touch screens (no hover, except from touch)
            }
        );
*/

        $('#navigation').on('click', function(event) {
            var t = event.target.id;
            var m = markers[t];
            if (m) {
                google.maps.event.trigger(m, 'click');
                var submenu = event.target.parentElement.parentElement.parentElement; //failed attempt to make nicer -- didn't debug as the old way is faster and reliable here anyway: $(event.target).parent(".menu");
                $(submenu).fadeOut();
            }
        });
    }
);

function about() {
    var m = markers['about'];
    google.maps.event.trigger(m, 'click');
}
