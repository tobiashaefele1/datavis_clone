import React, { Component } from 'react';

import Map from "./maps/Map";
import MapSelector from './maps/MapSelector';
import { feature } from "topojson";
import SmallTable from './tables/SmallTable';
import { Provider } from 'react-redux';
import Indikators from './indikators/Indikators';
import { connect } from 'react-redux';
import { store } from './Store';
import PlusButton from './buttons/PlusButton';
import MinButton from './buttons/MinButton';
import SettingButton from './buttons/SettingButton';
import Settings from './modals/Settings';
import Table from './tables/Table';





class App extends Component {
	constructor() {
		super(),
			this.state = {
				
				maps: [
					"static/bmf/resources/Kreise15map.json",
					"static/bmf/resources/AMR12map.json",
					"static/bmf/resources/AMR15map.json",
					"static/bmf/resources/AMR20map.json",
					"static/bmf/resources/bundeslandmap.json"
				],
				loading: true,
				indikator_count: ['indikator1', 'indikator2', 'indikator3']

			},
		this.smalltable = [['Name', 'placeholder'], ['ID', 'placeholder'], ['Bund', 'placeholder'], ['Value', 'placeholder'], ['Rank', 'placeholder']]

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
		
			fetch(this.state.maps[1])
				.then(response => {
					if (response.status !== 200) {
						console.log('There was a problem: ${response.status}')
						return
					}
					response.json().then(mapdata => {
						
						this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.AMR12map).features, 1))
					})
					
				})
		
			
			fetch(this.state.maps[2])
				.then(response => {
					if (response.status !== 200) {
						console.log('There was a problem: ${response.status}')
						return
					}
					response.json().then(mapdata => {
						
						this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.AMR15map).features, 2))
					})
				
				})

			fetch(this.state.maps[3])
				.then(response => {
					if (response.status !== 200) {
						console.log('There was a problem: ${response.status}')
						return
					}
					response.json().then(mapdata => {
						
						this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.AMR20map).features, 3))
					})
					
				})
			
			fetch(this.state.maps[4])
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
	


	

	



	render() {
		return(
			
		<div>
			
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
			{/* Settings modal */}
			
			</div>
		</div>
		<div className="example-grid-body">
			{/* main content */}
			<div className="row">
				<div className="box">
					<div className="three columns" id="big">
						<Provider store={store}>	
						<MapSelector /> 

						
						<SmallTable  />
						</Provider>


					</div>
					<div className="six columns" id="big">
						

								<Provider store={store}>
									<Map  />
								</Provider>


					
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
							<Indikators  />

										<PlusButton />
										<MinButton />
										

										<div className="row"> Export / Upload </div>

										<div className="row">
											<button id="csv_export">Export zu CSV</button>
											<button id="csv_upload">Import CSV</button>

                        
												</div>


											</div>

										</div>
									</div>
									<div className="row">
										<div className="twelve columns" id="big">

											This is the table!
						
            							<Table/>
			</div>
		</div>					
		</div>
			</div>
		
		

		)
	}


}

function mapStateToProps(state) {
	return {
		kreise: state.kreise,
		amr12: state.amr12,
		amr15: state.amr15,
		amr20: state.amr20,
		bund: state.bund
	};
}

export default connect(mapStateToProps)(App)