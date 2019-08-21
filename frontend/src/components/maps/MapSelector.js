import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Main_selector} from '../indikators/Main_selector'



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

    //  the below is basically my attempt at calling the .ajax function here - no longer necessary
    // wrapping = () => {
    //   Main_selector.ajaxRequest()
    // }
    //
    // TH: The function that gets actually called, which calls handleMapchange and then an ajax Request
    // handleMapChangeProm = (e) => {
    //       this.handleMapChange(e).then(() => {
    //         this.wrapping()});
    // }
    //
    // handleMapChange = (e) => {
    //   return new Promise((resolve, reject) => {
    //     this.props.dispatch(changeMapDispatch(parseInt(e.target.value)));
    //     if ("1" == "1") {
    //       resolve(console.log("it worked"));
    //     } else {
    //       reject(Error(console.log("it broke")))
    //     }
    //   });
    // }


// TH the old original - see my code above that has replaced it
  handleMapChange = (e) => {
	  this.props.dispatch(changeMapDispatch(parseInt(e.target.value)));
	  // this.props.dispatch({type: 'LOADINGCHANGE'})
         }

    /**
     *This renders the dropdown menu.
     *
     * @return {JSX}
     * @memberof MapSelector
     */
    render() {
      return (
		<div className="is-centered">
		<div>Karte</div>
		
		
        <div className="select is-small " style={{marginBottom: '10px'}}>
          <select 
            id="map_selector"
            onChange={this.handleMapChange.bind(this)}
			defaultValue='1'>
            <option value="0">Kreise</option>
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
