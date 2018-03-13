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

    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path").remove()
    
    svg.selectAll("path")
       .data(state)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("stroke-width", 0.5)
       .attr("stroke", "grey")
       .style("fill", "#3768B7");
  })
}
