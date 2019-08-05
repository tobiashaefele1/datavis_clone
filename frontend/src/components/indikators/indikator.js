import React, { Component } from 'react'

export default class Indikator extends Component {
	render() {
		return (

			<div id={`in_${this.props.key}`}>
				<div class="row">
					<div class="six columns">
						<label class="indicator">{this.props.name}</label>
						<select class="u-95-width" id={`var_name_${this.props.key}`} >
							<option disabled selected value="0"> -- Wähle Variable --</option>
						{/* figure out mapping how we do that */}
                        <option value="placeholder">placeholder</option>	
						</select>
					</div>

					<div class="three columns">
						<label class="indicator">Jahr </label>
						<select class="u-80-width" id={`var_year_${this.props.key}`}>
						{/* figure out mapping how we do that */}
                        <option value="placeholder">placeholder</option>	
						</select>
					</div>


					<div class="three columns" >
						<label>%</label>
						<input class="u-80-width" id={`weight_${this.props.key}`} type="number" placeholder="45" >
						</input>
					</div>

					<div class="row">

						<div class="six columns">
            				<select class="u-95-width" id={`ref_name_${this.props.key}`}>
								<option disabled selected value="0">  standardisiert über... </option>
								{/* figure out mapping how we do that */}
								<option value="placeholder">placeholder</option>
							</select>
						</div>

						<div class="three columns">
						<select class="u-80-width" id={`ref_year_${this.props.key}`}>
                   			 {/* figure out mapping how we do that */}
							<option value="placeholder">placeholder</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		)
	}
}
