import React, { Component } from 'react'
import { connect } from 'react-redux'

class SmallTable extends Component {




	render() {
		return (
			<table id="specInfo" className="u-80-width">
				<thead>
					<tr>
						<th colSpan="2">Area specific information</th>
					</tr>
				</thead>
				<tbody>
					{this.props.smalltable.map((d, i) => 
						<tr key= {`tr-${i}`}>
							<td key= {`td-${i}-key`}>{d[0]}</td>
							<td key={`td-${i}-value`}>{d[1]}</td>
						</tr>
					

					)}
				</tbody>
			</table>
		)
	}
}

function mapStateToProps(state) {
	return {
		smalltable: state.smalltable
	};
}

export default connect(mapStateToProps)(SmallTable)