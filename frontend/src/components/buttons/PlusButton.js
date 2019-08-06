import React, { Component } from 'react'
import { connect } from 'react-redux';

class PlusButton extends Component {

	handleButton = () => {
		this.props.dispatch({type: 'INCREMENTINDIKATOR'})
	}



	render() {
		if (this.props.ic > 5) {
			return (
				<div>

				</div>
			)
		} else {
			return (

				<button onClick={this.handleButton.bind(this)}>+</button>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		ic: state.indikator_counter
	};
}

export default connect(mapStateToProps)(PlusButton)
