import React, { Component } from 'react';

import Map from "./maps/Map";
import MapSelector from './maps/MapSelector';
import { feature } from "../../static/bmf/js/topojson";
import SmallTable from './tables/SmallTable';
import { Provider } from 'react-redux';
import Indikators from './indikators/Indikators';
import { connect } from 'react-redux';
import { store } from './Store';
import PlusButton from './buttons/PlusButton';
import MinButton from './buttons/MinButton';





class App extends Component {
	constructor() {
		super(),
			this.state = {
				
				maps: [
					"static/bmf/resources/Kreise_402_all_features_topo.json",
					"static/bmf/resources/AMR_12_all_features_topo.json",
					"static/bmf/resources/AMR_15_all_features_topo.json",
					"static/bmf/resources/AMR_20_all_features_topo.json",
					"static/bmf/resources/Bundesland_all_features_topo.json"
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
			fetch(this.state.maps[0])
				.then(response => {
					if (response.status !== 200) {
						console.log('There was a problem: ${response.status}')
						return
					}
					response.json().then(mapdata => {
						
						this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.Kreise_402_all_features).features, 0))

							this.setState({
							loading: false
						})
						
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
						
						this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.Kreise_402_all_features).features, 1))
					})
					
				}).then(console.log('amr12'))
		
			
			fetch(this.state.maps[2])
				.then(response => {
					if (response.status !== 200) {
						console.log('There was a problem: ${response.status}')
						return
					}
					response.json().then(mapdata => {
						
						this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.Kreise_402_all_features).features, 2))
					})
					console.log('amr15')
				})

			fetch(this.state.maps[3])
				.then(response => {
					if (response.status !== 200) {
						console.log('There was a problem: ${response.status}')
						return
					}
					response.json().then(mapdata => {
						
						this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.Kreise_402_all_features).features, 3))
					})
					console.log('amr20')
				})
			
			fetch(this.state.maps[4])
				.then(response => {
					if (response.status !== 200) {
						console.log('There was a problem: ${response.status}')
						return
					}
					response.json().then(mapdata => {
						this.props.dispatch(this.setMapinStore(feature(mapdata, mapdata.objects.Kreise_402_all_features).features, 4))
					})
					console.log('bund')
				})

		

	}
	


	

	



	render() {
		if (this.state.loading) {
			return 'Loading...'
		} 
		return(
			
		<div>
			{console.log(this.props.kreise)}
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
					<button id="conf">Settings</button>
				</div>
			{/* Settings modal */}
			<div id="settings" className="import_modal">
                <div className="import_modal-content">
					<span className="close">&times;</span>
					<h2>Settings</h2>
					<h3>Color:</h3>
					<label>

							<svg width="10" height="10" className="Purples">
								<rect width="10" height="10" className="q0-5" />
							</svg>
							<svg width="10" height="10" className="Purples">
								<rect width="10" height="10" className="q1-5" />
							</svg>
							<svg width="10" height="10" className="Purples">
								<rect width="10" height="10" className="q2-5" />
							</svg>
							<svg width="10" height="10" className="Purples">
								<rect width="10" height="10" className="q3-5" />
							</svg>
							<svg width="10" height="10" className="Purples">
								<rect width="10" height="10" className="q4-5" />
							</svg>
							<svg width="10" height="10" className="Purples">
								<rect width="10" height="10" className="q5-5" />
							</svg>

                    </label>
					<label>

							<svg width="10" height="10" className="Reds">
								<rect width="10" height="10" className="q0-5" />
							</svg>
							<svg width="10" height="10" className="Reds">
								<rect width="10" height="10" className="q1-5" />
							</svg>
							<svg width="10" height="10" className="Reds">
								<rect width="10" height="10" className="q2-5" />
							</svg>
							<svg width="10" height="10" className="Reds">
								<rect width="10" height="10" className="q3-5" />
							</svg>
							<svg width="10" height="10" className="Reds">
								<rect width="10" height="10" className="q4-5" />
							</svg>
							<svg width="10" height="10" className="Reds">
								<rect width="10" height="10" className="q5-5" />
							</svg>
	
                    </label>

					<label>

								<svg width="10" height="10" className="Oranges">
									<rect width="10" height="10" className="q0-5" />
								</svg>
								<svg width="10" height="10" className="Oranges">
									<rect width="10" height="10" className="q1-5" />
								</svg>
								<svg width="10" height="10" className="Oranges">
									<rect width="10" height="10" className="q2-5" />
								</svg>
								<svg width="10" height="10" className="Oranges">
									<rect width="10" height="10" className="q3-5" />
								</svg>
								<svg width="10" height="10" className="Oranges">
									<rect width="10" height="10" className="q4-5" />
								</svg>
								<svg width="10" height="10" className="Oranges">
									<rect width="10" height="10" className="q5-5" />
								</svg>

						</label>
									STD:
					</div>
				</div>
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

                        <div id="myImportModal" className="import_modal">


                            <div className="import_modal-content">
													<span className="close">&times;</span>
													<form method="post" encType="multipart/form-data">

														<input type="file" name="csv" accept="text/csv">
														</input>
														<input type="submit">
														</input>

													</form>
                            </div>

                        </div>
												</div>


											</div>

										</div>
									</div>
									<div className="row">
										<div className="twelve columns" id="big">

											This is the table!
						
            							<div id='table_complete'></div>

											<table id="data_table">
												<thead>
												<tr>

												</tr>
												</thead>

											</table>

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