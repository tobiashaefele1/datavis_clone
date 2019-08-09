import React, {Component} from 'react';
import {connect} from 'react-redux';


/**
 *Component class that creates the min, max and average value under the map.
 *
 * @export
 * @class MinMaxTable
 * @extends {Component}
 */
class MinMaxTable extends Component {
  /**
     *Creates an instance of MinMaxTable.
     * @param {*} props
     * @memberof MinMaxTable
     */
  constructor(props) {
    super(props),
    this.values = ['-', '-', '-'];
  }

    /**
     *This function checks if it is single or multiple view,
     * and updates teh this.values accordingly.
     *
     * @memberof MinMaxTable
     */
    checkData = () => {
      if (this.props.indicator_data.length > 2 || this.props.single_indic_data > 2) {
        const value = (this.props.view_multiple ?
            this.props.indicator_data : this.props.single_indic_data);
        console.log(value);
        this.values = this.findMinMaxAvg(value);
      }
    }

    /**
     *This fucntion calculates the minimum,
     * maximum and average value of an array.
     *
     * @param {Array} arr
     * @return {Array} with the rounded min, max and avg values
     * @memberof MinMaxTable
     */
    findMinMaxAvg(arr) {
      let min = arr[0]; // min
      let max = arr[0];
      let sum = arr[0];

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
          min = arr[i];
        }
        if (arr[i] > max) {
          max = arr[i];
        }
        sum = sum + arr[i];
      }
      return [Math.round(min* 100)/100,
        Math.round(max* 100)/100,
        Math.round((sum / arr.length)*100)/100];
    }

    /**
     *This renders the MinMaxAvg table.
     *
     * @return {JSX}
     * @memberof MinMaxTable
     */
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

/**
 *Here the props are selected from the store.
 *
 * @param {state} state current state of the store
 * @return {props} returns the selected states as props
 */
function mapStateToProps(state) {
  return {
    indicator_data: state.indicator_data,
    single_indic_data: state.single_indic_data,
  };
}

export default connect(mapStateToProps)(MinMaxTable);
