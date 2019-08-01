
var indikator1 = document.getElementById("indikator_1");
var indikator2 = document.getElementById("indikator_2");
var indikator3 = document.getElementById("indikator_3");
var indikator4 = document.getElementById("indikator_4");
var indikator5 = document.getElementById("indikator_5");
var indikator6 = document.getElementById("indikator_6");
var indikators = [indikator1, indikator2, indikator3, indikator4, indikator5, indikator6];

let indikator = 3;

var current_color_set = [];

function pickColor(number) {
    switch(number) {
        case 1:
            current_color_set = ["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"];
            break;
        case 2:
            current_color_set = ["#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f"];
            break;
        case 3:
            current_color_set = ["#feedde", "#fdbe85", "#fd8d3c", "#e6550d", "#a63603"];
            break;
    }
    console.log(current_color_set);
}

function SendIndikator() {
   let data = {csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
                indikator1: indikator1.options[indikator1.selectedIndex].value,
                indikator2: (indikator >= 2 ? indikator2.options[indikator2.selectedIndex].value : ""),
                indikator3: (indikator >= 3 ? indikator3.options[indikator3.selectedIndex].value : ""),
                indikator4: (indikator >= 4 ? indikator4.options[indikator4.selectedIndex].value : ""),
                indikator5: (indikator >= 5 ? indikator5.options[indikator5.selectedIndex].value : ""),
                indikator6: (indikator >= 6 ? indikator6.options[indikator6.selectedIndex].value : "")};

    $.ajax({
        type: "POST",
        url: window.location.pathname,
        dataType: "json",
        async: true,
        data: data,
        success: function (data) {
            FillTable(data);
            UpdateValue();
            UpdateNumbers(data);
        }
    });
}

function UpdateValue(){
    var value = document.getElementById("specInfoValueName");
    value.innerText = indikator1.options[indikator1.selectedIndex].value;
}

function UpdateName(area_name){
    var name = document.getElementById("specInfoName");
    name.innerText = area_name;
}

function UpdateBund(area_name){
    var bund = document.getElementById("specInfoBund");
    bund.innerText = area_name;
}

function UpdateID(area_ID){
    var ID = document.getElementById("specInfoID");
    ID.innerText = area_ID;
}


function FillTable(data) {
    let table_data = "";
    console.log(data);
    table_data += "<table id=data_table>";
    table_data += "<thead>"
    table_data += "<tr>";
    table_data += "<th> Rank </th>";
    for(let i = 0; i < indikator; i++){
        table_data += "<th>"+ indikators[i].options[indikators[i].selectedIndex].value + "</th>";
    }
    table_data += "</tr>";
    table_data += "</thead>";
    table_data += "<tbody>"
    for (something in data.result) {

        table_data += "<tr >";
        let rank = parseInt(something);
        rank = rank + 1;
        table_data += "<td>" + rank + "</td>";
        table_data += "<td>" + data.result[something][1] + "</td>";
        table_data += "</tr>";

    }
    table_data += "</tbody>";
    table_data += "</table>";
    $("#data_table tr").remove();
    $("#data_table").replaceWith(table_data)
}

function UpdateNumbers(data) {
    let data_array = [];
    for (something in data.result) {
        data_array.push(data.result[something][1]);
    }
    let minMaxAvg = FindMinMaxAvg(data_array)
    $("#min_value").replaceWith("<td id=min_value>" + minMaxAvg[0].toFixed(3) + "</td>")
    $("#max_value").replaceWith("<td id=max_value>" + minMaxAvg[1].toFixed(3) + "</td>")
    $("#avg_value").replaceWith("<td id=avg_value>" + minMaxAvg[2].toFixed(3) + "</td>")
}

function FindMinMaxAvg(arr) {
    var min = arr[0]; // min
    var max = arr[0]; // max
    var sum = arr[0]; // sum

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
        if (arr[i] > max) {
            max = arr[i];
        }
        sum = sum + arr[i];
    }
    return [min, max, sum / arr.length]
}




document.getElementById("indikator_plus").onclick = function () {
    document.getElementById("indikator_min").style.display = "";
    indikator++
    document.getElementById("in_" + indikator).style.display = "";
    if (indikator >= 6) {
        document.getElementById("indikator_plus").style.display = "none";
    }
    SendIndikator();
}
document.getElementById("indikator_min").onclick = function () {
    document.getElementById("indikator_plus").style.display = "";
    document.getElementById("in_" + indikator).style.display = "none";
    indikator--
    if (indikator <= 1) {
        document.getElementById("indikator_min").style.display = "none";
    }
    SendIndikator();

}


document.getElementById("csv_export").onclick = function () {
    window.location.href = "csv";
};

// Get the modal
var import_modal = document.getElementById("myImportModal");

// Get the button that opens the modal
var import_btn = document.getElementById("csv_upload");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
import_btn.onclick = function () {
    import_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    import_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == import_modal) {
     import_modal.style.display = "none";
    }
}
// Get the modal
var setting_modal = document.getElementById("settings");

// Get the button that opens the modal
var conf_icon = document.getElementById("conf");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
conf_icon.onclick = function () {
    setting_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    setting_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == setting_modal) {
     setting_modal.style.display = "none";
    }
}

var map_selector = document.getElementById("map_selector");

function ChangeMap(){
      let value = map_selector.options[map_selector.selectedIndex].value;
      let map = document.getElementById("svg_map");
      switch(value){
          case "Kreise":
              map.setAttribute("data", "static/bmf/resources/kreise.svg");
              break;
          case "AMR12":
              map.setAttribute("data", "static/bmf/resources/amr12.svg");
              break;
          case "AMR20":
              map.setAttribute("data", "static/bmf/resources/amr20.svg");
              break;
      }
}

function specInfo(target){
    console.log(target);
    let name = document.getElementById("specInfoName");
    let id = document.getElementById("specInfoID");
    let value = document.getElementById("specInfoValue");
    let Bund = document.getElementById("specInfoBund");
    let rank = document.getElementById("specInfoRank");
    name.innerText = Math.floor(Math.random()*10);
    id.innerText = Math.floor(Math.random()*10);
    value.innerText = Math.floor(Math.random()*10);
    Bund.innerText = Math.floor(Math.random()*10);
    rank.innerText = Math.floor(Math.random()*10);
}


//Map logic

var width = document.getElementById("map_place").clientWidth;
var height = document.getElementById("big").clientHeight;
var scale = function() {
    if(width < 500){
      return  300/width*1600;
    }
     return 960/width*2000;

}
var geojson = {}
console.log(width);
console.log(height);


var projection = d3.geoMercator()

    .scale(scale())
    .center([10.3736325636218, 51.053178814923065])
        .translate([width/2,height/2])
    ;



var path = d3.geoPath().projection(projection);

var svg = d3.select("#map_place").append("svg")
    .attr("width", width)
    .attr("height", height);


d3.json(AMR_12_url).then( function(topology, error) {
  if (error) console.log(error);

  console.log("topojson", topology)
  var geojson = topojson.feature(topology, topology.objects.Kreise_402_all_features);
  console.log("geojson", geojson)
  svg.selectAll("path")
      .data(geojson.features)
     .enter()
      .append("path")
      .attr("d", path)
      .on("click", clicked);
  console.log("end");
});

function clicked(d) {
    UpdateName(d.properties.NAME_2);
    UpdateBund(d.properties.NAME_1);
    UpdateID(d.properties.CC_2);

    console.log(d.properties);
}
