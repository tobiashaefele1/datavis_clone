import React, { Component } from 'react'
import Indikator from './Indikator';
import {connect} from 'react-redux';

class Indikators extends Component {
	
	
	
	
	render() {
		return (
			<div key='indikators'>
			{this.props.indikators.map( (d ,i) => 
					
					
					<Indikator key={i} name={d} />
				
			)
		}
			
			
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		indikator_count: state.indikator_count,
		indikators: state.indikators
	};
}

export default connect(mapStateToProps)(Indikators)
