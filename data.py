# coding=utf-8

places = {
    "1": [[65.01424953761347, 25.47029972076416], "Test 1 aslkfj laöskjdf ölaksjdf ölkasjd fölkajs fölkasjdf ölakdjsf ölkajsd ölaksjd fölaskdjf ölaskdjföalskjf asöldfkj aöslkfj asödlkfj asökdfj aösldkfj ösaldkfj asödlfkj saödlkfj asdöfl jk"],
    "2": [[65.01370000000000, 25.47515000000000], "Test 2"],
    "3": [[65.01300000000000, 25.47000000000000], "Test 3"],
}

boutiques = {
    "1": ["Non Boutique",
          "Pakkahuoneenkatu 5",
          "Mon-Fri 11-18, Sat 11-15 / www.nonboutique.fi / High-quality finnish design. Clothes and accessories from small series to unique pieces and recycled design."],

    "2": ["KIKS",
          "Pakkahuoneenkatu 5",
          "Mon-Fri 11-18, Sat 11-15 / www.kiks.fi, www.facebook.com/kiks.fi / Unique, upcycled clothes and accessories respecting the human, nature and good kiks! Also custom-design."],

    "3": ["Kofeiinikomppania",
          "Pakkahuoneenkatu 5",
          "Mon-Fri 11-17, Sat 11-16 / www.kofeiinikomppania.fi / Lovely tea and coffee shop with over a hundred excellent quality loose leaf teas and specialities, definitely the freshest coffeebeans in town from small roasteries and some tea & coffee accessories."],

    "4": ["Kuudes Maku",
          "Kirkkokatu 23",
          "Mon-Fri 10-20, Sat 10-18, Sun 12-16 / www.kuudesmaku.fi / Delicatessen where you can find tea, coffee, superfoods, organic groceries and goodies from a wide selection."],

    "5": ["KuuKorento",
          "Albertinkatu 6",
          "Mon-Fri 11-17, Sat 11-15 / www.kuukorento.fi An exciting gift shop full of life. Visit us, surprises await!"],

    "6": ["Kultaseppä Räsänen",
          "Isokatu 41",
          "Mon-Fri 9:30-13 and 14-17:30 / www.kultasepparasanen.fi / Handmade gemstone jewellery."],

    "7": ["Real Deal",
          "Hallituskatu 11",
          "Mon-Fri 10-18, Sat 10-16 / www.realdeal.fi / Vans, LRG, Nike SB, Karhu, Carhartt, HUF, Obey, Converse, Dickies, Diamond, Altamont, Adidas and more."],

    "8": ["Inka-aitta",
          "Uusikatu 20",
          "Mon-Tue 11-17, Wed-Fri 10:30-17:30, Sat 10:30-14:30 / www.inka-aitta.com, www.jooga-aitta.com / Personal and colourful clothes and accessories, handmade jewellery, exotic design and decorational items. BusyBee vegan-friendly products, incence, Yoga, organic Yoga products and clothes."],

    "9": ["Pieni Muotihuone CHIC",
          "Asemakatu 12",
          "Tue-Fri 11-17, Sat 10-14 / www.chicpienimuotihuone.fi / Stylish, high-quality custom-design clothes with personal flavours, made of natural fabrics. We also sell high-quality fabrics, Dala Leo bags and Anu Ek Design jewellery."],

    "10": ["Viskaalin Kauppa",
           "Kasarmintie 1",
           "Mon-Fri 10-18, Sat 9-15 / www.viskaalin.fi / Delicatessen with local and organic goods. Meat and meat products from the local Viskaali farm. Located close to the Art museum and Tietomaa."],

    "11": ["Kultaseppä Matti Kärsämä",
           "Pikisaarentie 8",
           "Mon-Fri 10-17, Sat 10-14 (Sun 12-16) / www.kultasepanpaja.net / Handmade gold and silver jewellery."],

    "12": ["Craft shop Tuuma ja Tikki",
           "Pikisaarentie 13",
           "Oulu Vocational College / Mon 11- 18, Tue-Thu 11-17, Fri 11-16 / www.osao.fi/tuumajatikki / Craft shop offering plenty of high-quality handmade products and monthly changing displays on our showroom."]
}


#Restaurants & Cafés
restaurants_cafes = {
    "13": ["Café Kruda",
           "Pakkahuoneenkatu 5",
           "Mon-Fri 11-17, Sat 11-16 / www.kruda.fi / A cosy café where every cup of coffee is prepared with love. Delicious raw cakes also available!"],

    "14": ["Moon Café / Juustokuu",
           "Oulu Market Hall",
           "Mon-Thu 8-17, Fri 8-18, Sat 9-15 / www.juustokuu.fi  / Moon Café: High-quality coffee and variety of chocolates and other sweets treats. Juustokuu: The best cheese shop in Oulu."],

    "15": ["Cafe Rooster",
           "Torikatu 26",
           "Mon-Thu 10-22, Fri-Sat 10-02, Sun 12-22 / www.caferooster.fi / Beautiful bistro at the city centre. Enjoy everything from a cup of cappuccino to burgers and wines."], 

    "16": ["Restaurant Pannu",
           "Kauppurienkatu 12",
           "Mon-Thu 10:30-22, Fri-Sat 10:30-23, Sun 12-20 / www.ravintolapannu.com / Home style comfort food with deep italian roots. Pannu’s famous pizzas are really worth a try."],

    "17": ["Restaurant Puistola",
           "Pakkahuoneenkatu 15",
           "Deli: Mon-Fri 7:30-19, Sat 10-17, Sun closed, Bistro: Mon-Thu 10:45-22, Fri 10:45-23, Sat 12-23, Sunclosed / www.ravintolapuistola.fi / Urban style meets nordic cuisine from early breakfast to casual bistro food. On our summer terrace you can enjoy refreshing beverages or mouth-watering delicacies."],

    "18": ["Kakkukahvila Mira PoPpins",
           "Hallituskatu 21",
           "Mon-Fri 7:30-17, Sat  8:30-15 / www.kakkukahvilamirapoppins.com / In our homely café we serve fabulous cakes, fresh-roasted Kaffa Roastery coffee, nutritious breakfast and a yummy lunch – always with a smile!"],

    "19": ["Ravintola Rauhala",
           "Mannenkatu 4",
           "Mon-Tue 11-14, Wed-Fri 11-14 & 16-20*, Sat 16-20* / www.ravintolarauhala.fi / Nostalgic restaurant that serves abundant lunch buffet on weekdays and dinner by reservation (*). We are happy to organize any event or occasion you wish to celebrate."],

    "20": ["Tuba Food and Lounge",
           "Mannenkatu 2",
           "Mon-Tue 10:30-15:00, Wed 10:30-0:00, Thu 10:30-22:00, Fri 10:30-0:00, Sat 12:00-0:00, Sun 12:00-16:00* Please check summertime opening hours and exceptions at www.tuba.fi / Tasty home-made food from the lunch buffet, fresh salads and delicious burgers. Wednesday jams, live gigs and a praiseworthy brunch on weekends! We also favor ecologically and organically grown products."],

    "21": ["Tähtitornin Kahvila",
           "Linnansaari 1",
           "Open 30.4.-15.9. every day 11-21 / www.tahtitorninkahvila.fi / Coffee and scenery since 1912! Dog-friendly café. Finland’s best coffee, variety of drinks, huge selection of ice-cream, fair trade and organic products and local pastries. Also featuring a summer book store and monthly changing exhibitions."]
}

#Bars & Nightclubs
bars_nightclubs = {
    "22": ["45 Special",
           "Saaristonkatu 12",
           "Every day 16-04, kitchen open 16-03 / www.45special.com / Legendary nightclub with live music, live people, djs, theme nights, great food and a good variety of drinks."],

    "23": ["Never Grow Old", 
           "Hallituskatu 17",
           "Tue-Thu 18-02, Fri 16-03, Sat 18-03, Sun-Mon closed, in the summertime open every day / www.ngo.fi / Exotic, international atmosphere with hot and cold drinks and funky music. Djs, theme nights and occasional live gigs, too."],

    "24": ["Snooker Time",
           "Asemakatu 28",
           "open every day 13-01(-02) / Beer, pool, snooker, darts and slot machines. Located right beside the railway station."],
}

galleries = {
    "25": ["Galleria Harmaja", 
           "Torikatu 22",
           "Wed-Fri 12-17, Sat-Sun 12-16 / www.galleriaharmaja.fi / Modern Art."],

    "26": ["Galleria 5", 
           "Hallituskatu 5",
           "Wed-Fri 12-18, Sat-Sun 12-16 / www.galleria5.artoulu.fi / Gallery 5 is downtown gallery displaying a wide range of exhibitions from visual arts to design."],

    "27": ["Northern Photographic Centre", 
           "Hallituskatu 7",
           "Mon-Sun 10-20 / www.photonorth.fi, www.ouluarthall.fi / Northern Photographic Center annually organizes 18-20 photo exhibitions by national and international artists. 1st aim is to promote contemporary art photography."],

    "28": ["Kulttuuribingo", 
           "Mäkelininkatu 29",
           "Mon-Fri 12-18 / www.kulttuuribingo.fi / Kulttuuribingo is a gallery, venue, workshops and a space for artists to bloom! Free social space that’s changing forever. Yes!"]
}

oukaplaces = {"50":["(pitka)","Uusikatu 32","(context aa / bbb ... )","(link)"],"51":["(pitka)","kaupunkiTorikatu 10","(context aa / bbb ... )","(link)"],"52":["(pitka)","kaupunkiTorikatu 10","(context aa / bbb ... )","(link)"],"53":["Oulu10, Torikatu 10 A","Torikatu 10","(context aa / bbb ... )","(link)"],"54":["Oulu10, Torikatu 10 A, nvh 156","Torikatu 10","(context aa / bbb ... )","(link)"],"55":["Oulu10, Torikatu 10 A","Torikatu 10","(context aa / bbb ... )","(link)"],"56":["(pitka)","AlaskaSepänkatu 20","(context aa / bbb ... )","(link)"],"57":["(pitka)","(Fiskarintie 16","(context aa / bbb ... )","(link)"],"58":["(pitka)","Fiskarintie 16","(context aa / bbb ... )","(link)"],"59":["(pitka)","(Kotikankaantie 10","(context aa / bbb ... )","(link)"],"60":["(pitka)","Torikatu 10","(context aa / bbb ... )","(link)"],"61":["(pitka)","Taka-Lyötynkatu 4","(context aa / bbb ... )","(link)"],"62":["(pitka)","Uusitalonkuja 2","(context aa / bbb ... )","(link)"],"63":["Oulu10, Torikatu 10 A","Torikatu 10","(context aa / bbb ... )","(link)"],"64":["(pitka)","Topkap-kabinettiKauppurienkatu 11","(context aa / bbb ... )","(link)"],"65":["(pitka)","Torikatu 10","(context aa / bbb ... )","(link)"],"66":["(pitka)","LeetaSolistinkatu 2","(context aa / bbb ... )","(link)"],"67":["Oulu10, Torikatu 10 A","Torikatu 10","(context aa / bbb ... )","(link)"],"68":["(pitka)","(Limingantie 2","(context aa / bbb ... )","(link)"],"69":["564","(Limingantie 2","(context aa / bbb ... )","(link)"],"70":["564","(Limingantie 2","(context aa / bbb ... )","(link)"],"71":["Asemakaavan muutos 564","Kasarmintie 15","(context aa / bbb ... )","(link)"],"72":["564","Kasarmintie 15","(context aa / bbb ... )","(link)"],"73":["(pitka)","(Hillakuja 6","(context aa / bbb ... )","(link)"],"74":["postiosoitePohjois","käyntiosoiteIsokatu 4","(context aa / bbb ... )","(link)"],"75":["(pitka)","Torikatu 10","(context aa / bbb ... )","(link)"],"76":["(pitka)","kaupunkiTorikatu 10","(context aa / bbb ... )","(link)"],"77":["Asemakaavan muutos 564","(Mäkelininkatu 14","(context aa / bbb ... )","(link)"],"78":["564","(Mäkelininkatu 14","(context aa / bbb ... )","(link)"],"79":["(pitka)","valtatie 4","(context aa / bbb ... )","(link)"],"80":["Oulu10, Torikatu 10 A","Torikatu 10","(context aa / bbb ... )","(link)"],"81":["(pitka)","istuntosaliKirkkokatu 2","(context aa / bbb ... )","(link)"],"82":["Ympäristötalo, kahvio Leeta, 1","krs.Solistinkatu 2","(context aa / bbb ... )","(link)"],"83":["(pitka)","Torikatu 10","(context aa / bbb ... )","(link)"],"84":["postiosoitePohjois","käyntiosoiteIsokatu 4","(context aa / bbb ... )","(link)"],"85":["Yhdyskunta","(Kompilantie 90","(context aa / bbb ... )","(link)"],"86":["(pitka)","Pöllönsaarentie 11","(context aa / bbb ... )","(link)"],"87":["(pitka)","Ketolantie 66","(context aa / bbb ... )","(link)"],"88":["Rakennustarkastaja on 27","Uhanperäntie 32","(context aa / bbb ... )","(link)"],"89":["(pitka)","Metsänhoitajantie 10","(context aa / bbb ... )","(link)"],"90":["(pitka)","Riistakuja 2","(context aa / bbb ... )","(link)"]}

allplaces = [boutiques, restaurants_cafes, bars_nightclubs, galleries, oukaplaces];

name2pos = {
    "45 Special": [65.01424953761347, 25.47029972076416], 
    "Never Grow Old": [65.01370000000000, 25.47515000000000],
    "Snooker Time": [65.01300000000000, 25.47000000000000]
}

