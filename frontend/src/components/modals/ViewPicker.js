import React, {Component} from 'react';
import {connect} from 'react-redux';

class ViewPicker extends Component {
	closeModal = () => {
	  this.props.dispatch({type: 'VIEWMODAL'});
	  
	}

	changeViewSingle = () => {
		if(this.props.view_multiple){
 		 this.props.dispatch({type: 'CHANGEVIEW'});
		}
	  this.props.dispatch({type: 'VIEWMODAL'});
	}
	changeViewMultiple = () => {
		if(!this.props.view_multiple){
		  this.props.dispatch({type: 'CHANGEVIEW'});
		  this.props.dispatch({type: 'INCREMENTINDIKATOR'})
		  this.props.dispatch({type: 'INCREMENTINDIKATOR'})
		}
	  this.props.dispatch({type: 'VIEWMODAL'});
	}


	render() {
	  if (this.props.show_viewpicker) {
	    return (
	      <div>
	        <div id="settings" className="import_modal">
	          <div className="import_modal-content">
	            <span className="close" onClick={this.closeModal.bind(this)}>&times;</span>
							<p>Willkommen!</p>
				  <p> Ich möchte... </p>
	            <div className="row">
	              <button  id="aggreg.indic.button" onClick={this.changeViewMultiple.bind(this)}>einen aggregierten Indikator zusammensetzen </button>
	              <button  id="single.indic.button" onClick={this.changeViewSingle.bind(this)}>einzelne Indikatoren ansehen</button>
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
	view_multiple: state.view_multiple
  };
}


export default connect(mapStateToProps)(ViewPicker);
