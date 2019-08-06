
var indikator1 = document.getElementById("indikator_1");
var indikator2 = document.getElementById("indikator_2");
var indikator3 = document.getElementById("indikator_3");
var indikator4 = document.getElementById("indikator_4");
var indikator5 = document.getElementById("indikator_5");
var indikator6 = document.getElementById("indikator_6");
var indikators = [indikator1, indikator2, indikator3, indikator4, indikator5, indikator6];

// TObias: variable transferred to ajax.js
// let indicator_count = 3;

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




function FillTable(data) {
    let table_data = "";
    console.log(data);
    table_data += "<table id=data_table>";
    table_data += "<thead>"
    table_data += "<tr>";
    table_data += "<th> Rank </th>";
    for(let i = 0; i < indicator_count; i++){
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


// TOBIAS: formula transferred into my own file (ajax.js)
//
// document.getElementById("indikator_plus").onclick = function () {
//     document.getElementById("indikator_min").style.display = "";
//     indicator_count++
//     document.getElementById("in_" + indicator_count).style.display = "";
//     if (indicator_count >= 6) {
//         document.getElementById("indikator_plus").style.display = "none";
//     }
//     SendIndikator();
// }
// document.getElementById("indikator_min").onclick = function () {
//     document.getElementById("indikator_plus").style.display = "";
//     document.getElementById("in_" + indicator_count).style.display = "none";
//     indicator_count--
//     if (indicator_count <= 1) {
//         document.getElementById("indikator_min").style.display = "none";
//     }
//     SendIndikator();
//
// }



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

