import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {CSVLink} from 'react-csv';

class Table extends Component {
	

	
		constructor(props) {
			super(props),
			this.download = this.download.bind(this);
			this.state ={
				dataToDownload: []
		}

		}
	download(event) {
		const currentRecords = this.reactTable.getResolvedState().sortedData;
		var data_to_download = []
		for (var index = 0; index < currentRecords.length; index++) {
			let record_to_download = {}
			for (var colIndex = 0; colIndex < this.props.table_columns.length; colIndex++) {
				record_to_download[this.props.table_columns[colIndex].Header] = currentRecords[index][this.props.table_columns[colIndex].accessor]
			}
			data_to_download.push(record_to_download)
		}
		this.setState({ dataToDownload: data_to_download }, () => {
			// click the CSVLink component to trigger the CSV download
			this.csvLink.link.click()
		})
	} 
	
	
	
	render() {
		return (
			<div>
				<div>
					<button onClick={this.download}>
						Download
						</button>
				</div>
				<div>
					<CSVLink
						data={this.state.dataToDownload}
						filename="data.csv"
						className="hidden"
						ref={(r) => this.csvLink = r}
						target="_blank" />

				</div>
				<div>
					<ReactTable ref={(r) => this.reactTable = r } data={this.props.table_data}
					columns={this.props.table_columns}
					 pageSizeOptions={[10,50,100,200]}/>
					
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		table_data: state.table_data,
		indikators: state.indikators,
		table_columns: state.table_columns

	};
}

export default connect(mapStateToProps)(Table)