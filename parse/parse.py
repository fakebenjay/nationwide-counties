import json
from IPython import embed

state_fips = {
"00": "ALL STATES",
"01": "Alabama",
"02": "Alaska",
"04": "Arizona",
"05": "Arkansas",
"06": "California",
"08": "Colorado",
"09": "Connecticut",
"10": "Delaware",
"11": "District of Columbia",
"12": "Florida",
"13": "Georgia",
"15": "Hawaii",
"16": "Idaho",
"17": "Illinois",
"18": "Indiana",
"19": "Iowa",
"20": "Kansas",
"21": "Kentucky",
"22": "Louisiana",
"23": "Maine",
"24": "Maryland",
"25": "Massachusetts",
"26": "Michigan",
"27": "Minnesota",
"28": "Mississippi",
"29": "Missouri",
"30": "Montana",
"31": "Nebraska",
"32": "Nevada",
"33": "New Hampshire",
"34": "New Jersey",
"35": "New Mexico",
"36": "New York",
"37": "North Carolina",
"38": "North Dakota",
"39": "Ohio",
"40": "Oklahoma",
"41": "Oregon",
"42": "Pennsylvania",
"72": "Puerto Rico",
"44": "Rhode Island",
"45": "South Carolina",
"46": "South Dakota",
"47": "Tennessee",
"48": "Texas",
"78": 'U.S. Virgin Islands',
"49": "Utah",
"50": "Vermont",
"51": "Virginia",
"53": "Washington",
"54": "West Virginia",
"55": "Wisconsin",
"56": "Wyoming"
}

geo_file = open('gz_2010_us_050_00_20m.json')
topo_file = open('us.json')


# returns JSON object as
# a dictionary
geo = json.load(geo_file)
topo = json.load(topo_file)

# Iterating through the json
# list

for t in topo["objects"]["states"]['geometries']:
    state_fip = str(t["id"])
    if len(state_fip) == 1:
        state_fip = '0' + state_fip

    # embed()
    t['properties'] = {}
    t['properties']['state'] = state_fips[state_fip]

for t in topo["objects"]["counties"]['geometries']:
    id_str = str(t["id"])
    if len(id_str) == 4:
        id_str = "0" + id_str

    county_fip = id_str[2:6]
    state_fip = id_str[0:2]

    for g in geo["features"]:
        if g["properties"]["NAME"] == 'Ketchikan Gateway':
            embed()
        if state_fip == g["properties"]["STATE"] and county_fip == g["properties"]["COUNTY"]:
            print(g["properties"]["COUNTY"] + ', ' + state_fips[g["properties"]["STATE"]])
            t['properties'] = {}
            t['properties']['county'] = g["properties"]["NAME"]
            t['properties']['state'] = state_fips[g["properties"]["STATE"]]
            t['properties']['lsad'] = g["properties"]["LSAD"]

with open('../county-state-topo.json', 'w') as outfile:
    json.dump(topo, outfile)
