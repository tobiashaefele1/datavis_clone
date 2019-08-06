import React, { Component } from 'react'
import { connect } from 'react-redux';

class Indikator extends Component {
	render() {
		return (

			<div id={`in_${this.props.number}`}>
				<div className="row">
					<div className="six columns">
						<label className="indicator">{this.props.name}</label>
						<select className="u-95-width" id={`var_name_${this.props.number}`} >
							<option disabled defaultValue value="0"> -- Wähle Variable --</option>
							{this.props.col_names_var.map((d, i) =>
								<option value={d} key={i}>{d}</option>
							)
							}							
						</select>
					</div>

					<div className="three columns">
						<label className="indicator">Jahr </label>
						<select className="u-80-width" id={`var_year_${this.props.number}`}>
							{this.props.years_var.map((d, i) =>
								<option value={d} key={i}>{d}</option>
							)
							}		
						</select>
					</div>


					<div className="three columns" >
						<label>%</label>
						<input className="u-80-width" id={`weight_${this.props.number}`} type="number" placeholder="45" >
						</input>
					</div>

					<div className="row">

						<div className="six columns">
            				<select className="u-95-width" id={`ref_name_${this.props.number}`}>
								<option disabled defaultValue value="0">  standardisiert über... </option>
								{this.props.col_names_ref.map((d, i) =>
									<option value={d} key={i}>{d}</option>
								)
								}		
							</select>
						</div>

						<div className="three columns">
						<select className="u-80-width" id={`ref_year_${this.props.key}`}>
								{this.props.years_ref.map((d, i) =>
									<option value={d} key={i}>{d}</option>
								)
								}
						</select>
					</div>
				</div>
			</div>
		</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		col_names_var: state.col_names_var,
		col_names_ref: state.col_names_ref,
		years_ref: state.years_ref,
		years_var: state.years_var,
		table_data: state.table_data,
		indicator_data: state.indicator_data 
	};
}

export default connect(mapStateToProps)(Indikator)