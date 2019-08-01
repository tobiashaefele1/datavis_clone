
var width = document.getElementById("map_place").clientWidth;
var height = document.getElementById("big").clientHeight;
var scale = function() {
    if(width < 500){
      return  300/width*1600;
    }
     return 960/width*1600;

}
var geojson = {}
console.log(width);
console.log(height);
d3.json(AMR_12_url, function(error, topology) {
    if (error) throw error;

    console.log("topojson", topology)
    geojson = topojson.feature(topology, topology.objects.Kreise_402_all_features);
});
var projection = d3.geoMercator()

    .scale(scale())
    .center([10.3736325636218, 51.053178814923065])
        .translate([width/2,height/2])
    ;



var path = d3.geoPath().projection(projection);

var svg = d3.select("#map_place").append("svg")
    .attr("width", width)
    .attr("height", height);


d3.json(AMR_12_url, function(error, topology) {
  if (error) throw error;

  console.log("topojson", topology)
  var geojson = topojson.feature(topology, topology.objects.Kreise_402_all_features);
  console.log("geojson", geojson)
  svg.selectAll("path")
      .data(geojson.features)
     .enter()
      .append("path")
      .attr("d", path)
      .on("click", clicked);

});

function clicked(d){
    updateName(d.properties.NAME_1)
    console.log(d.properties);
}