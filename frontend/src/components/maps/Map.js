import React, {Component} from "react"
import ReactDOM from "react-dom";
import 'd3';
import * as d3 from "d3";
import {feature} from "../../../static/bmf/js/topojson";
import MapSelector from "./MapSelector"
import * as ep from "easy-peasy";



class Map extends Component {
    constructor(props) {
        super(props),
        this.state = {
            
            germany: [10.3736325636218, 51.053178814923065]
        }

    }
	projection() {
		return d3.geoMercator()
			.scale(2000)
			.center(this.state.germany)
			.translate([200, 240])
	}

	// handleClick(i) {
	// 	alert(`${this.props.current_map[i].properties.NAME_2}`)
	// }



    render() {
        return (

            <div>

                <svg width="100%" height="100%" viewBox="0 0 400 450">

                    <g className="countries">
                        {console.log(this.props.current_map)}{
                        this.props.current_map.map((d, i) =>

                            <path

                                key={`path-${i}`}
                                d={d3.geoPath().projection(this.projection())(d)}
                                className={d.properties.NAME_2}
                                fill={`rgba(256,0,0,${(1 / this.props.current_map.length) * i})`}
                                stroke="#000000"
                                strokeWidth={0.5}
                                onClick={this.props.handleMapClick.bind(this, i)}
                            />
                        )
                    }
                    </g>
                </svg>
            </div>
        )
    }
}


export default Map;
