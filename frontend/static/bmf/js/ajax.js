
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
            'var_1': [(var_name_1.options[var_name_1.selectedIndex].value),
                  (var_year_1.options[var_year_1.selectedIndex].value),
                  (ref_name_1.options[ref_name_1.selectedIndex].value),
                  (ref_year_1.options[ref_year_1.selectedIndex].value),
                      (layer), (scale), (weight_1.value)],
            'var_2': [
 (indicator_count >= 2 ? var_name_2.options[var_name_2.selectedIndex].value : ""),
             (indicator_count >= 2 ? var_year_2.options[var_year_2.selectedIndex].value : ""),
             (indicator_count >= 2 ? ref_name_2.options[ref_name_2.selectedIndex].value : ""),
             (indicator_count >= 2 ? ref_year_2.options[ref_year_2.selectedIndex].value : ""),
                 (layer), (scale), (indicator_count >= 2 ? weight_2.value : "")],
'var_3': [
             (indicator_count >= 3 ? var_name_3.options[var_name_3.selectedIndex].value : ""),
             (indicator_count >= 3 ? var_year_3.options[var_year_3.selectedIndex].value : ""),
             (indicator_count >= 3 ? ref_name_3.options[ref_name_3.selectedIndex].value : ""),
             (indicator_count >= 3 ? ref_year_3.options[ref_year_3.selectedIndex].value : ""),
            (layer), (scale), (indicator_count >= 3 ? weight_3.value : "")],
'var_4': [
             (indicator_count >= 4 ? var_name_4.options[var_name_4.selectedIndex].value : ""),
             (indicator_count >= 4 ? var_year_4.options[var_year_4.selectedIndex].value : ""),
             (indicator_count >= 4 ? ref_name_4.options[ref_name_4.selectedIndex].value : ""),
             (indicator_count >= 4 ? ref_year_4.options[ref_year_4.selectedIndex].value : ""),
          (layer), (scale), (indicator_count >= 4 ? weight_4.value : "")],
'var_5':[
             (indicator_count >= 5 ? var_name_5.options[var_name_5.selectedIndex].value : ""),
             (indicator_count >= 5 ? var_year_5.options[var_year_5.selectedIndex].value : ""),
             (indicator_count >= 5 ? ref_name_5.options[ref_name_5.selectedIndex].value : ""),
             (indicator_count >= 5 ? ref_year_5.options[ref_year_5.selectedIndex].value : ""),
                 (layer), (scale), (indicator_count >= 5 ? weight_5.value : "")],
'var_6':[
             (indicator_count >= 6 ? var_name_6.options[var_name_6.selectedIndex].value : ""),
             (indicator_count >= 6 ? var_year_6.options[var_year_6.selectedIndex].value : ""),
             (indicator_count >= 6 ? ref_name_6.options[ref_name_6.selectedIndex].value : ""),
             (indicator_count >= 6 ? ref_year_6.options[ref_year_6.selectedIndex].value : ""),
            (layer), (scale), (indicator_count >= 6 ? weight_6.value : "")]

            };


      $.ajax({
      type:"POST",
      url: window.location.pathname,
      dataType: "json",
      asnyc: true,
      data: data,
            traditional: true,
       success: function(data) {
            console.log(data);
       }
   });
}


//
// var table_1 = document.getElementById("table_test");
//
// function update_table(){
//
//                          {% for i in table_data %}
//                               <h1>  {{ i }}  </h1>
//                           {% endfor %}
// }


        // this is the old way of encoding the data
      // let data  = {
      //       csrf_token: $("[name=csrf_token]").val(),
      //       var_name_1: (var_name_1.options[var_name_1.selectedIndex].value),
      //       var_year_1: (var_year_1.options[var_year_1.selectedIndex].value),
      //       ref_name_1: (ref_name_1.options[ref_name_1.selectedIndex].value),
      //       ref_year_1: (ref_year_1.options[ref_year_1.selectedIndex].value),
      //       weight_1: (weight_1.value),
      //
      //       var_name_2: (indicator_count >= 2 ? var_name_2.options[var_name_2.selectedIndex].value : ""),
      //       var_year_2: (indicator_count >= 2 ? var_year_2.options[var_year_2.selectedIndex].value : ""),
      //       ref_name_2: (indicator_count >= 2 ? ref_name_2.options[ref_name_2.selectedIndex].value : ""),
      //       ref_year_2: (indicator_count >= 2 ? ref_year_2.options[ref_year_2.selectedIndex].value : ""),
      //       weight_2: (indicator_count >= 2 ? weight_2.value : ""),
      //
      //       var_name_3: (indicator_count >= 3 ? var_name_3.options[var_name_3.selectedIndex].value : ""),
      //       var_year_3: (indicator_count >= 3 ? var_year_3.options[var_year_3.selectedIndex].value : ""),
      //       ref_name_3: (indicator_count >= 3 ? ref_name_3.options[ref_name_3.selectedIndex].value : ""),
      //       ref_year_3: (indicator_count >= 3 ? ref_year_3.options[ref_year_3.selectedIndex].value : ""),
      //       weight_3: (indicator_count >= 3 ? weight_3.value : ""),
      //
      //       var_name_4: (indicator_count >= 4 ? var_name_4.options[var_name_4.selectedIndex].value : ""),
      //       var_year_4: (indicator_count >= 4 ? var_year_4.options[var_year_4.selectedIndex].value : ""),
      //       ref_name_4: (indicator_count >= 4 ? ref_name_4.options[ref_name_4.selectedIndex].value : ""),
      //       ref_year_4: (indicator_count >= 4 ? ref_year_4.options[ref_year_4.selectedIndex].value : ""),
      //       weight_4: (indicator_count >= 4 ? weight_4.value : ""),
      //
      //       var_name_5: (indicator_count >= 5 ? var_name_5.options[var_name_5.selectedIndex].value : ""),
      //       var_year_5: (indicator_count >= 5 ? var_year_5.options[var_year_5.selectedIndex].value : ""),
      //       ref_name_5: (indicator_count >= 5 ? ref_name_5.options[ref_name_5.selectedIndex].value : ""),
      //       ref_year_5: (indicator_count >= 5 ? ref_year_5.options[ref_year_5.selectedIndex].value : ""),
      //       weight_5: (indicator_count >= 5 ? weight_5.value : ""),
      //
      //       var_name_6: (indicator_count >= 6 ? var_name_6.options[var_name_6.selectedIndex].value : ""),
      //       var_year_6: (indicator_count >= 6 ? var_year_6.options[var_year_6.selectedIndex].value : ""),
      //       ref_name_6: (indicator_count >= 6 ? ref_name_6.options[ref_name_6.selectedIndex].value : ""),
      //       ref_year_6: (indicator_count >= 6 ? ref_year_6.options[ref_year_6.selectedIndex].value : ""),
      //       weight_6: (indicator_count >= 6 ? weight_6.value : "")
      //
      //       };