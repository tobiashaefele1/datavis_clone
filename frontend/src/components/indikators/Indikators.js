import React, { Component } from 'react'
import indikator from './indikator';

export default class Indikators extends Component {
	
	
	
	
	render() {
		return (
			<div>
			{this.props.indikator_count.map( (d ,i) => {
					<p>{d}</p>
				
			})
		}
			
			
			</div>
		)
	}
}
