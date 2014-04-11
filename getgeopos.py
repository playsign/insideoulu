# coding=utf-8

import time
import urllib2
import urllib
import json
import data

def getgeopos(addr):
    req1 = "http://maps.googleapis.com/maps/api/geocode/json?address="
    #addr = "15+mäkelininkatu"
    addr = urllib.quote_plus(addr)
    req2 = ",+oulu,+finland&sensor=true"

    req = req1 + addr + req2

    r = urllib2.urlopen(req)
    d = json.loads(r.read())

    loc = d['results'][0]['geometry']['location']

    geopos = loc['lat'], loc['lng']
    return geopos

addr2pos = {}

for cat in data.allplaces:
    for p in cat.itervalues():
        #print p
        addr = p[1]
        print addr
        geopos = getgeopos(addr)
        print geopos
        addr2pos[addr] = geopos
        time.sleep(0.1)

print json.dumps(addr2pos)
