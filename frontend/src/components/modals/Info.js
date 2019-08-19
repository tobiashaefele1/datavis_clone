import React, {Component} from 'react';
import {connect} from 'react-redux';
import ViewButton from '../buttons/ViewButton';
/**
 *Component class to crete the Settings modal.
 *
 * @class Settings
 * @extends {Component}
 */
class Info extends Component {
    /**
     *This function closes the modal.
     *
     * @memberof Settings
     */
    closeInfo = () => {
      this.props.dispatch({type: 'INFO'});
    }
    /**
     *This Function changes the color of the map.
     *
     * @param {event} e this is the color that is selected.
     * @memberof Settings
     */
    // colorChange = (e) =>{
    //   this.props.dispatch(this.changeColorDispatch(e.target.value));
    // };
    //
    // scaleChange = (e) =>{
    //   this.props.dispatch(this.changeScaleDispatch(e.target.value));
    // };



    /**
     *This function creates a dispatch ready input.
     *
     * @param {*} value
     * @return {Dict} ready to send to dispatch
     * @memberof Settings
     */
    // changeColorDispatch(value) {
    //   return (
    //     {
    //       type: 'CHANGECOLOR',
    //       value,
    //     }
    //   );
    // };
    //
    // changeScaleDispatch(value) {
    //   return (
    //     {
    //       type: 'CHANGESCALE',
    //       value,
    //     }
    //   );
    // };


    /**
     *This function renders the Settings modal.
     *
     * @return {JSX}
     * @memberof Settings
     */
    render() {
      if (this.props.showInfo) {
        return (
          <div>
            <div id="settings" className="import_modal">
              <div className="import_modal-content">

                // #TODO: fix the button and the info.js modal so that I can write text into it.
                <span className="close"
                  onClick={this.closeInfo.bind(this)}>&times;</span>
                <h3>Darstellung</h3>
                <h3>Farbpaletten:</h3>

                <div>
                  <h3>  Skalen: </h3>
                </div>

              </div>

            </div>
                    <button onClick={this.closeInfo.bind(this)}>zurück</button>


          </div>);
      } else {
        return ('');
      }
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
    showInfo: state.showInfo,
  };
}

export default connect(mapStateToProps)(Info);
