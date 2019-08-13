import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {CSVLink} from 'react-csv';

/**
 *Component to create the table.
 *
 * @class Table
 * @extends {Component}
 */
class Table extends Component {
  /**
   *Creates an instance of Table and creates the CSV export.
   * @param {*} props
   * @memberof Table
   */
  constructor(props) {
    super(props),
    this.download = this.download.bind(this);
    this.state ={
      dataToDownload: [],
    };
  }

      showTableDispatch(value) {
      return (
        {
          type: 'SHOWTABLE',
          value,
        }
      );
    };
      showTable = (e) =>{
      this.props.dispatch(this.showTableDispatch(e.target.value));
    };




  /**
   *This creates the CSV file from current data and offers it as a download.
   *
   * @param {*} event
   * @memberof Table
   */
  download(event) {
    const currentRecords = this.reactTable.getResolvedState().sortedData;
    const dataToDownload = [];
    for (let index = 0; index < currentRecords.length; index++) {
      const recordToDownload = {};
      for (let colIndex = 0;
        colIndex < this.props.table_columns.length; colIndex++) {
        recordToDownload[this.props.table_columns[colIndex].Header]
        = currentRecords[index][this.props.table_columns[colIndex].accessor];
      }
      dataToDownload.push(recordToDownload);
    }
    this.setState({dataToDownload: dataToDownload}, () => {
      // click the CSVLink component to trigger the CSV download
      this.csvLink.link.click();
    });
  }



  renderTable = () => {
    if(this.props.showTable){
      return (        <div>

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
          <ReactTable ref={(r) => this.reactTable = r }
            data={this.props.table_data}
            columns={this.props.table_columns}
            pageSizeOptions={[10, 50, 100, 200]}
          />

        </div>
        </div>
      );
    }
  }



  /**
   *This function renders the table.
   *
   * @return {JSX}
   * @memberof Table
   */
  render() {
    return (

      <div style={{marginLeft: '20px', marginRight: '20px'}}>
        <div>
          <button value = {this.props.showTable} onClick={this.showTable}>
            {this.props.showTable ? `Vollständige Datentabelle verbergen` : `Vollständige Datentabelle anzeigen`} </button>
        </div>
        {this.renderTable()}

      </div>
    );
  }
}

/**
 *Here the props are selected from the store.
 *
 * @param {state} state current state of the store
 * @return {props} returns the selected states as props
 */
function mapStateToProps(state) {
  return {
    table_data: state.table_data,
    indikators: state.indikators,
    table_columns: state.table_columns,
    showTable: state.showTable,

  };
}

export default connect(mapStateToProps)(Table);
