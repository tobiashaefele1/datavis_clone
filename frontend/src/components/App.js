import React, { Component } from 'react';

import Map from "./maps/Map";

import * as ReactDOM from "react-dom";
import MapSelector from './maps/MapSelector';
import { feature } from "../../static/bmf/js/topojson";
import SmallTable from './tables/SmallTable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import produce from 'immer';
import Indikators from './indikators/Indikators';
const initalState = {
	smalltable: [['Name', 'placeholder'], ['ID', 'placeholder'], ['Bund', 'placeholder'], ['Value', 'placeholder'], ['Rank', 'placeholder']],
	counter: 0
}



function reducer(state = initalState, action) {
	console.log('reducer', state, action);
	switch(action.type){
		case 'CHANGE_NAME':
			return produce(state, draft =>{
				 draft.smalltable[0][1] =  action.value //draft.get_current_map()[value].properties.NAME_2
			})
		default:
			return state;
		}
	
}

const store = createStore(reducer);
function changeName(value){
	return {
		type: "CHANGE_NAME",
		value
	};
}

store.dispatch(changeName("pieter"))



class App extends Component {
	constructor() {
		super(),
			this.state = {
				current_map: 0,
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
				loading: true,
				indikator_count: ['indikator1', 'indikator2', 'indikator3']

			},
		this.smalltable = [['Name', 'placeholder'], ['ID', 'placeholder'], ['Bund', 'placeholder'], ['Value', 'placeholder'], ['Rank', 'placeholder']]

	}

	componentWillMount() {
			fetch(this.state.maps[0])
				.then(response => {
					if (response.status !== 200) {
						console.log('There was a problem: ${response.status}')
						return
					}
					response.json().then(mapdata => {
						this.setState({
							kreise: feature(mapdata, mapdata.objects.Kreise_402_all_features).features,
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
						this.setState({
							amr12: feature(mapdata, mapdata.objects.Kreise_402_all_features).features,

						})
					})
					
				}).then(console.log('amr12'))
		
			
			fetch(this.state.maps[2])
				.then(response => {
					if (response.status !== 200) {
						console.log('There was a problem: ${response.status}')
						return
					}
					response.json().then(mapdata => {
						this.setState({
							amr15: feature(mapdata, mapdata.objects.Kreise_402_all_features).features,

						})
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
						this.setState({
							amr20: feature(mapdata, mapdata.objects.Kreise_402_all_features).features,

						})
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
						this.setState({
							bund: feature(mapdata, mapdata.objects.Kreise_402_all_features).features,

						})
					})
					console.log('bund')
				})

		

	}
	


	get_current_map() {
	
		switch (this.state.current_map) {
			case (0):
				return this.state.kreise;

			case (1):
				return this.state.amr12;
			case (2):
				return this.state.amr15;
			case (3):
				return this.state.amr20;
			case (4):
				return this.state.bund;
		}

	}

	handleMapChange = (e) => {
		console.log(this.state.current_map)
		this.setState({
			current_map: parseInt(e.target.value)

		})

	}

	handleMapClick = (i) => {
		console.log(this.get_current_map())
		var updatetable = [['Name', this.get_current_map()[i].properties.NAME_2], 
	['ID', this.get_current_map()[i].properties.CC_2],
['Bund', this.get_current_map()[i].properties.NAME_1],
['Value', 'placeholder'], ['Rank', 'palceholder']]
		this.smalltable = updatetable
	}


	render() {
		if (this.state.loading) {
			return 'Loading...'
		} 
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
						<MapSelector handleMapChange={this.handleMapChange} /> 

						<Provider store={store}>
						<SmallTable  />
						</Provider>


					</div>
					<div className="six columns" id="big">
						
								{console.log(this.handleMapChange)}
								<Provider store={store}>
									<Map current_map={this.get_current_map()} />
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
							<Indikators indikator_count={this.state.indikator_count} />

										<button id="indikator_plus">+</button>
										<button id="indikator_min">-</button>

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

ReactDOM.render(<App />, document.getElementById('container'));