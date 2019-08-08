import React, {Component} from 'react';
import {connect} from 'react-redux';


class ViewButton extends Component {
	closeModal = () => {
	  this.props.dispatch({type: 'MODAL'})
	  this.props.dispatch({type: 'VIEWMODAL'})
	}

	render() {
	  return (

	    <button onClick={this.closeModal.bind(this)}>Change View</button>


	  );
	}
}


export default connect()(ViewButton);


