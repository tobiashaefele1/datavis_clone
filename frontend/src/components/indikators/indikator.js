import React, { Component } from 'react'
import { connect } from 'react-redux';

class Indikator extends Component {



	handleChange = (e) => { 

		this.props.dispatch(changeValue(e.target.id,  e.target.value))
	}
	componentDidUpdate(prevProps){
	if (prevProps.value_dic !== this.props.value_dic) {
		this.post_req()
	}
	}


	post_req(){
		// TODO: change hardcoded HIB or LIB
	let data = {
		csrf_token: $("[name=csrf_token]").val(),
		'var_1': [this.props.value_dic['var_name_0'],
			this.props.value_dic['var_year_0'],
			this.props.value_dic['ref_name_0'],
			this.props.value_dic['ref_year_0'],
			'KRS_15', 'HIB', this.props.value_dic['weight_0']],

		'var_2': [
			(this.props.indikator_count >= 1 ? this.props.value_dic['var_name_1'] : ""),
			(this.props.indikator_count >= 1 ? this.props.value_dic['var_year_1'] : ""),
			(this.props.indikator_count >= 1 ? this.props.value_dic['ref_name_1'] : ""),
			(this.props.indikator_count >= 1 ? this.props.value_dic['ref_year_1'] : ""),
			this.props.count_map, 'HIB', (this.props.indikator_count >= 1 ? this.props.value_dic['weight_1'] : "")],
		'var_3': [
			(this.props.indikator_count >= 2 ? this.props.value_dic['var_name_2'] : ""),
			(this.props.indikator_count >= 2 ? this.props.value_dic['var_year_2'] : ""),
			(this.props.indikator_count >= 2 ? this.props.value_dic['ref_name_2'] : ""),
			(this.props.indikator_count >= 2 ? this.props.value_dic['ref_year_2'] : ""),
			this.props.count_map, 'HIB', (this.props.indikator_count >= 2 ? this.props.value_dic['weight_2'] : "")],
		'var_4': [
			(this.props.indikator_count >= 3 ? this.props.value_dic['var_name_3'] : ""),
			(this.props.indikator_count >= 3 ? this.props.value_dic['var_year_3'] : ""),
			(this.props.indikator_count >= 3 ? this.props.value_dic['ref_name_3'] : ""),
			(this.props.indikator_count >= 3 ? this.props.value_dic['ref_year_3'] : ""),
			this.props.count_map, 'HIB', (this.props.indikator_count >= 3 ? this.props.value_dic['weight_3'] : "")],
		'var_5': [
			(this.props.indikator_count >= 4 ? this.props.value_dic['var_name_4'] : ""),
			(this.props.indikator_count >= 4 ? this.props.value_dic['var_year_4'] : ""),
			(this.props.indikator_count >= 4 ? this.props.value_dic['ref_name_4'] : ""),
			(this.props.indikator_count >= 4 ? this.props.value_dic['ref_year_4'] : ""),
			this.props.count_map, 'HIB', (this.props.indikator_count >= 4 ? this.props.value_dic['weight_4'] : "")],
		'var_6': [
			(this.props.indikator_count >= 5 ? this.props.value_dic['var_name_5'] : ""),
			(this.props.indikator_count >= 5 ? this.props.value_dic['var_year_5'] : ""),
			(this.props.indikator_count >= 5 ? this.props.value_dic['ref_name_5'] : ""),
			(this.props.indikator_count >= 5 ? this.props.value_dic['ref_year_5'] : ""),
			this.props.count_map, 'HIB', (this.props.indikator_count >= 5 ? this.props.value_dic['weight_5'] : "")],

	};

	console.log(data)
	$.ajax({
		type: "POST",
		url: window.location.pathname,
		dataType: "json",
		asnyc: true,
		data: data,
		traditional: true,
		success: function (data) {
			console.log(data)
			changevars();
		}


	})
}





	render() {
		return (

			<div id={`in_${this.props.number}`}>
				<div className="row">
					<div className="six columns">
						<label className="indicator">{this.props.name}</label>
						<select className="u-95-width" defaultValue="0" id={`var_name_${this.props.number}`} onChange={this.handleChange.bind(this)} >
							<option disabled value="0"> -- Wähle Variable --</option>
							{this.props.col_names_var.map((d, i) =>
								<option value={d} key={i}>{d}</option>
							)
							}							
						</select>
					</div>

					<div className="three columns">
						<label className="indicator">Jahr </label>
						<select className="u-80-width" defaultValue="0" id={`var_year_${this.props.number}`} onChange={this.handleChange.bind(this)}>
							<option disabled value="0"> -- Wähle Variable --</option>
							{this.props.years_var.map((d, i) =>
								<option value={d} key={i}>{d}</option>
							)
							}		
						</select>
					</div>


					<div className="three columns" >
						<label>%</label>
						<input className="u-80-width" id={`weight_${this.props.number}`} onChange={this.handleChange.bind(this)} type="number" placeholder="45" >
						</input>
					</div>

					<div className="row">

						<div className="six columns">
							<select className="u-95-width" defaultValue="0" id={`ref_name_${this.props.number}`} onChange={this.handleChange.bind(this)}>
								<option disabled  value="0">  standardisiert über... </option>
								{this.props.col_names_ref.map((d, i) =>
									<option value={d} key={i}>{d}</option>
								)
								}		
							</select>
						</div>

						<div className="three columns">
							<select className="u-80-width" defaultValue="0" id={`ref_year_${this.props.number}`} onChange={this.handleChange.bind(this)}>
								<option disabled value="0"> -- Wähle Variable --</option>
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
function changeValue(value1, value2) {
	return {
		type: "CHANGEVALUE",
		value1,
		value2
	};
}

function changevars() {
	var i;
	var template = state.current_map.properties;
	for (i = 0; i < state.current_map.properties.length; i++)
		{
			var j;
			for (j = 0; j <state.indicator_data[0].length; j++)
				{
				if (parsefloat(state.current_map.properties.Kennziffer[i]) == parsefloat(state.indicator_data[0][j]))
					{template['indicator'][i] = state.indicator_data[j]}
				}
		}
	console.log(template['indicator'])
	return {
		type: "CHANGEVAR",
		template,
	};


}








function mapStateToProps(state) {
	return {
		col_names_var: state.col_names_var,
		col_names_ref: state.col_names_ref,
		years_ref: state.years_ref,
		years_var: state.years_var,
		table_data: state.table_data,
		indicator_data: state.indicator_data, 
		indikator_count: state.indikator_count,
		value_dic: state.value_dic,
		count_map: state.count_map
	};
}

export default connect(mapStateToProps)(Indikator)