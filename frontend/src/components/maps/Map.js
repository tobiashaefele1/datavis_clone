import React, {Component} from "react"
import 'd3';
import * as d3 from "d3";
import { connect } from 'react-redux'



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
	handleClick = (i) =>{

		this.props.dispatch(changeName(i))
	}


    render() {
		if (this.props.loading) {
			return 'Loading...'
		} 
        return (

            <div>

                <svg width="100%" height="100%" viewBox="0 0 400 450">

                    <g className="countries">
                        {
                        this.props.current_map.map((d, i) =>

                            <path
                                key={`path-${i}`}
                                d={d3.geoPath().projection(this.projection())(d)}
                                className={d.properties.NAME_2}
                                fill={`rgba(256,0,0,${(1 / this.props.current_map.length) * i})`}

                                stroke="#000000"
                                strokeWidth={0.5}
                                onClick={this.handleClick.bind(this, i)}
                            />
                        )
                    }
                    </g>
                </svg>
            </div>
        )
    }
}

function changeName(value){
	return {
		type: "CHANGE_NAME",
		value
	};
}
function mapStateToProps(state) {
	return {
		current_map: state.current_map,
		loading: state.loading
	};
}






export default connect(mapStateToProps)(Map);
