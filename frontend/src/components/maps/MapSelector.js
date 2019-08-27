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
        <div className="is-centered" style={{paddingBottom: '25px'}}>
          <div style={{paddingBottom: '5px'}}>Karte</div>
          <div className="select is-small is-dark"
            style={{marginBottom: '10px'}}>
            <select
              id="map_selector"
              onChange={this.handleMapChange.bind(this)}
              defaultValue='1'>
              <option value="0">Kreise (Gebietsstand 2015)</option>
              <option value="1">Arbeitsmarktregionen (Stand 2012)</option>
              <option value="2">Arbeitsmarktregionen (Stand 2015)</option>
              <option value="3">Arbeitsmarktregionen (Stand 2020)</option>
              <option value="4">Raumordnungsregionen</option>
              <option value="5">Bundesländer</option>
            </select>
          </div>
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

/**
 *Here the props are selected from the store.
 *
 * @param {state} state current state of the store
 * @return {props} returns the selected states as props
 */
function mapStateToProps(state) {
  return {
    count_map: state.count_map,
  };
}

export default connect(mapStateToProps)(MapSelector);
