import React, {Component} from 'react';

import Map from "./maps/Map";
import MapSelector from './maps/MapSelector';
import {feature} from "topojson";
import SmallTable from './tables/SmallTable';
import Indikators from './indikators/Indikators';
import {connect} from 'react-redux';
import PlusButton from './buttons/PlusButton';
import MinButton from './buttons/MinButton';
import SettingButton from './buttons/SettingButton';
import Settings from './modals/Settings';
import Table from './tables/Table';
import ViewPicker from './modals/ViewPicker';


class App extends Component {
    constructor(props) {
        super(props)
    }

    setMapinStore(value, map) {
        return {
            type: "SETMAPINSTORE",
            value,
            map
        };
    }

    componentWillMount() {
        fetch("static/bmf/resources/Kreise15map.json")
            .then(response => {
        
                if (response.status !== 200) {
                    console.log('There was a problem: ${response.status}')
                    return
                }
                response.json().then(mapdata => {
				
                    this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.Kreise15map).features, 0))
                    this.props.dispatch({type: 'LOADINGDONE'})
                })

            })


    }


    componentDidMount() {

        fetch("static/bmf/resources/AMR12map.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log('There was a problem: ${response.status}')
                    return
                }
                response.json().then(mapdata => {

                    this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.AMR12map).features, 1))
                })

            })


        fetch("static/bmf/resources/AMR15map.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log('There was a problem: ${response.status}')
                    return
                }
                response.json().then(mapdata => {

                    this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.AMR15map).features, 2))
                })

            })

        fetch("static/bmf/resources/AMR20map.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log('There was a problem: ${response.status}')
                    return
                }
                response.json().then(mapdata => {

                    this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.AMR20map).features, 3))
                })

            })

        fetch("static/bmf/resources/bundeslandmap.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log('There was a problem: ${response.status}')
                    return
                }
                response.json().then(mapdata => {
                    this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.bundeslandmap).features, 4))
                })

            })


	}
	
	mobile(value){
		if(value < 1000){
		this.props.dispatch({
			type: 'DECREMENTINDIKATOR'
		})
		this.props.dispatch({
			type: 'DECREMENTINDIKATOR'
		})
	}
	}

    render() {
        return (

            <div>
			{ this.mobile(window.screen.width) }
				<ViewPicker/>
                <div className="example-grid-logo">
                    {/* Top Row */}
                    <div className="row">
                        <div className="three columns">
                            <object type="image/svg+xml" data="static/bmf/resources/BMF.svg" width="100%"
                                    height="100%">Your browser does not support SVG
                            </object>
                        </div>
                        <div className="six columns">
                            <h3>BMF - GRW - Datenvisualisierung</h3>
                        </div>
                        <div className="three columns">
                            <SettingButton/>
                            <Settings/>
                        </div>

                    </div>
                </div>
                <div className="example-grid-body">
                    {/* main content */}
                    <div className="row">
                        <div className="box">
                            <div className="three columns" id="big">

                                <MapSelector/>


                                <SmallTable/>

                            </div>
                            <div className="six columns" id="big">


                                <Map/>


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
                                        <tr>
                                            <td id="min_value">Value 1</td>
                                            <td id="max_value">Value 2</td>
                                            <td id="avg_value">Value 3</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>


                            </div>
                            <div className="three columns" id="big">

                                Indikatoren
                                <Indikators/>

                                <PlusButton/>
                                <MinButton/>


                                <div className="row"> Export / Upload</div>

                                <div className="row">

                                    <button id="csv_upload">Import CSV</button>
									
								

                                </div>


                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="twelve columns" id="big">
                            <Table/>
                        </div>
                    </div>
                </div>
            </div>


        )
    }


}

export default connect()(App)