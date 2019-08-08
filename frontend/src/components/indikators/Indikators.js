import React, { Component } from 'react'
import Indikator from './Indikator';
import {connect} from 'react-redux';

class Indikators extends Component {
	
	componentDidUpdate(){
		this.props.dispatch({type: 'UPDATECOLUMNS'})
	}
	render() {
	
		return (
			<div key='indikators'>
			{this.props.indikators.map( (d ,i) => 
					
					
				<Indikator key={i} number={i} name={d} />
				
			)
		}
			
			
			</div>
		
	)
		
		
	}
}

function mapStateToProps(state) {
	return {
		indikators: state.indikators,
		view_multiple: state.view_multiple
	};
}

export default connect(mapStateToProps)(Indikators)
