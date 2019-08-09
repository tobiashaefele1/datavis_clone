import React, {Component} from 'react';
import 'd3';
import * as d3 from 'd3';
import {connect} from 'react-redux';
import {Spinner} from 'reactstrap';


/**
 *
 *
 * @class Map
 * @extends {Component}
 */
class Map extends Component {
  constructor(props) {
    super(props),
    this.state = {
			germany: [10.3736325636218, 51.053178814923065]
	}
	}



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





  	color = (x) => {
		if (x ==  null) {
			return '#e6e6e6'
		} else {



			var quantileScale = d3.scaleQuantile()
  				.domain(this.props.indicator_data[1])
				.range(this.props.current_color);
			return quantileScale(x)
			}

			// ALTERNATIVE SCALE BELOW
			// var linearScale =  d3.scaleLinear()
			// 	.domain([Math.min(...this.props.indicator_data[1]), Math.max(...this.props.indicator_data[1])])
			// 	.range(['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c']);
			// return linearScale(x)

	};

	projection() {
		return d3.geoMercator()
			.scale(2000)
			.center(this.state.germany)
			.translate([200, 240])
	}


	// handleClick(i) {
	// 	alert(`${this.props.current_map[i].properties.NAME_2}`)
	// }
	handleClick = (i) =>{
	  this.props.dispatch(changeName(i));
	}


	render() {
	  if (this.props.loading) {
	    return (<div><Spinner color="secondary"/></div>);
	  }
	  return (

	    <div id="map">

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
                                onClick={this.handleClick.bind(this, i)}
                            />
                        )
                    }
			</g>
              {/*{this.legend(this.color())}*/}
              {/*      </g>*/}
			  {/*</g>*/}

                </svg>
            </div>
        )
    }
}

function changeName(value) {
  return {
    type: 'CHANGE_NAME',
    value,
  };
}
function mapStateToProps(state) {
  return {
    current_map: state.current_map,
    loading: state.loading,
    indicator_data: state.indicator_data,
	  view_multiple: state.view_multiple,
	  	single_indic_data: state.single_indic_data
	  current_color: state.current_color,
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
// //         this.props.dispatch(changeName(i))
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
//         this.props.dispatch(changeName(i))
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
//
