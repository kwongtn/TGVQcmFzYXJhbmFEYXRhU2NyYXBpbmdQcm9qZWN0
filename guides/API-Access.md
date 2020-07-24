# Operations/RouteMap
## Access RouteMap of unauthorized routes
`https://prs.prasarana.com.my/route/routes?s1=<corridorNumber>&s2=<routeKey>`

## Get list of routes in a specific corridoor
`https://prs.prasarana.com.my/atten_ot/get_route/<corridorNumber>`
Sample result:
```
[
    {
        "key": 495,
        "val": "708"
    }, ... {}, ...
]
```
Where:  
- `key` : Internal identifier (Referred to as `routeKey`)  
- `val` : Route number

## Get list of bus running in a specific corridoor
* Can be done without login
`https://prs.prasarana.com.my/utiliti/get_buslist/<corridorNumber>`  

Sample result:
```
{
    "W8090U": "W8090U",
    ... 
    "<BusNumberPlate>": "<BusNumberPlate>", 
    ...
}
```

## Get KML file for a specific routes 
* Can be done without login
`https://prs.prasarana.com.my/assets/map/<routeNumber>.kml`
Sample result:
```
<?xml version="1.0" standalone="yes"?>
<kml xmlns="http://earth.google.com/kml/2.2">
  <Document>
    <name><![CDATA[U770_Segment]]></name>
    <visibility>1</visibility>
    <open>1</open>
    <Snippet><![CDATA[created using <A href="http://www.gpsvisualizer.com/?ref=ge&time=20160112000651">GPS Visualizer</A>]]></Snippet>
    <Folder id="Tracks">
      <name>Tracks</name>
      <visibility>1</visibility>
      <open>0</open>
      <Placemark>
        <name><![CDATA[U770_Segment]]></name>
        <Snippet></Snippet>
        <description><![CDATA[&nbsp;]]></description>
        <Style>
          <LineStyle>
            <color>ff0000e6</color>
            <width>4</width>
          </LineStyle>
        </Style>
        <MultiGeometry>
          <LineString>
            <tessellate>1</tessellate>
            <altitudeMode>clampToGround</altitudeMode>
            <coordinates>101.606796798,3.048289088 101.606282983,3.048465437 ... 101.606441845,3.048425664 </coordinates>
          </LineString>
        </MultiGeometry>
      </Placemark>
    </Folder>
  </Document>
</kml>
```
However, the KML file does not have locations of each bus stop.

## Get bus locations of a specific route
`https://prs.prasarana.com.my/route/get_live_bus_by_route/U7700`  
Sample result:
```
{
    "WVH6251": {
        "avl_id": "36253061",
        "dt_received": "2020-01-11 11:18:52",
        "dt_gps": "2020-01-11 11:18:52",
        "latitude": "3.133350",
        "longitude": "101.687900",
        "speed": "20",
        "dir": "1",
        "route": "U7700",
        "bus_no": "WVH6251",
        "trip_no": "202001111030U77002WVH6251",
        "busstop_id": "1002494",
        "captain_id": "10003255",
        "trip_rev_kind": "00",
        "engine_status": "1",
        "dt_created": "2020-01-11 11:19:03",
        "trip_kind_name": "Revenue Trip",
        "trip_dest": {
            "1": {
                "stop_id": "1004184",
                "stop_name": "USJ 1",
                "latitude": "3.0484852564508",
                "longitude": "101.60573987301"
            },
            "2": {
                "stop_id": "1004347",
                "stop_name": "PASAR SENI 8 (PLATFORM B1 - B3)",
                "latitude": "3.142615",
                "longitude": "101.695304"
            }
        }
    }, ... "<BusNumberPlate>": {}, ...
}
```
Where:  
- `avl_id`            :   
- `dt_received`       :   
- `dt_gps`            :   
- `latitude`          :   
- `longitude`         :   
- `speed`             : Speed of bus in km/h  
- `dir`               :   
- `route`             :   
- `bus_no`            :   
- `trip_no`           :   
- `busstop_id`        : Not sure if is ID of coming bus stop, nearest bus stop or previous bus stop  
- `captain_id`        :   
- `trip_rev_kind`     :   
- `engine_status`     :   
- `dt_created`        :   
- `trip_kind_name`    :   
- `trip_dest`         :   

# Appendix
## Corridor Number
### In use
#### RapidKL
- 0 - All  
- 2 - Batu Caves  
- 4 - Maluri  
- 5 - Cheras Selatan  
- 7 - Shah Alam  
- 18 - BRT Sunway  
- 21 - MRT Sungai Buloh  
- 22 - MRT Kajang  

#### RapidKuantan
- 10 - Kuantan

#### RapidPenang
- 11 - Tanjung Bungah
- 12 - Sungai Nibong
- 13 - Weld Quay
- 14 - Balik Pulau
- 15 - Mak Mandin
- 16 - Nibong Tebal
- 20 - Academy

#### RapidKamunting
- 19 - Kamunting

#### RapidManjung
- 23 - Manjung

### Defunct
- 1 - Sentul
- 3 - Melawati
- 6 - OKR
- 8 - Asia Jaya 
- 9 - Kepong
- 17 - Lorong Kulit

### RapidSP (not in service)
- 24 - Sungai Petani

