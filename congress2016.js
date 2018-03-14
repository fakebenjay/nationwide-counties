function plotDistricts(stateID) {
  var stateNum = stateID.split("-")[1]
  var sliderVal = document.getElementById('distSlider').value

  return d3.json("congress2016.json", function(json) {
    var districtList = json.features.map((district) => {
      if (stateNum === "00") {
        return district.properties.CD115FP
      } else if (district.properties.STATEFP === stateNum) {
        return district.properties.CD115FP
      }
    })

    var state = json.features.filter((district) => {
      if (districtList.includes(district.properties.CD115FP) && parseInt(district.properties.CD115FP) <= sliderVal) {
        return district
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
       .attr("district-name", function(state) {
         return `district-${state.properties.CD115FP}`
       })
       .attr("state-name", function(state) {
         return stateList[`state-${state.properties.STATEFP}`].split("-").join(" ")
       })
       .on("mouseover", function(state) {
         var districtName = state.properties.CD115FP
         var stateName = stateList[`state-${state.properties.STATEFP}`].split("-").join(" ")

         d3.select("div#infobox")
           .text(`${stateName}-${districtName}`)

         d3.selectAll(`[district-name="district-${state.properties.CD115FP.toLowerCase().split(" ").join("-").split(".").join("").split("'").join("")}"]`)
           .attr("fill", "#FF0000")
       })
       .on("mouseout", function(state) {
         d3.select("div#infobox")
           .text("Select a district!")
         d3.selectAll(`[district-name="district-${state.properties.CD115FP.toLowerCase().split(" ").join("-").split(".").join("").split("'").join("")}"]`)
           .attr("fill", "#3768B7")
       });
  })
}

function slider() {
  var slider = document.getElementById('distSlider')
  var sliderVal = slider.value

  $('path').each(function() {
    if (parseInt(this.getAttribute('district-name').split('-')[1]) > sliderVal) {
      $(this).hide()
    } else {
      $(this).show()
    }
  })

  // document.querySelectorAll('path').forEach((district) => {
  //   if (parseInt(district.getAttribute('district-name').split('-')[1]) > sliderVal) {
  //     debugger
  //     district.hidden = true
  //   } else {
  //     district.hidden = false
  //   }
  // })
}
