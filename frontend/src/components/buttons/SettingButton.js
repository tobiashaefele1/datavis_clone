import React, {Component} from 'react';
import {connect} from 'react-redux';

class SettingButton extends Component {
	closeModal = () => {
	  this.props.dispatch({type: 'MODAL'});
	}

	render() {
	  return (

	    <button onClick={this.closeModal.bind(this)}>Settings</button>


	  );
	}
}


export default connect()(SettingButton);


