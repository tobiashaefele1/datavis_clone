import React, {Component} from "react"
import ReactDOM from "react-dom";
import 'd3';
import * as d3 from "d3";
import {feature} from "../../../static/bmf/js/topojson";


class Map extends Component {
    constructor() {
        super()
        this.state = {
            current_map: 4,
            kreise: [],
            amr12: [],
            amr15: [],
            amr20: [],
            bund: [],
            maps: [
                "static/bmf/resources/Kreise_402_all_features_topo.json",
                "static/bmf/resources/AMR_12_all_features_topo.json",
                "static/bmf/resources/AMR_15_all_features_topo.json",
                "static/bmf/resources/AMR_20_all_features_topo.json",
                "static/bmf/resources/Bundesland_all_features_topo.json"

            ],
            germany: [10.3736325636218, 51.053178814923065],
            width: [600],
            height: [400],
        }

    }

    projection() {
        return d3.geoMercator()
            .scale(2000)
            .center(this.state.germany)
            .translate([200, 240])

    }

    handleClick(i) {
        console.log(this.state.kreise[i]);
        alert(`${this.get_current_map()[i].properties.NAME_2}`)
    }

    componentDidMount() {
        fetch(this.state.maps[this.state.current_map])
            .then(response => {
                if (response.status !== 200) {
                    console.log(this.state.maps[this.state.current_map])
                    console.log('There was a problem: ${response.status}')
                    return
                }
                response.json().then(mapdata => {
                    switch (this.state.current_map) {
                        case(0):
                            this.setState({
                                kreise: feature(mapdata, mapdata.objects.Kreise_402_all_features).features,
                            })
                            break;
                        case(1):
                            this.setState({
                                amr12: feature(mapdata, mapdata.objects.Kreise_402_all_features).features,
                            })
                            break;
                        case(2):
                            this.setState({
                                amr15: feature(mapdata, mapdata.objects.Kreise_402_all_features).features,
                            })
                            break;
                        case(3):
                            this.setState({
                                amr20: feature(mapdata, mapdata.objects.Kreise_402_all_features).features,
                            })
                            break;
                        case(4):
                            this.setState({
                                bund: feature(mapdata, mapdata.objects.Kreise_402_all_features).features,
                            })
                            break;
                    }

                })
            })
    }

    get_current_map() {
        switch (this.state.current_map) {
            case(0):
                return this.state.kreise;
            case(1):
                return this.state.amr12;
            case(2):
                return this.state.amr15;
            case(3):
                return this.state.amr20;
            case(4):
                return this.state.bund;
        }

    }

    handleMap() {
        this.setState({
            current_map: 0
        }, () =>{
            this.componentDidMount()
        })




    }


    render() {
        return (

            <div>
                <button onClick={() => this.handleMap()}> change map</button>
                <svg width="100%" height="100%" viewBox="0 0 400 450">

                    <g className="countries">
                        {console.log(this.state.kreise)}{
                        this.get_current_map().map((d, i) =>

                            <path

                                key={`path-${i}`}
                                d={d3.geoPath().projection(this.projection())(d)}
                                className={d.properties.NAME_2}
                                fill={`rgba(38,50,56,${(10 / this.get_current_map().length) * i})`}
                                stroke="#000000"
                                strokeWidth={0.5}
                                onClick={() => this.handleClick(i)}
                            />
                        )
                    }
                    </g>
                </svg>
            </div>
        )
    }
}

ReactDOM.render(<Map/>, document.getElementById('map'));
