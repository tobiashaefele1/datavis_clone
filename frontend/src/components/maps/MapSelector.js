import React, {Component} from 'react';
import {connect} from 'react-redux';

class MapSelector extends Component {
  constructor(props) {
    super(props);
  }

	handleMapChange = (e) => {
	  this.props.dispatch(changeMap(parseInt(e.target.value)));

	}


	render() {
	  return (
	    <div>
	      <label>Maps</label>
	      <select className="u-80-width" id="map_selector" onChange={this.handleMapChange.bind(this)}>
	        <option value="0">Kreise</option>
	        <option value="1">AMR12</option>
	        <option value="2">AMR15</option>
	        <option value="3">AMR20</option>
	        <option value="4">Bund</option>
	      </select>

	    </div>
	  );
	}
}
function changeMap(value) {
  return {
    type: 'CHANGEMAP',
    value,
  };
}

export default connect()(MapSelector);
