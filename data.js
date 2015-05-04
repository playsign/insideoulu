var oukaData = null;

function loadOukaData() {
    // callback chain:
    // map.js toplevel onload -> here -> refineData (here in data.js) -> initializeOuluMap (back in map.js)
    var req  = new XMLHttpRequest;
    var startTime;
    req.open('GET', 'oukaparse-output.json', true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200 || req.status == 0) {
                oukaData = JSON.parse(req.responseText);
                console.log("data load finished, elapsed=" + (performance.now() - startTime));
                refineData();
            }
            else
                console.log("err or", aEvt);
        }
    };
    req.send(null);
    startTime = performance.now();
}

function oukaMap(fun) {
    var out = [];
    for (var key in oukaData) {
        if (oukaData.hasOwnProperty(key)) {
            var ret = fun(oukaData[key], key)
            if (ret !== null)
                out.push(ret);
        }
    }
    return out;
};

// function oukaMultiMap() {
//     var out = [];
//     for (var key in oukaData) {
//         if (oukaData.hasOwnProperty(key)) {
//             var pass = true;
//             for (var i = 0; fun = arguments[i]; i++) {
//                 var ret = fun(oukaData[key])
//                 if (ret == null) {
//                     pass = false;
//                     break;
//                 }
//             }
//             if (pass == true)
//                 out.push(ret);
//         }
//     }
//     return out;
// };

function dgrep (doc, re) {
    for (var key in doc) {
        if (doc.hasOwnProperty(key) && doc[key].search(re))
            return key;
    }
    return false;
};

function grepper(re, section) {
    return function (doc, topkey) {
        for (var key in doc) {
            var val = doc[key];
            if (section && section !== key)
                continue;
            if (doc.hasOwnProperty(key) && (typeof(val) == 'string') && doc[key].search(re) !== -1)
                return [key, doc, topkey];
        };
        return null;
    }
}

function refineData() {
    //var aska = oukaMap(function(d) { if ((d[""] || "").search(/Asemakaavan/) !== -1) return null; else return d} );
    // var aska = oukaMap(grepper(/Asemakaava/i, ""));
    // var bo = oukaMap(grepper(/BusinessOulu/i));
    // var ov = oukaMap(grepper(/oikaisuvaatimus/i));
    var street = oukaMap(grepper(/(kuja|katu|tie|polku|väylä)\s+\d/i, ""));
 //   var other = oukaMap(function(d) 
    //console.log("counts", aska.length, bo.length, ov.length);
    console.log("street #", street.length);
    //console.log(street[41]);
    //var places = extractOukaAddrs(street);
    
    //allplaces.push(places);
    
    allplaces.push(extractOukaAddrs(oukaMap(grepper(/oikaisuvaatimus/i))));
    allplaces.push(extractOukaAddrs(oukaMap(grepper(/tonttijaon muutos/i))));
    allplaces.push(extractOukaAddrs(oukaMap(grepper(/maankäyttösop/i))));
    allplaces.push(extractOukaAddrs(oukaMap(grepper(/rakennuslupa/i))));
    
    initializeOuluMap();
}

function max(a, b) {
    return (a > b) ? a : b;
}
function min(a, b) {
    return (a > b) ? b : a;
}

function nextSpaceOffsetInString(s, startOffset, searchDirection) {
    
    for (var i = startOffset + searchDirection; /\s/.test(s[i]) == false && s[i] !== undefined; i += searchDirection) {
        ;
    }
    return i;
}

// function nextSentenceEndOffsetInString(s, startOffset, searchDirection) {
    
//     for (var i = startOffset + searchDirection; /[\.]/.test(s[i]) == false && s[i] !== undefined; i += searchDirection) {
//         ;
//     }
//     return i;
// }

function textContextForSubstring(needle, haystack) {
    var contextLength = 12; // minimum chars of context to get (until next space)
    var nOffset = haystack.indexOf(needle);
    var backwardsContextStart = nextSpaceOffsetInString(haystack, nOffset - contextLength, -1)
    var forwardContextEnd = nextSpaceOffsetInString(haystack, nOffset + needle.length + contextLength, 1);
    return haystack.slice(backwardsContextStart, forwardContextEnd);
}

function extractOukaAddrs(streetDocs) {
    var out = new Object;
    var hits = 0;
    for (var i = 0; i < streetDocs.length; i++) {
        var doc = streetDocs[i][1];
        var docurl = streetDocs[i][2].slice(4);
        for (var key in doc) {
            if (!doc.hasOwnProperty(key))
                continue;
            var val = doc[key];
            var groups = /(\w+)(kuja|katu|tie|polku|väylä)(\s+)(\d[\d\w-]*)/i.exec(val);
            // groups: 1) start of streetword 2) end of streetword 3) spaces 4) street nr
            if (groups == null)
                continue;            
            var addr = groups[1] + groups[2] + groups[3] + groups[4];
            // if (addr == "Torikatu 10")
            //     continue;
            var m = /^(.*)/.exec(val);
            var context = textContextForSubstring(addr, val);
            link=docurl;
            var title, context, link;
            if (m)
                title = m[1];
            else
                m = "(ei otsikkoa)";
            if (title.length > 30)
                title = title.substring(0, nextSpaceOffsetInString(title, 300, 1)) + "[...]"
            out["" + (50 + hits)] = [title, addr, context, link];
            //out[addr] = doc;
            hits++;
        }
        if (hits > 30)
            break;

    }
    console.log("extracted # addresses: " + hits);
    console.log(JSON.stringify(out));
    return out;
}


boutiques = {
    "1": ["Non Boutique",
          "Pakkahuoneenkatu 5a",
          "Mon-Fri 11-18, Sat 11-15 / High-quality Finnish design. Clothes and accessories from small series to unique pieces and recycled design.",
         "www.nonboutique.fi"],

    "2": ["KIKS",
          "Pakkahuoneenkatu 5b",
          "Mon-Fri 11-18, Sat 11-15 / Unique, upcycled clothes and accessories respecting the human, nature and good kiks! Also custom-design.",
          "www.kiks.fi, www.facebook.com/kiks.fi"],

    "3": ["Kofeiinikomppania",
          "Pakkahuoneenkatu 5c",
          "Mon-Fri 11-17, Sat 11-16 / Lovely tea and coffee shop with over a hundred excellent quality loose leaf teas and specialities, definitely the freshest coffeebeans in town from small roasteries and some tea & coffee accessories.",
          "www.kofeiinikomppania.fi"],

    "4": ["Kuudes Maku",
          "Kirkkokatu 23",
          "Mon-Fri 10-20, Sat 10-18, Sun 12-16 / Delicatessen where you can find tea, coffee, superfoods, organic groceries and goodies from a wide selection.",
          "www.kuudesmaku.fi"],

    "5": ["KuuKorento",
          "Albertinkatu 6",
          "Mon-Fri 11-17, Sat 11-15 / An exciting gift shop full of life. Visit us, surprises await!",
         "www.kuukorento.fi"],

    "6": ["Kultaseppä Räsänen",
          "Isokatu 41",
          "Mon-Fri 9:30-13 and 14-17:30 / Handmade gemstone jewellery.",
          "www.kultasepparasanen.fi"],

    "7": ["Real Deal",
          "Hallituskatu 11",
          "Mon-Fri 10-18, Sat 10-16 / Vans, LRG, Nike SB, Karhu, Carhartt, HUF, Obey, Converse, Dickies, Diamond, Altamont, Adidas and more.",
          "www.realdeal.fi"],

    "8": ["Inka-aitta",
          "Uusikatu 20",
          "Mon-Tue 11-17, Wed-Fri 10:30-17:30, Sat 10:30-14:30 / Personal and colourful clothes and accessories, handmade jewellery, exotic design and decorational items. BusyBee vegan-friendly products, incence, Yoga, organic Yoga products and clothes.",
         "www.inka-aitta.com, www.jooga-aitta.com"],

    "9": ["Pieni Muotihuone CHIC",
          "Asemakatu 12",
          "Tue-Fri 11-17, Sat 10-14 / Stylish, high-quality custom-design clothes with personal flavours, made of natural fabrics. We also sell high-quality fabrics, Dala Leo bags and Anu Ek Design jewellery.",
         "www.chicpienimuotihuone.fi"],

    "10": ["Viskaalin Kauppa",
           "Kasarmintie 1",
           "Mon-Fri 10-18, Sat 9-15 / Delicatessen with local and organic goods. Meat and meat products from the local Viskaali farm. Located close to the Art museum and Tietomaa.",
           "www.viskaalin.fi"],

    "11": ["Kultaseppä Matti Kärsämä",
           "Pikisaarentie 8",
           "Mon-Fri 10-17, Sat 10-14 (Sun 12-16) / Handmade gold and silver jewellery.",
           "www.kultasepanpaja.net"],

    "12": ["Craft shop Tuuma ja Tikki",
           "Pikisaarentie 13",
           "Oulu Vocational College / Mon 11- 18, Tue-Thu 11-17, Fri 11-16 / Craft shop offering plenty of high-quality handmade products and monthly changing displays on our showroom.",
          "www.osao.fi/tuumajatikki"]
}


//Restaurants & Cafés
restaurants_cafes = {
    "13": ["Café Kruda",
           "Pakkahuoneenkatu 5d",
           "Mon-Fri 11-17, Sat 11-16 / A cosy café where every cup of coffee is prepared with love. Delicious raw cakes also available!",
          "www.kruda.fi"],

    "14": ["Moon Café / Juustokuu",
           "Oulu Market Hall",
           "Mon-Thu 8-17, Fri 8-18, Sat 9-15 / Moon Café: High-quality coffee and variety of chocolates and other sweets treats. Juustokuu: The best cheese shop in Oulu.",
          "www.juustokuu.fi"],

    "15": ["Cafe Rooster",
           "Torikatu 26",
           "Mon-Thu 10-22, Fri-Sat 10-02, Sun 12-22 / Beautiful bistro at the city centre. Enjoy everything from a cup of cappuccino to burgers and wines.",
          "www.caferooster.fi"], 

    "16": ["Restaurant Pannu",
           "Kauppurienkatu 12",
           "Mon-Thu 10:30-22, Fri-Sat 10:30-23, Sun 12-20 / Home style comfort food with deep italian roots. Pannu’s famous pizzas are really worth a try.",
          "www.ravintolapannu.com"],

    "17": ["Restaurant Puistola",
           "Pakkahuoneenkatu 15",
           "Deli: Mon-Fri 7:30-19, Sat 10-17, Sun closed, Bistro: Mon-Thu 10:45-22, Fri 10:45-23, Sat 12-23, Sunclosed / Urban style meets nordic cuisine from early breakfast to casual bistro food. On our summer terrace you can enjoy refreshing beverages or mouth-watering delicacies.",
           "www.ravintolapuistola.fi"],

    "18": ["Kakkukahvila Mira PoPpins",
           "Hallituskatu 21",
           "Mon-Fri 7:30-17, Sat  8:30-15 / In our homely café we serve fabulous cakes, fresh-roasted Kaffa Roastery coffee, nutritious breakfast and a yummy lunch – always with a smile!",
          "www.kakkukahvilamirapoppins.com"],

    "19": ["Ravintola Rauhala",
           "Mannenkatu 4",
           "Mon-Tue 11-14, Wed-Fri 11-14 & 16-20*, Sat 16-20* / Nostalgic restaurant that serves abundant lunch buffet on weekdays and dinner by reservation (*). We are happy to organize any event or occasion you wish to celebrate.",
          "www.ravintolarauhala.fi"],

    "20": ["Tuba Food and Lounge",
           "Mannenkatu 2",
           "Mon-Tue 10:30-15:00, Wed 10:30-0:00, Thu 10:30-22:00, Fri 10:30-0:00, Sat 12:00-0:00, Sun 12:00-16:00* Please check summertime opening hours and exceptions at www.tuba.fi / Tasty home-made food from the lunch buffet, fresh salads and delicious burgers. Wednesday jams, live gigs and a praiseworthy brunch on weekends! We also favor ecologically and organically grown products.",
          "www.tuba.fi"],

    "21": ["Tähtitornin Kahvila",
           "Linnansaari 1",
           "Open 30.4.-15.9. every day 11-21 / Coffee and scenery since 1912! Dog-friendly café. Finland’s best coffee, variety of drinks, huge selection of ice-cream, fair trade and organic products and local pastries. Also featuring a summer book store and monthly changing exhibitions.",
          "www.tahtitorninkahvila.fi"]
}

//Bars & Nightclubs
bars_nightclubs = {
    "22": ["45 Special",
           "Saaristonkatu 12",
           "Every day 16-04, kitchen open 16-03 / Legendary nightclub with live music, live people, djs, theme nights, great food and a good variety of drinks.",
           "www.45special.com"],

    "23": ["Never Grow Old", 
           "Hallituskatu 17",
           "Tue-Thu 18-02, Fri 16-03, Sat 18-03, Sun-Mon closed, in the summertime open every day / Exotic, international atmosphere with hot and cold drinks and funky music. Djs, theme nights and occasional live gigs, too.",
          "www.ngo.fi"],

    "24": ["Snooker Time",
           "Asemakatu 28",
           "open every day 13-01(-02) / Beer, pool, snooker, darts and slot machines. Located right beside the railway station.",
          ""],
}

galleries = {
    "25": ["Galleria Harmaja", 
           "Torikatu 22",
           "Wed-Fri 12-17, Sat-Sun 12-16 / Modern Art.",
           "www.galleriaharmaja.fi"],

    "26": ["Galleria 5", 
           "Hallituskatu 5",
           "Wed-Fri 12-18, Sat-Sun 12-16 / Gallery 5 is downtown gallery displaying a wide range of exhibitions from visual arts to design.",
          "www.galleria5.artoulu.fi"],

    "27": ["Northern Photographic Centre", 
           "Hallituskatu 7",
           "Mon-Sun 10-20 / Northern Photographic Center annually organizes 18-20 photo exhibitions by national and international artists. 1st aim is to promote contemporary art photography.",
          "www.photonorth.fi, www.ouluarthall.fi"],

    "28": ["Kulttuuribingo", 
           "Mäkelininkatu 29",
           "Mon-Fri 12-18 / Kulttuuribingo is a gallery, venue, workshops and a space for artists to bloom! Free social space that’s changing forever. Yes!",
          "www.kulttuuribingo.fi"]
}

allplaces = [/*boutiques, restaurants_cafes, bars_nightclubs, galleries */];
