import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the MetaExportButton this creates a file,
 * of the current map, that is offert as a download.
 *
 * @class MetaExportButton
 * @extends {Component}
 */
class MetaExportButton extends Component {
	 /**
   *Creates an instance of Table and creates the CSV export.
   * @param {*} props
   * @memberof MetaExportButton
   */
  constructor(props) {
    super(props),
    this.download = this.download.bind(this);
    this.state ={
      dataToDownload: [],
    };
  }
	

  /**
   *This creates the CSV file from current meta data.
   *
   * @param {*} event
   * @memberof MetaExportButton
   */
  download(event) {
   
	var result, ctr, keys, columnDelimiter, lineDelimiter, data, names;
	data = this.props.metadata
	columnDelimiter = ',';
    lineDelimiter = '\n';
	names = Object.keys(data)
	keys = Object.keys(data['Bruttoverdienst_100']);
	console.log(keys)
	result = '';
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	names.forEach(function(item) {
		ctr = 0;
		keys.forEach(function(key) {
			if (ctr > 0) result += columnDelimiter;

			result += data[item][key];
			ctr++;
		});
		result += lineDelimiter;
	});
	
	const csvBlob = new Blob([result],
          {type: 'data:text/csv;charset=utf-8'});
	const csvUrl = URL.createObjectURL(csvBlob);
	
      const downloadLink = document.createElement('a');
      downloadLink.href = csvUrl;
      downloadLink.download = 'metadata.csv';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

  }
    /**
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof MetaExportButton
     */
    render() {
      return (
		    <a class="button is-dark is-outlined" onClick={this.download.bind(this)}>
    			
   					 <span>Meta Data exportieren</span>
  			</a>
       
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
    
    view_multiple: state.view_multiple,
 
   
      value_dic: state.value_dic,
      metadata: state.metadata,
  };
}

export default connect(mapStateToProps)(MetaExportButton);


