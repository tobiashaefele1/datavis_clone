import React, {Component} from 'react';
import {connect} from 'react-redux';

class ViewPicker extends Component {
	closeModal = () => {
	  this.props.dispatch({type: 'VIEWMODAL'});
	}

	changeView = () => {
	  this.props.dispatch({type: 'CHANGEVIEW'});
	  this.props.dispatch({type: 'VIEWMODAL'});
	}


	render() {
	  if (this.props.show_viewpicker) {
	    return (
	      <div>
	        <div id="settings" className="import_modal">
	          <div className="import_modal-content">
	            <span className="close" onClick={this.closeModal.bind(this)}>&times;</span>
							Moin Moin, Please pick a view:
	            <div className="row">
	              <button onClick={this.closeModal.bind(this)}>Multiple Indikators</button>
	              <button onClick={this.changeView.bind(this)}>Single Indikator</button>
	            </div>
	          </div>
	        </div>
	      </div>);
	  } else {
	    return ('');
	  }
	}
}

function mapStateToProps(state) {
  return {
    show_viewpicker: state.show_viewpicker,
  };
}


export default connect(mapStateToProps)(ViewPicker);
