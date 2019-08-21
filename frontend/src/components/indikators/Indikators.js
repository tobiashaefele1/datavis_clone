import React, {Component} from 'react';
import Main_selector from './Main_selector';
import {connect} from 'react-redux';

/**
 *Component class for all the indicators.
 *
 * @class Indikators
 * @extends {Component}
 */
class Indikators extends Component {
  /**
   *This function is automatically called when the props or state updates
   *
   * @memberof Indikators
   */
  componentDidUpdate(prevProps) {
    // this.props.dispatch({type: 'UPDATECOLUMNS'});
    if (prevProps.indikator_counter !== this.props.indikator_counter ||
        prevProps.view_multiple !== this.props.view_multiple ||
            prevProps.count_map !== this.props.count_map
    )
    {
      console.log("AJAX REQUEST THROUGH COMPONENTDIDUPDATE IN INDIKATORS")
      this.props.dispatch({type: 'LOADINGCHANGE'});
      this.ajaxRequest()
    }
    }



    /**
     *This function collects all the data from the indicators shown.
     *
     * @return {Dict} the data ready to send to the server
     * @memberof Indikator
     */
    getData() {
      console.log(this.props.value_dic['var_year_4']);
      console.log(this.props.all_years[this.props.value_dic['var_name_4']]);
      console.log(this.props.value_dic['var_year_5']);
      console.log(this.props.all_years[this.props.value_dic['var_name_5']]);
      const data = {

        'var_1': [this.props.value_dic['var_name_0'],
          ((this.props.value_dic['var_year_0'] in this.props.all_years[this.props.value_dic['var_name_0']]) ? this.props.value_dic['var_year_0'] : this.props.all_years[this.props.value_dic['var_name_0']][0] ),
          this.props.value_dic['ref_name_0'],
          this.props.value_dic['ref_year_0'],
          this.props.map_name[this.props.count_map],
          (this.props.value_dic['var_name_0'] ? this.props.metadata[this.props.value_dic['var_name_0']].Standardisierung : ''),
          (this.props.view_multiple ? this.props.value_dic['weight_0'] : 100)],

        'var_2': [
          (this.props.indikator_counter > 1 ? this.props.value_dic['var_name_1'] : ''),
          (this.props.indikator_counter > 1 ? (
              this.props.value_dic['var_year_1'] in this.props.all_years[this.props.value_dic['var_name_1']] ? this.props.value_dic['var_year_1'] : this.props.all_years[this.props.value_dic['var_name_1']][0] ) : ''),
          (this.props.indikator_counter > 1 ? this.props.value_dic['ref_name_1'] : ''),
          (this.props.indikator_counter > 1 ? this.props.value_dic['ref_year_1'] : ''),
          this.props.map_name[this.props.count_map],
          (this.props.indikator_counter > 1 ? (this.props.value_dic['var_name_1'] ? this.props.metadata[this.props.value_dic['var_name_1']].Standardisierung : '') : ''),
          (this.props.indikator_counter > 1 ? this.props.value_dic['weight_1'] : '')],
        'var_3': [
          (this.props.indikator_counter > 2 ? this.props.value_dic['var_name_2'] : ''),
          (this.props.indikator_counter > 2 ? (
              this.props.value_dic['var_year_2'] in this.props.all_years[this.props.value_dic['var_name_2']] ? this.props.value_dic['var_year_2'] : this.props.all_years[this.props.value_dic['var_name_2']][0] ) : ''),
          (this.props.indikator_counter > 2 ? this.props.value_dic['ref_name_2'] : ''),
          (this.props.indikator_counter > 2 ? this.props.value_dic['ref_year_2'] : ''),
          this.props.map_name[this.props.count_map],
          (this.props.indikator_counter > 2 ? (this.props.value_dic['var_name_2'] ? this.props.metadata[this.props.value_dic['var_name_2']].Standardisierung : '') : ''),
            (this.props.indikator_counter > 2 ? this.props.value_dic['weight_2'] : '')],
        'var_4': [
          (this.props.indikator_counter > 3 ? this.props.value_dic['var_name_3'] : ''),
          (this.props.indikator_counter > 3 ? (this.props.value_dic['var_name_3'] ?
              (this.props.value_dic['var_year_3'] in this.props.all_years[this.props.value_dic['var_name_3']] ? this.props.value_dic['var_year_3'] : this.props.all_years[this.props.value_dic['var_name_3']][0] ) : '') : ''),
          (this.props.indikator_counter > 3 ? this.props.value_dic['ref_name_3'] : ''),
          (this.props.indikator_counter > 3 ? this.props.value_dic['ref_year_3'] : ''),
          this.props.map_name[this.props.count_map],
          (this.props.indikator_counter > 3 ? (this.props.value_dic['var_name_3'] ? this.props.metadata[this.props.value_dic['var_name_3']].Standardisierung : '') : ''),
            (this.props.indikator_counter > 3 ? this.props.value_dic['weight_3'] : '')],
        'var_5': [
          (this.props.indikator_counter > 4 ? this.props.value_dic['var_name_4'] : ''),
         (this.props.indikator_counter > 4 ? (this.props.value_dic['var_name_4'] ?
              (this.props.value_dic['var_year_4'] in this.props.all_years[this.props.value_dic['var_name_4']] ? this.props.value_dic['var_year_4'] : this.props.all_years[this.props.value_dic['var_name_4']][0] ) : '') : ''),
            (this.props.indikator_counter > 4 ? this.props.value_dic['ref_name_4'] : ''),
          (this.props.indikator_counter > 4 ? this.props.value_dic['ref_year_4'] : ''),
          this.props.map_name[this.props.count_map],
          (this.props.indikator_counter > 4 ? (this.props.value_dic['var_name_4'] ? this.props.metadata[this.props.value_dic['var_name_4']].Standardisierung : '') : ''),
            (this.props.indikator_counter > 4 ? this.props.value_dic['weight_4'] : '')],
        'var_6': [
          (this.props.indikator_counter > 5 ? this.props.value_dic['var_name_5'] : ''),
           (this.props.indikator_counter > 5 ? (this.props.value_dic['var_name_5'] ?
              (this.props.value_dic['var_year_5'] in this.props.all_years[this.props.value_dic['var_name_5']] ? this.props.value_dic['var_year_5'] : this.props.all_years[this.props.value_dic['var_name_5']][0] ) : '') : ''),
          (this.props.indikator_counter > 5 ? this.props.value_dic['ref_name_5'] : ''),
          (this.props.indikator_counter > 5 ? this.props.value_dic['ref_year_5'] : ''),
          this.props.map_name[this.props.count_map],
          (this.props.indikator_counter > 5 ? (this.props.value_dic['var_name_5'] ? this.props.metadata[this.props.value_dic['var_name_5']].Standardisierung : '') : ''),
            (this.props.indikator_counter > 5 ? this.props.value_dic['weight_5'] : '')],
      };
      console.log(data);
      return data;
    }

    /**
     *This function sends a POST request to the server
     * and handles the incoming data.
     *
     * @memberof Indikator
     */
    ajaxRequest() {
      $.ajax({
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        url: window.location.pathname,
        dataType: 'json',
        asnyc: true,
        data: this.getData(),
        traditional: true,
        success: function(data) {

        this.updateDataProm(data).then(() => {
                  this.props.dispatch({type: 'UPDATECOLUMNS'});
                  this.changeVars();
          });

          // this.updateData(data);
        }.bind(this),


      });
    }
    updateDataProm(data){
      // console.log(data);
        return new Promise((resolve, reject) => {
            this.props.dispatch({type: 'UPDATEDATA', data: data});
      if ("1" == "1") {
        resolve(console.log("it worked"));
      } else {
        reject(Error(console.log("It broke")));
      }
    });
    };

     changeVars() {

      this.props.dispatch({type: 'CHANGEVARS'});
    }






  /**
   *This is the function that renders the indicators.
   *
   * @return {JSX}
   * @memberof Indikators
   */
  render() {
    return (
      <div  >

	  
		  
        {this.props.indikators.map( (d, i) =>
          <Main_selector key={i} number={i} name={d} ajaxRequest={this.ajaxRequest.bind(this)} getData = {this.getData} />

        )
		}
	</div>
      

    );
  }
}

/**
 *Here the props are selected from the store.
 *
 * @param {state} state current state of the store
 * @return {props} returns the selected states as props
 */
function mapStateToProps(state) {
  return {
    indikators: state.indikators,
    view_multiple: state.view_multiple,
    metadata: state.metadata,
    col_names_ref: state.col_names_ref,
    years_ref: state.years_ref,
    years_var: state.years_var,
    table_data: state.table_data,
    indicator_data: state.indicator_data,
    indikator_counter: state.indikator_counter,
    value_dic: state.value_dic,
    count_map: state.count_map,
    current_map: state.current_map,
    map_name: state.map_name,
    var_year_data: state.var_year_data,
    single_indic_data: state.single_indic_data,
	loading: state.loading,
      all_years: state.all_years,

  };
}

export default connect(mapStateToProps)(Indikators);
