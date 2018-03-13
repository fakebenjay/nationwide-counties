function plotCounties(stateID) {
  var stateNum = stateID.split("-")[1]

  return d3.json("gz_2010_us_050_00_20m.json", function(json) {
    var countyList = json.features.map((county) => {
      if (stateNum === "00") {
        return county.properties.NAME
      } else if (county.properties.STATE === stateNum) {
        return county.properties.NAME
      }
    })

    var state = json.features.filter((county) => {
      if (countyList.includes(county.properties.NAME)) {
        return county
      }
    })

    var stateList = {
      "state-00": "ALL STATES",
      "state-01": "Alabama",
      "state-02": "Alaska",
      "state-04": "Arizona",
      "state-05": "Arkansas",
      "state-06": "California",
      "state-08": "Colorado",
      "state-09": "Connecticut",
      "state-10": "Delaware",
      "state-11": "District of Columbia",
      "state-12": "Florida",
      "state-13": "Georgia",
      "state-15": "Hawaii",
      "state-16": "Idaho",
      "state-17": "Illinois",
      "state-18": "Indiana",
      "state-19": "Iowa",
      "state-20": "Kansas",
      "state-21": "Kentucky",
      "state-22": "Louisiana",
      "state-23": "Maine",
      "state-24": "Maryland",
      "state-25": "Massachusetts",
      "state-26": "Michigan",
      "state-27": "Minnesota",
      "state-28": "Mississippi",
      "state-29": "Missouri",
      "state-30": "Montana",
      "state-31": "Nebraska",
      "state-32": "Nevada",
      "state-33": "New Hampshire",
      "state-34": "New Jersey",
      "state-35": "New Mexico",
      "state-36": "New York",
      "state-37": "North Carolina",
      "state-38": "North Dakota",
      "state-39": "Ohio",
      "state-40": "Oklahoma",
      "state-41": "Oregon",
      "state-42": "Pennsylvania",
      "state-72": "Puerto Rico",
      "state-44": "Rhode Island",
      "state-45": "South Carolina",
      "state-46": "South Dakota",
      "state-47": "Tennessee",
      "state-48": "Texas",
      "state-49": "Utah",
      "state-50": "Vermont",
      "state-51": "Virginia",
      "state-53": "Washington",
      "state-54": "West Virginia",
      "state-55": "Wisconsin",
      "state-56": "Wyoming"
    }

    console.log(state)

    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path").remove()

    svg.selectAll("path")
       .data(state)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("stroke-width", 0.5)
       .attr("stroke", "grey")
       .attr("fill", "#3768B7")
       .attr("county-name", function(state) {
         var cn = state.properties.NAME.toLowerCase().split(" ").join("-").split(".").join("").split("'").join("")
         return cn
       })
       .attr("state-name", function(state) {
         return stateList[`state-${state.properties.STATE}`]
       })
       .on("mouseover", function(state) {
         var countyName = state.properties.NAME
         var lsad = state.properties.LSAD
         var stateName = stateList[`state-${state.properties.STATE}`].split("-").join(" ")
         var occurrences = document.querySelectorAll(`[county-name=${state.properties.NAME.toLowerCase().split(" ").join("-").split(".").join("").split("'").join("")}]`).length

         d3.select("div#infobox")
           .text(`${countyName} ${lsad}, ${stateName} (${occurrences} occurrences)`)

         d3.selectAll(`[county-name=${state.properties.NAME.toLowerCase().split(" ").join("-").split(".").join("").split("'").join("")}]`)
           .attr("fill", "#FF0000")
       })
       .on("mouseout", function(state) {
         d3.select("div#infobox")
           .text("Select a county!")
         d3.selectAll(`[county-name=${state.properties.NAME.toLowerCase().split(" ").join("-").split(".").join("").split("'").join("")}]`)
           .attr("fill", "#3768B7")
       });
  })
}
