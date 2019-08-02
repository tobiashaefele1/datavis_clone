var var_name_1 = document.getElementById("var_name_1");
var var_name_2 = document.getElementById("var_name_2");
var var_name_3 = document.getElementById("var_name_3");
var var_name_4 = document.getElementById("var_name_4");
var var_name_5 = document.getElementById("var_name_5");
var var_name_6 = document.getElementById("var_name_6");
var var_names = [var_name_1, var_name_2, var_name_3, var_name_4, var_name_5, var_name_6];

var var_year_1 = document.getElementById("var_year_1");
var var_year_2 = document.getElementById("var_year_2");
var var_year_3 = document.getElementById("var_year_3");
var var_year_4 = document.getElementById("var_year_4");
var var_year_5 = document.getElementById("var_year_5");
var var_year_6 = document.getElementById("var_year_6");

var weight_1 = document.getElementById("weight_1");
var weight_2 = document.getElementById("weight_2");
var weight_3 = document.getElementById("weight_3");
var weight_4 = document.getElementById("weight_4");
var weight_5 = document.getElementById("weight_5");
var weight_6 = document.getElementById("weight_6");

var ref_name_1 = document.getElementById("ref_name_1");
var ref_name_2 = document.getElementById("ref_name_2");
var ref_name_3 = document.getElementById("ref_name_3");
var ref_name_4 = document.getElementById("ref_name_4");
var ref_name_5 = document.getElementById("ref_name_5");
var ref_name_6 = document.getElementById("ref_name_6");
var ref_names = [var_name_1, var_name_2, var_name_3, var_name_4, var_name_5, var_name_6];

var ref_year_1 = document.getElementById("ref_year_1");
var ref_year_2 = document.getElementById("ref_year_2");
var ref_year_3 = document.getElementById("ref_year_3");
var ref_year_4 = document.getElementById("ref_year_4");
var ref_year_5 = document.getElementById("ref_year_5");
var ref_year_6 = document.getElementById("ref_year_6");


let indicator_count = 3;

// this function updates the number of visible inputs for indicators (# of variables)
document.getElementById("indikator_plus").onclick = function () {
    document.getElementById("indikator_min").style.display = "";
    indicator_count++
    document.getElementById("in_" + indicator_count).style.display = "";
    if (indicator_count >= 6) {
        document.getElementById("indikator_plus").style.display = "none";
    }
    send_var_names_to_backend();
}
document.getElementById("indikator_min").onclick = function () {
    document.getElementById("indikator_plus").style.display = "";
    document.getElementById("in_" + indicator_count).style.display = "none";
    indicator_count--
    if (indicator_count <= 1) {
        document.getElementById("indikator_min").style.display = "none";
    }
    send_var_names_to_backend();

}








// this function sends the entire input on the RHS to the backend
function send_var_names_to_backend() {
      let data  = {
            csrf_token: $("[name=csrf_token]").val(),
            var_name_1: (var_name_1.options[var_name_1.selectedIndex].value),
            var_year_1: (var_year_1.options[var_year_1.selectedIndex].value),
            ref_name_1: (ref_name_1.options[ref_name_1.selectedIndex].value),
            ref_year_1: (ref_year_1.options[ref_year_1.selectedIndex].value),
            weight_1: (weight_1.value),
            
            var_name_2: (indicator_count >= 2 ? var_name_2.options[var_name_2.selectedIndex].value : ""),
            var_year_2: (indicator_count >= 2 ? var_year_2.options[var_year_2.selectedIndex].value : ""),
            ref_name_2: (indicator_count >= 2 ? ref_name_2.options[ref_name_2.selectedIndex].value : ""),
            ref_year_2: (indicator_count >= 2 ? ref_year_2.options[ref_year_2.selectedIndex].value : ""),
            weight_2: (indicator_count >= 2 ? weight_2.value : ""),
            
            var_name_3: (indicator_count >= 3 ? var_name_3.options[var_name_3.selectedIndex].value : ""),
            var_year_3: (indicator_count >= 3 ? var_year_3.options[var_year_3.selectedIndex].value : ""),
            ref_name_3: (indicator_count >= 3 ? ref_name_3.options[ref_name_3.selectedIndex].value : ""),
            ref_year_3: (indicator_count >= 3 ? ref_year_3.options[ref_year_3.selectedIndex].value : ""),
            weight_3: (indicator_count >= 3 ? weight_3.value : ""),
            
            var_name_4: (indicator_count >= 4 ? var_name_4.options[var_name_4.selectedIndex].value : ""),
            var_year_4: (indicator_count >= 4 ? var_year_4.options[var_year_4.selectedIndex].value : ""),
            ref_name_4: (indicator_count >= 4 ? ref_name_4.options[ref_name_4.selectedIndex].value : ""),
            ref_year_4: (indicator_count >= 4 ? ref_year_4.options[ref_year_4.selectedIndex].value : ""),
            weight_4: (indicator_count >= 4 ? weight_4.value : ""),
            
            var_name_5: (indicator_count >= 5 ? var_name_5.options[var_name_5.selectedIndex].value : ""),
            var_year_5: (indicator_count >= 5 ? var_year_5.options[var_year_5.selectedIndex].value : ""),
            ref_name_5: (indicator_count >= 5 ? ref_name_5.options[ref_name_5.selectedIndex].value : ""),
            ref_year_5: (indicator_count >= 5 ? ref_year_5.options[ref_year_5.selectedIndex].value : ""),
            weight_5: (indicator_count >= 5 ? weight_5.value : ""),
            
            var_name_6: (indicator_count >= 6 ? var_name_6.options[var_name_6.selectedIndex].value : ""),
            var_year_6: (indicator_count >= 6 ? var_year_6.options[var_year_6.selectedIndex].value : ""),
            ref_name_6: (indicator_count >= 6 ? ref_name_6.options[ref_name_6.selectedIndex].value : ""),
            ref_year_6: (indicator_count >= 6 ? ref_year_6.options[ref_year_6.selectedIndex].value : ""),
            weight_6: (indicator_count >= 6 ? weight_6.value : "")
            
            };

      $.ajax({
      type:"POST",
      url: window.location.pathname,
      dataType: "json",
      asnyc: true,
      data: data,
       success: function(data) {
            console.log(data)
       }
   });
}