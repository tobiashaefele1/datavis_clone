import React, {Component} from 'react';
import 'd3';
import * as d3 from 'd3';
import {connect} from 'react-redux';

import ResetButton from '../buttons/ResetButton';


/**
 *Component that creates the map.
 *
 * @class Map
 * @extends {Component}
 */
class Map extends Component {
  /**
   *Creates an instance of Map.
   * @param {*} props
   * @memberof Map
   */
  constructor(props) {
    super(props),
    this.state = {
      germany: [10.3736325636218, 51.053178814923065],
    };
  }





  headline = () => {
      return (this.props.view_multiple ? "Zusammengesetzter Indikator" : `${this.props.metadata[this.props.value_dic['var_name_0']].csvname}, ${this.props.value_dic['var_year_0']} ` )
  }

  renderlogo = () => {
      return(

          <div id = "map_logo">
          <object type="image/svg+xml"
                data="static/bmf/resources/BMF_2017_WebSVG_de.svg" width="100%"
                height="100%">Your browser does not support SVG
              </object>

    
              <div className ="map_copyright"> &#9400;Bundesministerium der Finanzen</div>
			<div className ="map_copyright">&#9400;gadm.com</div>
               </div>
      )

  };

  



  renderlegend = () => {
	  if(!this.props.loading){
		if(this.props.currentScale != 2) {
			return (

				<div className = "map_legend">
				
				


					<svg id="legend" width="90" height="90">
						
					<rect width="15" height="15" fill={this.legend_colours(0)} />
					<text font-size="12" x="20" y="15" className="body" >	{this.legend_labels(0)[0]} - {this.legend_labels(0)[1]}</text>

					<rect y="17" width="15" height="15" fill={this.legend_colours(1)} />
					<text font-size="12" x="20" y="32" className="body" >	{this.legend_labels(1)[0]} - {this.legend_labels(1)[1]}</text>

					<rect y="34" width="15" height="15" fill={this.legend_colours(2)} />
					<text font-size="12" x="20" y="49" className="body" >	{this.legend_labels(2)[0]} - {this.legend_labels(2)[1]}</text>

					<rect y="51" width="15" height="15" fill={this.legend_colours(3)} />
					<text font-size="12" x="20" y="66" className="body" >	{this.legend_labels(3)[0]} - {this.legend_labels(3)[1]}</text>

					<rect y="68" width="15" height="15" fill={this.legend_colours(4)} />
					<text font-size="12" x="20" y="83" className="body" >	{this.legend_labels(4)[0]} - {this.legend_labels(4)[1]}</text>
					</svg>

					</div>

				




					
			); }

		else{
			/// INSERT THIS STUFF IN HERE
			return (
				<div className = "map_legend">
					<div id = "map_legend_headline"></div>


					<div  id = "legend_div_fliessend">

						<svg id = "legend"  height="75" width="45">
							<text font-size="12" x="20" y="10" > {Math.round(Math.max(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]))} </text>
							<defs>
								<linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
									<stop offset="0%" stopColor={this.props.current_color[0]} stopOpacity="1" />
									<stop offset="100%" stopColor={this.props.current_color[4]} stopOpacity="1" />
								</linearGradient>
							</defs>
							<text font-size="12" x="20" y="75" > {Math.round(Math.min(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]))} </text>
						<rect id = "legend_bar_fliessend" width="15" height="75" fill="url(#grad1)" />
							</svg>
						
					



					</div>



		</div>)
	  }
	  
      }else{
		  return (" ")
	  }

  }


    legendInterpolar = () => {





    }






  ///////////////// SCALES TO CREATE AS OPTIONS /////////////////////////////
  // formulae to create scale and individual values for sequential scale
  scaleInterpolar = () => {
      let DomMin = Math.min(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
      let DomMax = Math.max(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
      const interpolarScale = d3.scaleSequential(d3.interpolateRgb("gainsboro", "navy"))
            .domain([DomMin, DomMax])
            // .interpolator(d3.interpolateCool);
      return interpolarScale
  }

  valueInterpolar = (x) => {
      let DomMin = Math.min(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
      let DomMax = Math.max(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
      // creates an interpolar scale with the minimum and maximum colours selected from the current color range
      const interpolarScale = d3.scaleSequential(d3.interpolateRgb(this.props.current_color[0], this.props.current_color[4]))
            .domain([DomMin, DomMax])
            // .interpolator(d3.interpolateCool);
      return interpolarScale(x)
  }


  // formulae to create scale and individual values for quantile scale
  scaleQuantile = () => {
      const quantileScale = d3.scaleQuantile()
            .domain((this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]))
            .range(this.props.current_color);
  return quantileScale
  }

  valueQuantile = (x) => {
  const quantileScale = d3.scaleQuantile()
            .domain((this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]))
            .range(this.props.current_color);
  return quantileScale(x)
  }


    // formulae to generate scale and values for threshold scale via Quantize method
   scaleQuantize = () => {
            // the three dots convert the array into a list so they can be used as input for Math.min and Math.max
      let DomMin = Math.min(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
      let DomMax = Math.max(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
      // let DomStep = (DomMax - DomMin) / (this.props.current_color.length);
      // console.log(DomStep)
      const QuantizeScale = d3.scaleQuantize()
            .domain([DomMin, DomMax])
            .range(this.props.current_color);
  return QuantizeScale
  }
    // formula to generate values for threshold scale via Quantize method
  valueQuantize = (x) => {
      // the three dots convert the array into a list so they can be used as input for Math.min and Math.max
      // console.log(x)
      // console.log(this.props.indicator_data[1])
      let DomMin = Math.min(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
      let DomMax = Math.max(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
      // let DomStep = (DomMax - DomMin) / (this.props.current_color.length);
      // console.log(DomMin)
      // console.log(DomMax)

      const QuantizeScale = d3.scaleQuantize()
            .domain([DomMin, DomMax])
            .range(this.props.current_color);
  return QuantizeScale(x)
  }



  ///////////////// SCALES TO CREATE AS OPTIONS /////////////////////////////

    // formula to create the legend colours
    //TODO: make this dynamic to scale options (currently this always shows normal scale)
    legend_colours = (x) => {
    return this.props.current_color[x];
  }

  // formulae to create the legend labels
  legend_labels = (x) => {
      // console.log(typeof this.props.current_map[0].properties.indicator)
        if (typeof this.props.current_map[0].properties.indicator === 'undefined' || this.props.indicator_data[1] === undefined) {
        return ['n/a', 'n/a']}
      else {
          if (this.props.currentScale == 0) {

              var output = this.scaleQuantile().invertExtent(this.props.current_color[x]);
                output[0] = Math.round(output[0]);
                output[1] = Math.round (output[1]);
                return output}

          else if(this.props.currentScale ==1) {
              var output = this.scaleQuantize().invertExtent(this.props.current_color[x]);
                output[0] = Math.round(output[0]);
                output[1] = Math.round (output[1]);
                return output}
          else {
              //TODO: ADD IN HERE WHATEVER THE LEGEND LABELS SHOULD BE IN CASE OF INTERPOLAR SCALE; PROBABLY JUST MIN MAX?
              return ['n/a', 'n/a']
          }

          }
          }


  // formula to create the values for the color on the map
  color = (x) => {
      // console.log(x)
      if (x == null || x === undefined || this.props.indicator_data[1] === undefined) {
        return '#6C7B8B';
      } else {
          if(this.props.currentScale == 0)
                {
          // console.log(this.props.indicator_data[1]);
        // console.log(dom_input);
              return this.valueQuantile(x);
                }

           else if(this.props.currentScale == 1)
          { return this.valueQuantize(x)}

           else{
             return this.valueInterpolar(x)   }
      }

      // ALTERNATIVE SCALE BELOW
      // var linearScale =  d3.scaleLinear()
      // 	.domain([Math.min(...this.props.indicator_data[1]), Math.max(...this.props.indicator_data[1])])
      // 	.range(['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c']);
      // return linearScale(x)
    };

    /**
       *This function creates the projection of the map.
       *
       * @return {d3.geoMercator}
       * @memberof Map
       */
    projection() {
      return d3.geoMercator()
          .scale(2000)
          .center(this.state.germany)
          .translate([200, 240]);
    }


    // handleClick(i) {
    // 	alert(`${this.props.current_map[i].properties.NAME_2}`)
    // }

    /**
     *This function handles the click on the map.
     *
     * @param {int} i this is the number in current_map
     * @memberof Map
     */
    handleClick = (i) =>{
      this.props.dispatch(changeNameDispatch(i));
	}
	
	loadingCirkle = () =>{
		if(this.props.loading){
			return(
			<div className="lds-roller" id="map_loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
		
			)}
			else{
				return ''
			}
	}


    /**
     *This renders the map.
     *
     * @return {JSX}
     * @memberof Map
     */
    render() {
      if (this.props.firstload) {
        return (<div className="lds-roller1"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>);
	  }
      return (
		
        <div id="map">

          <h6>{this.headline()}</h6>

            <div id = "map_content">
				{this.renderlegend()}
			{this.loadingCirkle()}
            <svg id="svg" width="100%" height="100%" viewBox="0 0 400 450">

                <g className="map">
              {
                this.props.current_map.map((d, i) =>

                  <path
                    key={`path-${i}`}
                    d={d3.geoPath().projection(this.projection())(d)}
                    className={d.properties.Kennziffer}
                    fill= {this.color(d.properties.indicator)}
                    stroke="#000000"
                    strokeWidth={0.5}
                    onMouseOver={this.handleClick.bind(this, i)}
                  />
                )
              }
            </g>


              </svg>
			  <div id="map_reset">
			  <ResetButton/>
			  </div>
			  <div>
                {this.renderlogo()}

            </div>
			  </div>
            





        </div>
	
      );
    }
}

/**
 *This function creates a dispatch ready input from the indicators.
 *
 * @param {int} value of the index in the current_map
 * @return {Dict} that is send to the dispatch
 */
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
    current_map: state.current_map,
    loading: state.loading,
    indicator_data: state.indicator_data,
    view_multiple: state.view_multiple,
    single_indic_data: state.single_indic_data,
    current_color: state.current_color,
	  currentScale: state.currentScale,
	  firstload: state.firstload,
      value_dic: state.value_dic,
      metadata: state.metadata,
  };
}

export default connect(mapStateToProps)(Map);

//
// // // MY MAP PLAY AROUND #1
// //
// //
// //
// //
// //
// // class Map extends Component {
// //     constructor(props) {
// //         super(props),
// //             this.state = {
// //
// //                 germany: [10.3736325636218, 51.053178814923065]
// //             }
// //
// //     }
// //
// //     // define default projection
// //     projection() {
// //         return d3.geoMercator()
// //             .scale(2000)
// //             .center(this.state.germany)
// //             .translate([200, 240])
// //     }
// //
// //
// //     //Define default path generator
// //     path() {
// //         return d3.geoPath()
// //             .projection(projection());
// //     }
// //
// //
// //     svg() {
// //         return d3.select("body")
// //             .append("svg")
// //             .attr("id", "chart")
// //             // .attr("width", w)
// //             // .attr("height", h)
// //             .append("g")
// //         // .attr("tranform", "translate(0" + margin.left + "," + margin.top + ")");
// //     }
// //
// //
// //     color() {
// //     	return d3.scaleQuantile()
// // 			.range(["rgb(237, 248, 233)", "rgb(186, 228, 179)", "rgb(116,196,118)", "rgb(49,163,84)",
// // 				"rgb(0,109,44)"]);
// // 	}
// //
// //
// //     // handleClick(i) {
// //     // 	alert(`${this.props.current_map[i].properties.NAME_2}`)
// //     // }
// //     handleClick = (i) => {
// //
// //         this.props.dispatch(changeNameDispatch(i))
// //     }
// //
// //
// //     render() {
// //         if (this.props.loading) {
// //             return 'Loading...'
// //         }
// //         return (
// //
// //             <div>
// //
// //                 <svg width="100%" height="100%" viewBox="0 0 400 450">
// //
// // 					// this is other stuff
// //                     d3.csv("us-cities-agriculture.csv", function(data){
// //
// //                     color.domain([d3.min(data, function (d) {
// //                         return d.value;
// //                     }),
// //                         d3.max(data, function (d) {
// //                             return d.value;
// //                         })
// //                     ]);
// //
// //                     d3.json("us-states.json", function(json){
// //
// //                     //Merge the agriculture and GeoJSON data
// //                     //Loop through once for each agriculture data value
// //                     for(var i = 0; i < data.length; i++){
// //                     // grab state name
// //                     var dataState = data[i].state;
// //
// //                     //grab data value, and convert from string to float
// //                     var dataValue = parseFloat(data[i].value);
// //
// //                     //find the corresponding state inside the GeoJSON
// //                     for(var n = 0; n < json.features.length; n++){
// //
// //                     // properties name gets the states name
// //                     var jsonState = json.features[n].properties.name;
// //                     // if statment to merge by name of state
// //                     if(dataState == jsonState){
// //                     //Copy the data value into the JSON
// //                     // basically creating a new value column in JSON data
// //                     json.features[n].properties.value = dataValue;
// //
// //                     //stop looking through the JSON
// //                     break;
// //                 }
// //                 }
// //                 }
// //
// //                     svg.selectAll("path")
// //                     .data(json.features)
// //                     .enter()
// //                     .append("path")
// //                     .attr("d", path)
// //                     .style("fill", function(d){
// //                     //get the data value
// //                     var value = d.properties.value;
// //
// //                     if(value){
// //                     //If value exists
// //                     return color(value);
// //                 } else {
// //                     // If value is undefined
// //                     //we do this because alaska and hawaii are not in dataset we are using but still in projections
// //                     return "#ccc"
// //                 }
// //
// //                 });
// //
// //
// //                 });
// //
// //                 })
// //
// //
// //                     <g className="Deutschland">
// //                         {
// //                             this.props.current_map.map((d, i) =>
// //
// //                                 <path
// //                                     key={`path-${i}`}
// //                                     d={d3.geoPath().projection(this.projection())(d)}
// //                                     className={d.properties.Kennziffer}
// //                                     fill={`rgba(256,0,0,${(1 / d.properties.indicator)})`}
// //
// //                                     stroke="#000000"
// //                                     strokeWidth={0.5}
// //                                     onClick={this.handleClick.bind(this, i)}
// //                                 />
// //                             )
// //                         }
// //                     </g>
// //                 </svg>
// //             </div>
// //         )
// //     }
// // }
// //
// //
// // /// functions at bottom from original file
// //
// //
// // function changeName(value) {
// //     return {
// //         type: "CHANGE_NAME",
// //         value
// //     };
// // }
// //
// // function mapStateToProps(state) {
// //     return {
// //         current_map: state.current_map,
// //         loading: state.loading
// //     };
// // }
// //
// //
// // export default connect(mapStateToProps)(Map);
// //
// //
//
// /////////////// MY MAP PLAY AROUND 2
//
//
// class Map extends Component {
//     constructor(props) {
//         super(props),
//             this.state = {
//
//                 germany: [10.3736325636218, 51.053178814923065]
//             }
//
//     }
//
//     projection() {
//         return d3.geoMercator()
//             .scale(2000)
//             .center(this.state.germany)
//             .translate([200, 240])
//     }
//
//     // handleClick(i) {
//     // 	alert(`${this.props.current_map[i].properties.NAME_2}`)
//     // }
//     handleClick = (i) => {
//
//         this.props.dispatch(changeNameDispatch(i))
//     }
//
// 	// ALL THE D3 THIS IS SO SMART
//      //Width and height
// 	var w = 300;
//     var h = 500;
//
//     var margin = {
//           top: 60,
//           bottom: 40,
//           left: 70,
//           right: 40
//         };
//
//       var width = w - margin.left - margin.right;
//       var height = h - margin.top - margin.bottom;
//
//
//       // define map projection
//       var projection = projection();
//
//       //Define default path generator
//       var path = d3.geoPath()
//         	.projection(projection);
//
//       var svg = d3.select("body")
//         .append("svg")
//         .attr("id", "chart")
//         .attr("width", w)
//         .attr("height", h)
//         .append("g")
//         .attr("tranform", "translate(0" + margin.left + "," + margin.top + ")");
//
//         var color = d3.scaleQuantile()
//           .range(["rgb(237, 248, 233)", "rgb(186, 228, 179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);
//
//       //d3.csv("us-cities-agriculture.csv", function(data){
//
// 	   var data = this.props.current_map.features.indicator;
//
//        var data_2 = (data) => {color.domain([ d3.min(data, function(d){ return d.value; }),
//           d3.max(data, function(d){ return d.value; })
//           ])};
//
//
//        svg.selectAll("path")
//           .data(this.prop.current_map.features)
//           .enter()
//           .append("path")
//           .attr("d", path)
//           .style("fill", function(d){
//             //get the data value
//             var value = d.properties.value;
//
//             if(value){
//               //If value exists
//               return color(value);
//             } else {
//               // If value is undefined
//               //we do this because alaska and hawaii are not in dataset we are using but still in projections
//               return "#ccc"
//             }
//
//           });
//
//
//       );
//
// )
//
// /// THE OLD RENDER PART
//     render() {
//         if (this.props.loading) {
//             return 'Loading...'
//         }
//         return (
//
//             <div>
//
//                 <svg width="100%" height="100%" viewBox="0 0 400 450">
//
//                     <g className="Deutschland">
//                         {
//                             this.props.current_map.map((d, i) =>
//
//                                 <path
//                                     key={`path-${i}`}
//                                     d={d3.geoPath().projection(this.projection())(d)}
//                                     className={d.properties.Kennziffer}
//                                     fill={`rgba(256,0,0,${(1 / d.properties.indicator)})`}
//
//                                     stroke="#000000"
//                                     strokeWidth={0.5}
//                                     onClick={this.handleClick.bind(this, i)}
//                                 />
//                             )
//                         }
//                     </g>
//                 </svg>
//             </div>
//         )
//     }
// }
//
//
//
//
//
// /// functions from bottom of thing
//
// function changeName(value) {
//     return {
//         type: "CHANGE_NAME",
//         value
//     };
// }
//
// function mapStateToProps(state) {
//     return {
//         current_map: state.current_map,
//         loading: state.loading
//     };
// }
//
//
// export default connect(mapStateToProps)(Map);





  // legned = (x) => {
  // const colorLegendG = svg.append("g")
  // 	.attr('transform', 'translate(185,150)')
  // 	.
  //
  //
  //
  //
  // 	}

  // legend = (x) => {
  //   // put any functions and vars and consts in here: then RETURN their call!!
  //     var height = 50;
  //     var svg = d3.select('svg');
  //
  //     const colorlegend = (selection, props) =>
  //     {const {colorScale, circleRadius, spacing, textOffset} = props;
  //     const groups = selection.selectAll('g')
  //         .data(colorScale.domain());
  //         const groupsEnter = groups.enter().append('g');
  //         groupsEnter
  //             .merge(groups)
  //             .attr(transform, (d,i) => `translate(0,${i * spacing}`);
  //         groups.exit().remove();
  //         groupsEnter.append('circle')
  //             .merge(groups.select('circle'))
  //             .attr('r', circleRadius)
  //             .attr('fill', colorScale);
  //         groupsEnter.append('text')
  //             .merge(groups.select('text'))
  //             .text(d => d)
  //             .attry('y', textOffset)}
  //
  //
  //      var hello = svg.append('g')
  //             .attr('transform', `translate(100, ${height / 2})`)
  //             .call(colorlegend,
  //                 {
  //                     colorScale : this.color(),
  //                     circleRadius: 30,
  //                     spacing: 180,
  //                     textOffset: 120
  //                 });
  //
  //     return hello(x)


// ATTEMPT ONE FOR LEGEND
//
//    quantileScale = (x, dom_input) => {
//      d3.scaleQuantile(x)
//          .domain(dom_input)
//          .range(this.props.current_color);
//    }
//
//    domain = () => {(this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1])};
//
//     color = (x) => {
//       if (x == null) {
//         return '#b3daff';
//       } else {
//           // console.log(this.props.indicator_data[1]);
//
//         const dom_input = this.domain();
//         // console.log(dom_input);
//
//         return this.quantileScale(x, dom_input);
//       }



  // THIS THRESHOLD SCALE FORMULATION WORKS. HOWEVER, THE OTHER VERSION VIA QUANTIZE IS MORE ELEGANT; HENCE DISCARDED HERE
  // // formulae to generate scale and values for threshold scale
  //  scaleThres = () => {
  //           // the three dots convert the array into a list so they can be used as input for Math.min and Math.max
  //     let DomMin = Math.min(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
  //     let DomMax = Math.max(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
  //     let DomStep = (DomMax - DomMin) / (this.props.current_color.length);
  //     // console.log(DomStep)
  //     const ThresScale = d3.scaleThreshold()
  //           .domain([DomMin+(DomStep), DomMin+(2*DomStep), DomMin+(3*DomStep), DomMin+(4*DomStep)])
  //           .range(this.props.current_color);
  // return ThresScale
  // }
  //
  // valueThres = (x) => {
  //     // the three dots convert the array into a list so they can be used as input for Math.min and Math.max
  //     let DomMin = Math.min(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
  //     let DomMax = Math.max(...this.props.view_multiple ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
  //     let DomStep = (DomMax - DomMin) / (this.props.current_color.length);
  //
  //     const ThresScale = d3.scaleThreshold()
  //           .domain([DomMin+(DomStep), DomMin+(2*DomStep), DomMin+(3*DomStep), DomMin+(4*DomStep)])
  //           .range(this.props.current_color);
  // return ThresScale(x)
  // }




/// THIS IS THE WORKING STATIC VERSION OF THE LEGEND (without the INTERPOLAR SCALE LEGEND)
//
//                 <div id = "map_legend">
//                 <div id = "map_legend_headline">
//
//                 </div>
//
//                 <div>
//                 <svg width="20" height="10">
//                 <rect width="10" height="10" fill={this.legend_colours(0)} />
//                 </svg>
//                 {this.legend_labels(0)[0]} - {this.legend_labels(0)[1]}
//                 </div>
//
//                 <div>
//                 <svg width="20" height="10">
//                 <rect width="10" height="10" fill={this.legend_colours(1)} />
//                 </svg>
//                 {this.legend_labels(1)[0]} - {this.legend_labels(1)[1]}
//                 </div>
//
//                 <div>
//                 <svg width="20" height="10">
//                 <rect width="10" height="10" fill={this.legend_colours(2)} />
//                 </svg>
//                 {this.legend_labels(2)[0]} - {this.legend_labels(2)[1]}
//                 </div>
//
//                 <div>
//                 <svg width="20" height="10">
//                 <rect width="10" height="10" fill={this.legend_colours(3)} />
//                 </svg>
//                 {this.legend_labels(3)[0]} - {this.legend_labels(3)[1]}
//                 </div>
//
//                 <div>
//                 <svg width="20" height="10">
//                 <rect width="10" height="10" fill={this.legend_colours(4)} />
//                 </svg>
//                 {this.legend_labels(4)[0]} - {this.legend_labels(4)[1]}
//                 </div>
//
//                 </div>