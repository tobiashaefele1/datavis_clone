import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the dropdown menu to select a map.
 *
 * @class MapSelector
 * @extends {Component}
 */
class MapSelector extends Component {
  /**
    *Creates an instance of MapSelector.
    * @param {*} props
    * @memberof MapSelector
    */
  constructor(props) {
    super(props);
  }

  /**
    *This handles the change of the dropdown menu.
    *
    * @param {event} e this is the event from the dropdown
    * @memberof MapSelector
    */
    handleMapChange = (e) => {
      this.props.dispatch(changeMapDispatch(parseInt(e.target.value)));
    }

    /**
     *This renders the dropdown menu.
     *
     * @return {JSX}
     * @memberof MapSelector
     */
    render() {
      return (
        <div>
          <label>Maps</label>
          <select className="u-80-width"
            id="map_selector"
            onChange={this.handleMapChange.bind(this)}>
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

/**
 *This function creates a dispatch ready input.
 *
 * @param {*} value
 * @return {Dict} ready to send to the dispatch
 */
function changeMapDispatch(value) {
  return {
    type: 'CHANGEMAP',
    value,
  };
}

export default connect()(MapSelector);
