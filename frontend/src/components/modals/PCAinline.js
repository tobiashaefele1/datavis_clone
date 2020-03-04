/* eslint-disable max-len */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'd3';
import * as d3 from 'd3';
import * as V from 'victory';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import {store} from "../Store";


/**
 *Component class to create the Information modal.
 *
 * @class Info
 * @extends {Component}
 */
class PCAinline extends Component {

    state = {}


     shouldComponentUpdate(nextProps, nextState) {
        console.log("test")
    if(this.props.showPCA !== nextProps.showPCA){
        return true
    }

    else if (this.props.table_data === nextProps.table_data) {
      return false;
    }

    else {
      return true;
    }
  }


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
                  // 1 = West Germany, 2 = Berlin, other = East
                result = ((d[6] == 1) ? "#FF7619" : ((d[6] == 2) ? "red" : "#24CC14" ))
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

    tableUpdate = (x) => {
        var result;
        const current_map = this.props.current_map;
        current_map.forEach((function(d,i){
            if (d.properties.Kennziffer == x){
                result = i;
            }
        }))
      this.props.dispatch(changeNameDispatch(result));
    }


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
            .range([400, 0])
            .nice();
    return y_scale(x)
    };


   // then I render these things in react by calling the function and they update, when the values update (e.g. table_data)
    renderthewholething = (x) => {}

    handleClick = (i) =>{
      console.log(i)
      this.props.dispatch(changeNameDispatch(i));
    }


    mouseover = (d) => {

            document.getElementById(d).style.fill = "black"
            this.tableUpdate(d)

        }

    mouseout = (d) => {

            document.getElementById(d).style.fill = ""
        }


    render() {
        console.log("PCA-inline-reload")


      if (this.props.showPCA) {

            console.log(this.props.table_data)

                let xMin = Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_0"] + " " + this.props.value_dic["var_year_0"]]));
                let xMax = Math.max(...this.props.table_data.map(o => o[this.props.value_dic["var_name_0"] + " " + this.props.value_dic["var_year_0"]]));
                let yMin =  Math.min(...this.props.table_data.map(o => o[this.props.value_dic["var_name_1"] + " " + this.props.value_dic["var_year_1"]]));
                let yMax = Math.max(...this.props.table_data.map(o => o[this.props.value_dic["var_name_1"] + " " + this.props.value_dic["var_year_1"]]));

                const input = this.props.value_dic;
                const data = this.props.table_data;

                       return (

                // THIS IS THE FUNCTIONAL VICTORY CHART. SLOW TING THO
                //
                // <VictoryChart
                //   theme={VictoryTheme.material}
                //   domain={{ x: this.xScale.domain, y: this.yScale.domain }}
                //     animate={{ duration: 1200, easing: "cubic" }}
                // >
                //   <VictoryScatter
                //     style={{ data: { fill: ({ datum }) => this.eastWestColor(datum["Kennziffer"]),
                //          id: ({ datum }) => (datum["Kennziffer"])
                //         } }}
                //     id={"abc"}
                //     // labels={({ datum }) => `x: ${[input["var_name_0"] + " " + input["var_year_0"]]}, y: ${[input["var_name_1"] + " " + input["var_year_1"]]}`}
                //     // labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }} />}
                //     data={data}
                //     size={({ datum }) => this.zScale(datum["Kennziffer"])}
                //     x={[input["var_name_0"] + " " + input["var_year_0"]]}
                //     y={[input["var_name_1"] + " " + input["var_year_1"]]}
                //      events={[{
                //               target: "data",
                //               eventHandlers: {
                //                 onMouseOver: () => {
                //                   return [
                //                     {
                //                       target: "data",
                //                       mutation: (props) => {
                //                         const fill = props.style && props.style.fill;
                //                         return fill === "black" ? null : { style: { fill: "black" } };
                //                       }
                //                     },
                //                   ];
                //                 },
                //
                //                  onMouseOut: () =>  {return [
                //                     {
                //                       target: "data",
                //                       mutation: (props) => {
                //                         const fill = props.style && props.style.fill;
                //                         return fill === "black" ? null : { style: { fill: "black" } };
                //                       }
                //                     },
                //                   ];
                //                 },
                //               }
                //             }]}
                //
                //
                //          />
                // </VictoryChart>
                //
                //
                //        )
               <svg id="svg-pca" width="62%" height="62%" viewBox="0 0 500 450">

      <g
      transform = "translate(70,10)"
      >

      <line
             x1="0"
             y1="0"
            x2="0"
            y2="400"
            style={{stroke: "rgb(0,0,0)", strokeWidth: "1.5"}}/>

            {/*vertical lines*/}
          <line className="grid-line"
             x1={`${400/5}`}
             y1="0"
            x2={`${400/5}`}
            y2="400"
            // style={{stroke: "rgb(0,0,0)", strokeWidth: "0.5"}}
          />

          <line className="grid-line"
             x1={`${400/5*2}`}
             y1="0"
            x2={`${400/5*2}`}
            y2="400"
            // style={{stroke: "rgb(0,0,0)", strokeWidth: "0.5"}}
          />

                 <line className="grid-line"
             x1={`${400/5*3}`}
             y1="0"
            x2={`${400/5*3}`}
            y2="400"
            // style={{stroke: "rgb(0,0,0)", strokeWidth: "0.5"}}
                 />

                 <line className="grid-line"
             x1={`${400/5*4}`}
             y1="0"
            x2={`${400/5*4}`}
            y2="400"
            // style={{stroke: "rgb(0,0,0)", strokeWidth: "0.5"}}
                 />








               <text className="pca_label y-axis"
                 x = "-10"
                     y = "10" >
                 {Math.round(yMax).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
             </text>

           <text
                                         className="pca_label y-axis"
                 x = "-10"
                     y = {`${400/5*1}`} >
                 {Math.round((yMin+((yMax-yMin)/5*4))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
             </text>

           <text
                                         className="pca_label y-axis"
                 x = "-10"
                     y = {`${400/5*2}`} >
                 {Math.round((yMin+((yMax-yMin)/5*3))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
             </text>

           <text
                                         className="pca_label y-axis"
                 x = "-10"
                     y = {`${400/5*3}`} >
                 {Math.round((yMin+((yMax-yMin)/5*2))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
             </text>

             <text
                                           className="pca_label y-axis"
                 x = "-10"
                     y = {`${400/5*4}`} >
                 {`${Math.round((yMin+((yMax-yMin)/5)))}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
             </text>
      </g>

  <g
                      transform = "translate(70,10)"
  >
        <line
             x1="0"
             y1="400"
            x2="400"
            y2="400"
            style={{stroke: "rgb(0,0,0)", strokeWidth: "1.5"}}
              />

        {/*      horizontal lines below*/}

                <line className="grid-line"
             x1="0"
             y1={`${400/5}`}
            x2="400"
            y2={`${400/5}`}
            // style={{stroke: "rgb(0,0,0)", strokeWidth: "0.5"}}
              />
                      <line className="grid-line"
             x1="0"
             y1={`${400/5*2}`}
            x2="400"
            y2={`${400/5*2}`}
            // style={{stroke: "rgb(0,0,0)", strokeWidth: "0.5"}}
              />

                      <line className="grid-line"
             x1="0"
             y1={`${400/5*3}`}
            x2="400"
            y2={`${400/5*3}`}
            // style={{stroke: "rgb(0,0,0)", strokeWidth: "0.5"}}
              />

                      <line className="grid-line"
             x1="0"
             y1={`${400/5*4}`}
            x2="400"
            y2={`${400/5*4}`}
            // style={{stroke: "rgb(0,0,0)", strokeWidth: "0.5"}}
              />






        <text
            className="pca_label x-axis-label"
                 x = {`${400/5}`}
                     y = "415" >
                 {Math.round((xMin+((xMax - xMin)/5))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </text>

        <text
            className="pca_label x-axis-label"
                 x = {`${400/5*2}`}
                     y = "415" >
                 {Math.round((xMin+((xMax - xMin)/5*2))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </text>

        <text
                                      className="pca_label x-axis-label"
                 x = {`${400/5*3}`}
                     y = "415" >
                 {Math.round((xMin+((xMax - xMin)/5*3))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </text>

         <text
             className="pca_label x-axis-label"
                 x = {`${400/5*4}`}
                     y = "415" >
                 {Math.round((xMin+((xMax - xMin)/5*4))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
         </text>

         <text
                                       className="pca_label x-axis-label"
                 x = "380"
                     y = "415" >
                 {Math.round((xMax)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
         </text>
  </g>




      <g className="pca"
                              transform="translate(70,10)"
    >

        {this.props.table_data.map((d,i) =>
        <circle
            id={`circle_${d["Kennziffer"]}`}
            text={i+1}
            className = "pcaCircles"
            cx={this.xScale(d[input["var_name_0"] + " " + input["var_year_0"]])}
            cy={this.yScale(d[input["var_name_1"] + " " + input["var_year_1"]])}
             r={((this.zScale(d["Kennziffer"])))}
            fill={
                  this.eastWestColor(d["Kennziffer"])
            }
            onMouseOver= {this.mouseover.bind(this,d["Kennziffer"])}
            onMouseOut = {this.mouseout.bind(this,d["Kennziffer"])}
            >
            <title>
                {d.Name}
                {d["Kennziffer"]}
               </title>
        </circle>
        )}

    </g>



</svg>

             // <div>






                       )
                 }
      else {return ('')}

    }
}

function changeNameDispatch(value) {
  return {
    type: 'CHANGE_NAME',
    value,
  };
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
      // metadata: state.metadata,
      // smalltable: state.smalltable,
      current_map: state.current_map,
      ost_west: state.ost_west

  };
}

export default connect(mapStateToProps)(PCAinline);
