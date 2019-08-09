import React, { Component } from 'react';
import { connect } from 'react-redux';


/**
 *
 *
 * @export
 * @class MinMaxTable
 * @extends {Component}
 */
 class MinMaxTable extends Component {
	constructor(props) {
		super(props),
		this.values = ['-', '-', '-']
	}
	

	

	checkData = () => {
	 if(this.props.indicator_data.length > 1 && this.props.single_indic_data.length > 1)
	 {
	    console.log(this.props.single_indic_data);
	    console.log(this.props.indicator_data);
	     const hello  = (this.props.view_multiple ? this.props.indicator_data : this.props.single_indic_data);
        console.log(hello);
        this.values = this.FindMinMaxAvg(hello[1])
	 }
	}

 FindMinMaxAvg(arr) {

  let min = arr[0]; // min
  let max = arr[0]; // max
  let sum = arr[0]; // sum

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
    sum = sum + arr[i];
  }
  return [Math.round(min* 100)/100, Math.round(max* 100)/100, Math.round((sum / arr.length)*100)/100];
}
	
	
	
	render() {
        return (
            <div className="row">
                  <table className="u-80-width" id="table">
                    <thead>
                      <tr>
                        <th>Min</th>
                        <th>Max</th>
                        <th>Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>{this.checkData()}
                        <td id="min_value">{this.values[0]}</td>
                        <td id="max_value">{this.values[1]}</td>
                        <td id="avg_value">{this.values[2]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
        );
	}
	



}

function mapStateToProps(state) {
  return {

    indicator_data: state.indicator_data,
      single_indic_data: state.single_indic_data,
      view_multiple: state.view_multiple,
  
  };
}
export default connect(mapStateToProps)(MinMaxTable)