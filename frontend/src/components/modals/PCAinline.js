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
class PCAinline extends Component {

    /**
     *This function closes the modal.
     *
     * @memberof Info
     */

    // figure out East / West colorscheme

        eastWestColor = (x) => {

            var layer = 3;
            const eastwest = this.props.ost_west;
            if (this.props.current_map.length == 259){
               // console.log(this.props.current_map.length)
                    layer = 1}
           else if(this.props.current_map.length == 258){
           layer = 2}

           else if(this.props.current_map.length == 224){
               layer = 3}
           else if(this.props.current_map.length == 97){
               layer = 4}
           else if(this.props.current_map.length == 17) {
                   layer = 5}

           else {
               layer = 0}

           // console.log(layer)

            var result = "green"
            eastwest.forEach((function(d,i){
              if(d[layer] == x){
                result = ((d[6] == 1) ? "green" : ((d[6] == 2) ? "red" : "blue" ))
              }

            }))

            return result



        }

        // I need an additional scale for the size
    zScale = (x) => {

         const inhabitants = [];
         const current_map = this.props.current_map;
        var value = 5;
         current_map.map((d,i) =>
             inhabitants.push([d.properties.Kennziffer, d.properties.Einwohner_2017]))

        current_map.forEach((function(d){
           if(d.properties.Kennziffer == x) {
                 value = d.properties.Einwohner_2017}
        })

        )
        const min = Math.min(...inhabitants.map(o => o[1]))
        const max = Math.max(...inhabitants.map(o => o[1]))
        const z_scale = d3.scaleLinear()
            .domain([min,max])
            .range([3, 15])
            .nice()
    return z_scale(value)
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
    renderthewholething = (x) => {}


    render() {


      if (this.props.showPCA) {
                const input = this.props.value_dic;


                       return (

              <svg id="svg-pca" width="50%" height="50%" viewBox="0 0 400 400">
                  <g className="pca">

                      {this.props.table_data.map((d,i) =>
                      <circle
                          id={d["Kennziffer"]}
                          text={i+1}
                          cx={this.xScale(d[input["var_name_0"] + " " + input["var_year_0"]])}
                          cy={this.yScale(d[input["var_name_1"] + " " + input["var_year_1"]])}
                           r={((this.zScale(d["Kennziffer"])))}
                          fill={
                                this.eastWestColor(d["Kennziffer"])
                          }
                          >
                          <title>
                              {d.Name}
                              {d["Kennziffer"]}
                             </title>
                      </circle>
                      )}
                  </g>

                    <g>
                    <line
                           x1="0"
                           y1="0"
                          x2="0"
                          y2="400"
                          style={{stroke: "rgb(0,0,0)", strokeWidth: "2"}}/>
                             <text className="pca_label"
                               x = "0"
                                   y = {`${400/5}`} >
                               {Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_0"] + " " + this.props.value_dic["var_year_0"]]))/5}
                           </text>

                         <text
                                                       className="pca_label"
                               x = "0"
                                   y = {`${400/5*2}`} >
                               {Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_0"] + " " + this.props.value_dic["var_year_0"]]))/5*2}
                           </text>

                         <text
                                                       className="pca_label"
                               x = "0"
                                   y = {`${400/5*3}`} >
                               {Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_0"] + " " + this.props.value_dic["var_year_0"]]))/5*3}
                           </text>

                         <text
                                                       className="pca_label"
                               x = "0"
                                   y = {`${400/5*4}`} >
                               {Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_0"] + " " + this.props.value_dic["var_year_0"]]))/5*4}
                           </text>

                           <text
                                                         className="pca_label"
                               x = "0"
                                   y = "400" >
                               {Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_0"] + " " + this.props.value_dic["var_year_0"]]))}
                           </text>
                    </g>

                <g>
                      <line
                           x1="0"
                           y1="0"
                          x2="400"
                          y2="0"
                          style={{stroke: "rgb(0,0,0)", strokeWidth: "2"}}
                            />

                      <text
                          className="pca_label"
                               x = {`${400/5}`}
                                   y = "10" >
                               {Math.round(Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_1"] + " " + this.props.value_dic["var_year_1"]]))/5)}
                      </text>

                      <text
                          className="pca_label"
                               x = {`${400/5*2}`}
                                   y = "10" >
                               {Math.round(Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_1"] + " " + this.props.value_dic["var_year_1"]]))/5*2)}
                      </text>

                      <text
                                                    className="pca_label"
                               x = {`${400/5*3}`}
                                   y = "10" >
                               {Math.round(Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_1"] + " " + this.props.value_dic["var_year_1"]]))/5*3)}
                      </text>

                       <text
                           className="pca_label"
                               x = {`${400/5*4}`}
                                   y = "10" >
                               {Math.round(Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_1"] + " " + this.props.value_dic["var_year_1"]]))/5*4)}
                       </text>

                       <text
                                                     className="pca_label"
                               x = "380"
                                   y = "10" >
                               {Math.round(Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_1"] + " " + this.props.value_dic["var_year_1"]])))}
                       </text>
                </g>

              </svg>) }
      else {return ('')}

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
      current_map: state.current_map,
      ost_west: state.ost_west

  };
}

export default connect(mapStateToProps)(PCAinline);
