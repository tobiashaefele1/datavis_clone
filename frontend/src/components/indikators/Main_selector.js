import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'jquery';
import { strict } from 'assert';



/**
 *Component class for a single Indicator.
 *
 * @class Main_selector
 * @extends {Component}
 */
export class Main_selector extends Component {
    /**
     *Handles the change of any of the dropdown menus of the indicator.
     *
     * @param {event} e this is the event where handleChange is called on.
     * @memberof Indikator
     */


        // this function is actually being called - it calls Handlechange and - once it is complete, an ajaxRequest
    handleChangeProm = (e) => {
        this.handleChange(e).then(() => {
					this.props.dispatch({type: 'LOADINGCHANGE'})	
                  this.ajaxRequest();
          });
	

	// componentWillMount(){
	// 	if(!this.props.loading){
	// 		this.changeVars();
	// 	}
	
	}


    handleChange = (e) => {
      return new Promise((resolve, reject) => {
        this.props.dispatch(changeValueDispatch(e.target.id, e.target.value));
        if ("1" == "1") {
          resolve(console.log("it worked"));
        } else {
          reject(Error(console.log("it broke")))
        }
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

    /**
     *This function is automatically called when the props or state updates
     *
     * @param {*} prevProps
     * @memberof Indikator
     */

    componentDidUpdate(prevProps) {
      if (
          prevProps.view_multiple !== this.props.view_multiple ||
         prevProps.count_map !== this.props.count_map) {
			 console.log('from main_selector')
			this.props.dispatch({type: 'LOADINGCHANGE'})	
        this.ajaxRequest();
	  }

	  if(this.props.view_multiple){
		var percentage = 0;
		for (var i in this.props.indikators){
			percentage += parseFloat(document.getElementById(`weight_${i}`).value);
		}

		if(percentage > 100){
			for(i in this.props.indikators){
				document.getElementById(`weight_${i}`).style.background = 'red';
			}
		}else{
			for(i in this.props.indikators){
				document.getElementById(`weight_${i}`).style.background = '';
			}
		}
	}
    }

    /**
     *This function picks the right data and changes the map for coloring.
     *
     * @memberof Indikator
     */
    changeVars() {
		
      this.props.dispatch({type: 'CHANGEVARS'});
    }

    /**
     *This function collects all the data from the indicators shown.
     *
     * @return {Dict} the data ready to send to the server
     * @memberof Indikator
     */
    getData() {
      const data = {

        'var_1': [this.props.value_dic['var_name_0'],
          (this.props.value_dic['var_year_0'] == 0 ? this.props.all_years['var_name_0'][0] : this.props.value_dic['var_year_0']),
          this.props.value_dic['ref_name_0'],
          this.props.value_dic['ref_year_0'],
          this.props.map_name[this.props.count_map],
          this.props.metadata[this.props.value_dic['var_name_0']].Standardisierung,
          (this.props.view_multiple ? this.props.value_dic['weight_0'] : 100)],

        'var_2': [
          (this.props.indikator_counter > 1 ? this.props.value_dic['var_name_1'] : ''),
          (this.props.indikator_counter > 1 ? this.props.value_dic['var_year_1'] : ''),
          (this.props.indikator_counter > 1 ? this.props.value_dic['ref_name_1'] : ''),
          (this.props.indikator_counter > 1 ? this.props.value_dic['ref_year_1'] : ''),
          this.props.map_name[this.props.count_map],
          (this.props.indikator_counter > 1 ? this.props.metadata[this.props.value_dic['var_name_1']].Standardisierung : ''),
          (this.props.indikator_counter > 1 ? this.props.value_dic['weight_1'] : '')],
        'var_3': [
          (this.props.indikator_counter > 2 ? this.props.value_dic['var_name_2'] : ''),
          (this.props.indikator_counter > 2 ? this.props.value_dic['var_year_2'] : ''),
          (this.props.indikator_counter > 2 ? this.props.value_dic['ref_name_2'] : ''),
          (this.props.indikator_counter > 2 ? this.props.value_dic['ref_year_2'] : ''),
          this.props.map_name[this.props.count_map],
          (this.props.indikator_counter > 2 ? this.props.metadata[this.props.value_dic['var_name_2']].Standardisierung : ''),
            (this.props.indikator_counter > 2 ? this.props.value_dic['weight_2'] : '')],
        'var_4': [
          (this.props.indikator_counter > 3 ? this.props.value_dic['var_name_3'] : ''),
          (this.props.indikator_counter > 3 ? this.props.value_dic['var_year_3'] : ''),
          (this.props.indikator_counter > 3 ? this.props.value_dic['ref_name_3'] : ''),
          (this.props.indikator_counter > 3 ? this.props.value_dic['ref_year_3'] : ''),
          this.props.map_name[this.props.count_map],
          (this.props.indikator_counter > 3 ? this.props.metadata[this.props.value_dic['var_name_3']].Standardisierung : ''),
            (this.props.indikator_counter > 3 ? this.props.value_dic['weight_3'] : '')],
        'var_5': [
          (this.props.indikator_counter > 4 ? this.props.value_dic['var_name_4'] : ''),
          (this.props.indikator_counter > 4 ? this.props.value_dic['var_year_4'] : ''),
          (this.props.indikator_counter > 4 ? this.props.value_dic['ref_name_4'] : ''),
          (this.props.indikator_counter > 4 ? this.props.value_dic['ref_year_4'] : ''),
          this.props.map_name[this.props.count_map],
          (this.props.indikator_counter > 4 ? this.props.metadata[this.props.value_dic['var_name_4']].Standardisierung : ''),
            (this.props.indikator_counter > 4 ? this.props.value_dic['weight_4'] : '')],
        'var_6': [
          (this.props.indikator_counter > 5 ? this.props.value_dic['var_name_5'] : ''),
          (this.props.indikator_counter > 5 ? this.props.value_dic['var_year_5'] : ''),
          (this.props.indikator_counter > 5 ? this.props.value_dic['ref_name_5'] : ''),
          (this.props.indikator_counter > 5 ? this.props.value_dic['ref_year_5'] : ''),
          this.props.map_name[this.props.count_map],
          (this.props.indikator_counter > 5 ? this.props.metadata[this.props.value_dic['var_name_5']].Standardisierung : ''),
            (this.props.indikator_counter > 5 ? this.props.value_dic['weight_5'] : '')],
      };
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




    /**
     * This function checks if it is in single view of multiple view.
     * When in Multiple view it returns the percentage box,
     * if not it returns nothing.
     *
     * @return {JSX} the percentage box if needed.
     * @memberof Indikator
     */
    weight = () =>{
      if (this.props.view_multiple) {
        return ( <div className="three columns">
            <div>
          <label>Gewicht (%) </label>
            </div>
          <input className="u-80-width" id={`weight_${this.props.number}`}
            onChange={this.handleChangeProm.bind(this)}
            type="number"
            defaultValue={this.props.value_dic[`weight_${this.props.number}`]}>
          </input>
        </div>);
      }
    }

    /**
     * This function recieves the retuned data from the ajax call.
     * It calls the UpdateData and UpdateColumns dispatch,
     * and the changeVars function.
     *
     * @param {Dict} data
     * @memberof Indikator
     */
    // // THE ORIGINAL VERSION
    // updateData = (data) => {
    //   // console.log(data)
    //   this.props.dispatch({type: 'UPDATEDATA', data});
    //   this.props.dispatch({type: 'UPDATECOLUMNS'});
    //   this.changeVars();
    // }


    //
    //
    //
    //     // I NEED TO TURN THIS INTO A PROMISE
    //   updateData = (data) => {
    //   // console.log(data)
    //   this.props.dispatch({type: 'UPDATEDATA', data});
    //
    //   // AND THEN DO THESE THINGS
    //   this.props.dispatch({type: 'UPDATECOLUMNS'});
    //   this.changeVars();
    //   console.log("hello")
    // }
    //
    // const p = new Promise((resolve, reject) => {
    //   this.props.dispatch({type: 'UPDATEDATA'}, data);
    //   if (1 == 1) {
    //     resolve("success")
    //   }
    // });
    //
    // p.then(() => {
    //               this.props.dispatch({type: 'UPDATECOLUMNS'})
    // }).then(() => {
    //                     this.changeVars()})
    //
    //
    //
    //



    /**
     *This is the function that renders the indicator.
     *
     * @return {JSX}
     * @memberof Indikator
     */
    render() {
      return (

        <div id={`in_${this.props.number}`}>
          <div className="row">
            <div className="six columns">
                 <div className="indicator_tooltip">
                <span className="tooltiptext">
                     Langname: {(this.props.value_dic[`var_name_${this.props.number}`] ?
                     this.props.metadata[this.props.value_dic[`var_name_${this.props.number}`]].Langname : '')}
                      Quelle: {(this.props.value_dic[`var_name_${this.props.number}`] ?
                     this.props.metadata[this.props.value_dic[`var_name_${this.props.number}`]].Quelle : '')}
                    </span>
                <label className="indicator">{this.props.name} <a id="info_icon">&#9432; </a>  </label>
				</div>
                <select className="u-95-width"
                defaultValue={this.props.value_dic[`var_name_${this.props.number}`]}
                id={`var_name_${this.props.number}`}
                onChange={this.handleChangeProm.bind(this)}>
                <option disabled value="0"> -- Wähle Variable --</option>

                {this.props.col_names_var.map((d, i) =>
                  <option value={d} key={i}>{d}</option>
                )
                }
              </select>
            
            </div>


            <div className="three columns">
                <div>
              <label >Jahr </label>
                </div>
              <select className="u-80-width"
                defaultValue={this.props.value_dic[`var_year_${this.props.number}`]}
                id={`var_year_${this.props.number}`}
                onChange={this.handleChangeProm.bind(this)}>

                <option disabled value="0"> -- Wähle Jahr -- </option>

                {this.props.value_dic[`var_name_${this.props.number}`] ? (
                    this.props.all_years[`${this.props.value_dic[`var_name_${this.props.number}`]}`].map((d, i) =>
                      <option value={d} key={i}>{d}</option>)) : ""

                }
              </select>
            </div>

            {this.weight()}

            <div className="row">

              <div className="six columns">
                <select className="u-95-width"
                  defaultValue={this.props.value_dic[`ref_name_${this.props.number}`]}
                  id={`ref_name_${this.props.number}`}
                  onChange={this.handleChangeProm.bind(this)}>

                  <option disabled value="0"> -- Wähle Bezugsgröße -- </option>
                  {this.props.col_names_ref.map((d, i) =>
                    <option value={d} key={i}>{d}</option>
                  )
                  }
                </select>
              </div>

              <div className="three columns">
                <select className="u-80-width"
                  id={`ref_year_${this.props.number}`}
                  onChange={this.handleChangeProm.bind(this)}>
                  defaultValue={this.props.value_dic[`ref_year_${this.props.number}`]}
                  <option disabled value="0"> -- Wähle Jahr -- </option>

                  {this.props.years_ref.map((d, i) =>
                    <option value={d} key={i}>{d}</option>
                  )
                  }

                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }


}



/**
 *This function creates a dispatch ready input from the indicators.
 *
 * @param {String} value1
 * @param {String} value2
 * @return {Dict} that is send to the dispatch
 */
function changeValueDispatch(value1, value2) {
  return {
    type: 'CHANGEVALUE',
    value1,
    value2,
  };
}

// function to transform the current map to inject
// the returned indicator data from the ajax call

/**
 *Here the props are selected from the store.
 *
 * @param {state} state current state of the store
 * @return {props} returns the selected states as props
 */
function mapStateToProps(state) {
  return {
    col_names_var: state.col_names_var,
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
    view_multiple: state.view_multiple,
    single_indic_data: state.single_indic_data,
	metadata: state.metadata,
	indikators: state.indikators,
	loading: state.loading,
      all_years: state.all_years,
  };
}

export default connect(mapStateToProps)(Main_selector);
