import React, {Component, createRef} from 'react';
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
    this.ref = createRef();
  }

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
      this.csvLink.link.click();
    });
  }


  /**
   *This is the function that renders the table
   * if the this.props.showTable value is true.
   *
   * @return {JSX}
   * @memberof Table
   */
  renderTable = () => {
    if (this.props.showTable) {
      return (
        <div>
          <div id='table' className="columns is-marginless has-text-black" >
          </div>
          <div className="columns is-marginless">
            <div className="column ">
              <div className="box has-background-white-ter
              has-text-black has-text-centered" >
                <div className="subtitle has-text-centered"
                  style={{fontWeight: 'bold'}}>vollständige Datentabelle</div>
                <div className="buttons is-centered">
                  <div className="download_tooltip">
                    <span className="download_tooltiptext">
                        Lädt die in der Tabelle angezeigten Daten herunter.
                        Um alle Daten herunterzuladen,
                        zuerst die entsprechende
                         Zeilenanzahl in der Tabelle auswählen.
                    </span>
                    <a className="button is-dark is-outlined"
                      onClick={this.download}>
                      <span>Datentabelle als .csv Datei exportieren</span>
                    </a>
                  </div>
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
                    pageSizeOptions={[10, 50, 100, 200,
                      `${this.props.single_indic_data[0].length}`]}
                    previousText={'Zurück'}
                    nextText={'Nächste'}
                    loadingText={'Lädt...'}
                    noDataText={'Keine Daten verfügbar'}
                    pageText={'Seite'}
                    ofText={'von'}
                    rowsText={'Zeilen'}
                    pageJumpText={'Springe zu Seite'}
                    rowsSelectorText={'Zeilen pro Seite'}
                  />
                </div>
              </div>
            </div>
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
      <div>
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
    single_indic_data: state.single_indic_data,

  };
}

export default connect(mapStateToProps)(Table);
