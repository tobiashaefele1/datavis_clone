/* eslint-disable max-len */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'd3';
import * as d3 from 'd3';

/**
 *Component class to create the Information modal.
 *
 * @class Info
 * @extends {Component}
 */
class PCA extends Component {
    /**
     *This function closes the modal.
     *
     * @memberof Info
     */
    closePCA = () => {
      this.props.dispatch({type: 'PCA'});
    }

    /**
     *This function renders the Info modal.
     *
     * @return {JSX}
     * @memberof Info
     */

        // I need an additional scale for the size
         zScale = () => {



        const z_scale = d3.scaleLinear()
            .domain([10,10])
            .range([0, 200])
            .nice
    return z_scale
    };

    xScale = (x) => {
        const input = this.props.value_dic;
        const input2 = input['var_name_0']
        const year = input['var_year_0']
        const input3 = input2 + " " + year
        const table_data = this.props.table_data;
        const min = Math.min(...table_data.map(o => o[input3]))
        const max = Math.max(...table_data.map(o => o[input3]))

        const x_scale = d3.scaleLinear()
            .domain([min, max])
            .range([0, 400])
            .nice();
        return x_scale(x)
    };

    // one for y values
    yScale = (x) => {
        const input = this.props.value_dic;
        const input2 = input['var_name_1']
        const year = input['var_year_1']
        const input3 = input2 + " " + year;
        const table_data = this.props.table_data;

        const min = Math.min(...table_data.map(o => o[input3]))
        const max = Math.max(...table_data.map(o => o[input3]))

        const y_scale = d3.scaleLinear()
            .domain([min,max])
            .range([0, 400])
            .nice();
    return y_scale(x)
    };



   // then I render these things in react by calling the function and they update, when the values update (e.g. table_data)

    renderthewholething = (x) => {

    }


    render() {
      if (this.props.showPCA) {
          const input = this.props.value_dic;

        return (
          <div className="modal is-active">
            <div className="modal-background"
              onClick={this.closePCA.bind(this)}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">PCA Analyse</p>
              </header>
              <section className="modal-card-body">
                  <p> test </p>


              <svg id="svg" width="100%" height="100%" viewBox="0 0 400 400">
                  <g className="pca">

                      {this.props.table_data.map((d,i) =>
                      <circle
                          id={d["Kennziffer"]}
                          text={i}
                          cx={this.xScale(d[input["var_name_0"] + " " + input["var_year_0"]])}
                          cy={this.yScale(d[input["var_name_1"] + " " + input["var_year_1"]])}
                           r="5"

                      />
                      )}
                  </g>

              </svg>




              </section>
              <footer className="modal-card-foot">
              </footer>
              <div>
              </div>
            </div>
            <button className="modal-close is-large" onClick={this.closePCA.bind(this)} aria-label="close"></button>
          </div>);
      } else {
        return ('');
      }
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
    showPCA: state.showPCA,
    table_data: state.table_data,
    value_dic: state.value_dic,
      metadata: state.metadata,
      smalltable: state.smalltable,

  };
}

export default connect(mapStateToProps)(PCA);
