function plotCanadaCounties(provID) {
  var provinceNum = provID

  return d3.json("ca-all-all.geo.json", function(json) {
    var countyList = json.features.map((county) => {
      if (provinceNum === "CA") {
        return county.properties.name
      } else if (county.id.split('.')[1] === provinceNum) {
        return county.properties.name
      }
    })

    var province = json.features.filter((county) => {
      if (countyList.includes(county.properties.name)) {
        return county
      }
    })

    var provList = {
      "CA": "ALL PROVINCES",
      "AB": "Alberta",
      "BC": "British Columbia",
      "MB": "Manitoba",
      "NB": "New Brunswick",
      "NL": "Newfoundland and Labrador",
      "NT": "Northwest Territories",
      "NS": "Nova Scotia",
      "NU": "Nunavut",
      "ON": "Ontario",
      "PE": "Prince Edward Island",
      "QC": "Quebec",
      "SK": "Saskatchewan",
      "YT": "Yukon"
    }

    console.log(province)

    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path").remove()

    svg.selectAll("path")
       .data(province)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("stroke-width", 0.5)
       .attr("stroke", "grey")
       .attr("fill", "#FF0000")
       .attr("county-name", function(province) {
         var cn = province.properties.name.toLowerCase().split(" ").join("-").split(".").join("").split("'").join("").split(", ").join("-").split("/").join("")
         return cn
       })
       .attr("province-name", function(province) {
         return provList[`province-${province.id.split('.')[1]}`]
       })
       .on("mouseover", function(province) {
         var countyName = province.properties.name
         var type = province.properties.type
         var provinceName = provList[`${province.id.split('.')[1]}`].split("-").join(" ")
         var occurrences = document.querySelectorAll(`[county-name=${province.properties.name.toLowerCase().split(" ").join("-").split(".").join("").split("'").join("").split(", ").join("-").split("/").join("")}]`).length

         d3.select("div#infobox")
           .text(`${countyName} ${type}, ${provinceName} (${occurrences} occurrences)`)

         d3.selectAll(`[county-name=${province.properties.name.toLowerCase().split(" ").join("-").split(".").join("").split("'").join("").split(", ").join("-").split("/").join("")}]`)
           .attr("fill", "white")
       })
       .on("mouseout", function(province) {
         d3.select("div#infobox")
           .text("Select a county!")
         d3.selectAll(`[county-name=${province.properties.name.toLowerCase().split(" ").join("-").split(".").join("").split("'").join("").split(", ").join("-").split("/").join("")}]`)
           .attr("fill", "#FF0000")
       });
  })
}
