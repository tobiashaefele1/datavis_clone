import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the SettingsButton this opens the Settings modal.
 *
 * @class SettingsButton
 * @extends {Component}
 */
class TableButton extends Component {
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
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof TableButton
     */
    render() {
      return (
       <button value = {this.props.showTable} onClick={this.showTable}> {this.props.showTable ? `Vollständige Datentabelle verbergen` : `Vollständige Datentabelle anzeigen`} </button>
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
    
    showTable: state.showTable,


  };
}
export default connect(mapStateToProps)(TableButton);


