import React, {Component} from 'react';
import {connect} from 'react-redux';

class MinButton extends Component {
	handleButton = () => {
	  this.props.dispatch({type: 'DECREMENTINDIKATOR'});
	}

	render() {
	  if (this.props.ic < 2) {
	    return (
	      <div>

	      </div>
	    );
	  } else {
	    return (

	      <button onClick={this.handleButton.bind(this)}>-</button>
	    );
	  }
	}
}
function mapStateToProps(state) {
  return {
    ic: state.indikator_counter,
  };
}

export default connect(mapStateToProps)(MinButton);
