import React,{Component} from 'react';
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

       shouldComponentUpdate(nextProps, nextState) {
        console.log("test")
    if(this.props.current_map === nextProps.current_map && this.props.indicator_data === nextProps.indicator){
        return false
    }

    else {
      return true;
    }
  }



  /**
   *This function returns the logo and copyright statements for the map.
   *
   * @return {JSX}
   * @memberof Map
   */
  renderLogo = () => {
    return (
      <div>
        <div id = "map_logo">
          <object type="image/svg+xml"
            data="static/bmf/resources/BMF_2017_WebSVG_de.svg" width="100%"
            height="100%">Your browser does not support SVG
          </object>
        </div>
        <div className ="map_copyright"> &#9400; Karte von gadm.com  <br/>
              &#9400; Bundesministerium der Finanzen
        </div>
      </div>
    );
  };


  /**
   *This function returns the legend for the map.
   *
   * @return {JSX}
   * @memberof Map
   */
  renderLegend = () => {
    if (!this.props.loading) {
      if (this.props.currentScale != 2) {
        return (
          <div className = "map_legend">
            <svg id="legend" width="90" height="90">
              <rect y="5" width="15" height="15" fill=
                {this.legendColours(0)} />
              <text fontSize="10" x="20" y="18" className="body" >
                {this.legendLabels(0)[0]} bis {this.legendLabels(0)[1]}
              </text>

              <rect y="22" width="15" height="15" fill=
                {this.legendColours(1)} />
              <text fontSize="10" x="20" y="35" className="body" >
                {this.legendLabels(1)[0]} bis {this.legendLabels(1)[1]}
              </text>

              <rect y="39" width="15" height="15" fill=
                {this.legendColours(2)} />
              <text fontSize="10" x="20" y="52" className="body" >{
                this.legendLabels(2)[0]} bis {this.legendLabels(2)[1]}
              </text>

              <rect y="56" width="15" height="15" fill=
                {this.legendColours(3)} />
              <text fontSize="10" x="20" y="69" className="body" >
                {this.legendLabels(3)[0]} bis {this.legendLabels(3)[1]}
              </text>

              <rect y="73" width="15" height="15" fill=
                {this.legendColours(4)} />
              <text fontSize="10" x="20" y="86" className="body" >
                {this.legendLabels(4)[0]} bis {this.legendLabels(4)[1]}
              </text>
            </svg>
          </div>
        );
      } else {
        return (
          <div className = "map_legend">
            <div id = "map_legend_headline"></div>
            <div id = "legend_div_fliessend">
              <svg id = "legend" height="75" width="45">
                <text fontSize="12" x="20" y="10" >
                  {Math.round(Math.max(...this.props.view_multiple ?
                     this.props.indicator_data[1]
                     : this.props.single_indic_data[1]))}
                </text>
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%"
                      stopColor={this.props.current_color[0]} stopOpacity="1" />
                    <stop offset="100%"
                      stopColor={this.props.current_color[4]} stopOpacity="1" />
                  </linearGradient>
                </defs>
                <text fontSize="12" x="20" y="75" >
                  {Math.round(Math.min(...this.props.view_multiple ?
                     this.props.indicator_data[1]
                     : this.props.single_indic_data[1]))} </text>
                <rect id = "legend_bar_fliessend"
                  width="15" height="75" fill="url(#grad1)" />
              </svg>
            </div>
          </div>);
      }
    } else {
      return ('');
    }
  }

  /**
   *This function creates an Interpolar scale.
   *
   * @return {d3.interpolarScale}
   * @memberof Map
   */
  scaleInterpolar = () => {
    const DomMin = Math.min(...this.props.view_multiple
        ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
    const DomMax = Math.max(...this.props.view_multiple
        ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
    const interpolarScale = d3.scaleSequential(
        d3.interpolateRgb('gainsboro', 'navy'))
        .domain([DomMin, DomMax]);
    return interpolarScale;
  }

  /**
   *This function creates the values for the Interpolar scale.
   *
   * @param {number} x is the number that is used for the scale
   * @return {d3.interpolarScale}
   * @memberof Map
   */
  valueInterpolar = (x) => {
    const DomMin = Math.min(...this.props.view_multiple
        ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
    const DomMax = Math.max(...this.props.view_multiple
        ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
    // creates an interpolar scale with the minimum
    // and maximum colours selected from the current color range
    const interpolarScale = d3.scaleSequential(
        d3.interpolateRgb(this.props.current_color[0],
            this.props.current_color[4]))
        .domain([DomMin, DomMax]);
    return interpolarScale(x);
  }

  /**
   *This function creates the Quantile scale.
   *
   * @return {d3.scaleQuantile}
   * @memberof Map
   */
  scaleQuantile = () => {
    const quantileScale = d3.scaleQuantile()
        .domain((this.props.view_multiple
            ? this.props.indicator_data[1] : this.props.single_indic_data[1]))
        .range(this.props.current_color);
    return quantileScale;
  }

  /**
   *This function creates the values for the Quantile scale.
   *
   * @param {number} x is the number that is used for the scale
   * @return {d3.quantileScale}
   * @memberof Map
   */
  valueQuantile = (x) => {
    const quantileScale = d3.scaleQuantile()
        .domain((this.props.view_multiple
            ? this.props.indicator_data[1] : this.props.single_indic_data[1]))
        .range(this.props.current_color);
    return quantileScale(x);
  }

   /**
    *This function creates the Quantize scale.
    *
    * @return {d3.QuantizeScale}
    * @memberof Map
    */
   scaleQuantize = () => {
     const DomMin = Math.min(...this.props.view_multiple
        ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
     const DomMax = Math.max(...this.props.view_multiple
        ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
     const quantizeScale = d3.scaleQuantize()
         .domain([DomMin, DomMax])
         .range(this.props.current_color);
     return quantizeScale;
   }

  /**
   *This function creates the values for the Quantize scale.
   *
   * @param {number} x is the number that is used for the scale
   * @return {d3.scaleQuantize}
   * @memberof Map
   */
  valueQuantize = (x) => {
    const DomMin = Math.min(...this.props.view_multiple
        ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
    const DomMax = Math.max(...this.props.view_multiple
        ? this.props.indicator_data[1] : this.props.single_indic_data[1]);
    const quantizeScale = d3.scaleQuantize()
        .domain([DomMin, DomMax])
        .range(this.props.current_color);
    return quantizeScale(x);
  }

/**
 *This funtion create gets the colors used in the legend.
    *
    * @param {number} x which array of colors needs to be returned
    * @return {Array} of the colors used for the legend
    * @memberof Map
    */
legendColours = (x) => {
  return this.props.current_color[x];
}

  /**
   *This is the function that creates the labels for the legend.
   *
   * @param {number} x the current number related to the selected color.
   * @return {Array} the numbers for the legend.
   * @memberof Map
   */
  legendLabels = (x) => {
    if (typeof this.props.current_map[0].properties.indicator === 'undefined'
    || this.props.indicator_data[1] === undefined) {
      return ['n/a', 'n/a'];
    } else {
      if (this.props.currentScale == 0) {
        const output = this.scaleQuantile()
            .invertExtent(this.props.current_color[x]);
        output[0] = Math.round(output[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        output[1] = Math.round(output[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return output;
      } else if (this.props.currentScale ==1) {
        const output = this.scaleQuantize()
            .invertExtent(this.props.current_color[x]);
        output[0] = Math.round(output[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        output[1] = Math.round(output[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return output;
      } else {
        return ['n/a', 'n/a'];
      }
    }
  }
        nestedSort = (prop1, prop2 = null, direction = 'asc') => (e1, e2) => {
        const a = prop2 ? e1[prop1][prop2] : e1[prop1],
            b = prop2 ? e2[prop1][prop2] : e2[prop1],
            sortOrder = direction === "asc" ? 1 : -1
        return (a < b) ? -sortOrder : (a > b) ? sortOrder : 0;
    }




  /**
   *This function creates the values for the colors on the map.
   *
   * @param {number} x is the current selected color for the map.
   * @return {*} the value for the color of the scale currently selected.
   * @memberof Map
   */
  color = (x) => {
    if (x == null || x === undefined
        || this.props.indicator_data[1] === undefined) {
      return '#6C7B8B';
    } else {
      // #TODO: in here I should: check whether the vlaue is within 25.85% of population (top score), and then
      // either fill with a color of my choice (make it orange for now; or go back to the normal

      // if(this.props.money == false){

      if (this.props.currentScale == 0) {
        return this.valueQuantile(x);
      } else if (this.props.currentScale == 1) {
        return this.valueQuantize(x);
      } else {
        return this.valueInterpolar(x);
      }

      // }
      // else{
      //
      //
      //   // #todo rank the array by size
      //   // var my_list = this.props.current_map.sort(function(a,b){
      //   //   return a.properties.indicator - b.properties.indicator
      //   // })
      //   var my_list = this.props.current_map
      //
      //   my_list.sort(this.nestedSort("properties", "indicator"))
      //
      //   var total_share = 0.2585;
      //   var total_population = 0;
      //   var clean_list = []
      //   my_list.forEach(function(d,i){
      //     total_population += d.properties.Einwohner_2017
      //     if(d.properties.Bundesland != null)
      //     {clean_list.push(d)}
      //   })
      //
      //   clean_list.sort(this.nestedSort("properties", "indicator"))
      //   console.log(clean_list)
      //
      //   var current_share = 0;
      //   var return_colour = 0;
      //   clean_list.forEach(function(d,i){
      //     current_share += d.properties.Einwohner_2017
      //     if (x == d.properties.indicator && ((current_share/total_population) < total_share))
      //     {
      //       return_colour =  "#000"}})
      //
      //   if (return_colour == 0) {
      //     if (this.props.currentScale == 0) {
      //       return this.valueQuantile(x);
      //     } else if (this.props.currentScale == 1) {
      //       return this.valueQuantize(x);
      //     } else {
      //       return this.valueInterpolar(x);
      //     }
      //   }
      // else {return return_colour}
      //
      //   }
      }
    };

    strokeFunc = (x) => {

        var my_list = this.props.current_map

        my_list.sort(this.nestedSort("properties", "indicator"))


        var total_share = 0.2585;
        var total_population = 0;
        var clean_list = []
        my_list.forEach(function(d,i){
          total_population += d.properties.Einwohner_2017
          if(d.properties.Bundesland != null)
          {clean_list.push(d)}
        })


        clean_list.sort(this.nestedSort("properties", "indicator"))
        // console.log(clean_list)

        var current_share = 0;
        var return_colour = "nomoney";
        clean_list.forEach(function(d,i){
          current_share += d.properties.Einwohner_2017
          if (x == d.properties.indicator && ((current_share/total_population) < total_share))
          {
            return_colour =  "money"}})

        return return_colour
    }



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
        .translate([200, 250]);
  }

    /**
     *This function handles the click on the map.
     *
     * @param {int} i this is the number in current_map
     * @memberof Map
     */
    handleClickIn = (d,i) =>{
      // console.log(i)
      this.props.dispatch(changeNameDispatch(d));

            if (this.props.showPCA) {

            document.getElementById("circle_"+i).style.fill = "black"
            document.getElementById("circle_"+i).style.r = 15;

    }}


   handleClickOut = (i) =>{
              if (this.props.showPCA) {

      document.getElementById("circle_"+i).style.fill = ""
      document.getElementById("circle_"+i).style.r = ""

    }}
    /**
     *This function creates the loading crikle when needed.
     *
     * @return {JSX} returns nothing or the loading cirkle.
     * @memberof Map
     */
    loadingCirkle = () =>{
      if (this.props.loading) {
        return (
          <div className="lds-roller" id="map_loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      } else {
        return '';
      }
    }

    mouseover = (d) => {

            document.getElementById("circle_"+d).style.fill = "black"
        }

    mouseout = (d) => {

            document.getElementById("circle_"+d).style.fill = ""
        }






    /**
     *This renders the map.
     *
     * @return {JSX}
     * @memberof Map
     */
    render() {
        console.log("map-re-render")


      if (this.props.showPCA) {
      var width = '55%'
      }
      else{var width = '75%'}

      if (this.props.firstload) {
        return (<div className="lds-roller1">
          <div></div><div></div>
          <div></div><div></div>
          <div></div><div></div>
          <div></div><div></div>
        </div>);
      }
      return (
        <div className="is-centered has-text-centered" id="map">
          <div id = "map_content">
            {this.renderLegend()}
            {this.loadingCirkle()}
            <svg id="svg" width={width} height="100%" viewBox="0 0 400 460">
              <g className="map">


                {this.props.current_map.map((d, i) =>
                  <path
                    key={`path-${i}`}
                    id={d.properties.Kennziffer}
                    d={d3.geoPath().projection(this.projection())(d)}
                    className={d.properties.Kennziffer}
                    fill= {this.color(d.properties.indicator)}
                    text="HELLO TEST"
                    className={this.props.money ? this.strokeFunc(d.properties.indicator) : "nomoney"}
                    onMouseOver={this.handleClickIn.bind(this, i, d.properties.Kennziffer)}
                    onMouseOut ={this.handleClickOut.bind(this, d.properties.Kennziffer)}
                    onClick={this.handleClickIn.bind(this, i)
                    }
                  />
                )}
              </g>
            </svg>
            <div id="map_reset">
              <ResetButton/>
            </div>
            <div>
              {this.renderLogo()}
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
    showPCA: state.showPCA,
    money: state.money
  };
}

export default connect(mapStateToProps)(Map);
