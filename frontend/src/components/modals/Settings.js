import React, {Component} from 'react';
import {connect} from 'react-redux';

import ChangeViewButton from '../buttons/ChangeViewButton';
import 'jquery';


/**
 *Component class to creates the Settings modal.
 *
 * @class Settings
 * @extends {Component}
 */
class Settings extends Component {
    /**
     *This function closes the modal.
     *
     * @memberof Settings
     */
    closeModal = () => {
      this.props.dispatch({type: 'MODAL'});
    }

    /**
     *This Function changes the color of the map.
     *
     * @param {event} e this is the color that is selected.
     * @memberof Settings
     */
    colorChange = (e) =>{
      this.props.dispatch(this.changeColorDispatch(e.target.value));
    };

    /**
     *This function changes the scale for the map.
     *
     * @param {event} e this is the scale that is selected.
     * @memberof Settings
     */
    scaleChange = (e) =>{
      this.props.dispatch(this.changeScaleDispatch(e.target.value));
    };

    /**
     *This changes the color of the map to blue.
     *
     * @memberof Settings
     */
    colorChangeBlue = () => {
      this.props.dispatch(this.changeColorDispatch('0'));
    };

    /**
     *This changes the color of the map to red.
     *
     * @memberof Settings
     */
    colorChangeRed = () => {
      this.props.dispatch(this.changeColorDispatch('1'));
    };

    /**
     *This changes the color of the map to green.
     *
     * @memberof Settings
     */
    colorChangeGreen = () => {
      this.props.dispatch(this.changeColorDispatch('2'));
    };


    /**
     *This function creates a dispatch ready input for the color change.
     *
     * @param {*} value the value representing the scale
     * @return {Dict} ready to send to dispatch
     * @memberof Settings
     */
    changeColorDispatch(value) {
      return (
        {
          type: 'CHANGECOLOR',
          value,
        }
      );
    };

    /**
     *This function creates a dispatch ready input for the scale change.
     *
     * @param {*} value the value representing the color
     * @return {Dict} ready to send to dispatch
     * @memberof Settings
     */
    changeScaleDispatch(value) {
      console.log(value);
      return (
        {
          type: 'CHANGESCALE',
          value,
        }
      );
    };


    /**
     *This function renders the Settings modal.
     *
     * @return {JSX}
     * @memberof Settings
     */
    render() {
      if (this.props.show_modal) {
        return (
          <div className="modal is-active">
            <div className="modal-background"
              onClick={this.closeModal.bind(this)}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Einstellungen</p>
              </header>
              <section className="modal-card-body">


                <div className="columns">
                  <div className="column has-text-centered">
                    <h3>Darstellung</h3>
                    <ChangeViewButton/>
                  </div>
                  <div className="column has-text-centered">
                    <h3>Farbpaletten</h3>
                    <div className="buttons is-centered">
                      <a className="button is-dark is-outlined"
                        onClick={this.colorChangeBlue.bind(this)}>
                        <span >
                          <svg width="10" height="10" className="Blues">
                            <rect width="10" height="10" className="q0-5" />
                          </svg>
                          <svg width="10" height="10" className="Blues">
                            <rect width="10" height="10" className="q1-5" />
                          </svg>
                          <svg width="10" height="10" className="Blues">
                            <rect width="10" height="10" className="q2-5" />
                          </svg>
                          <svg width="10" height="10" className="Blues">
                            <rect width="10" height="10" className="q3-5" />
                          </svg>
                          <svg width="10" height="10" className="Blues">
                            <rect width="10" height="10" className="q4-5" />
                          </svg>
                          <svg width="10" height="10" className="Purples">
                            <rect width="10" height="10" className="q5-5" />
                          </svg>
                        </span>
                      </a>

                      <a className="button is-dark  is-outlined"
                        onClick={this.colorChangeRed.bind(this)}>
                        <span >
                          <svg width="10" height="10" className="Reds" >
                            <rect width="10" height="10" className="q0-5" />
                          </svg>
                          <svg width="10" height="10" className="Reds">
                            <rect width="10" height="10" className="q1-5" />
                          </svg>
                          <svg width="10" height="10" className="Reds">
                            <rect width="10" height="10" className="q2-5" />
                          </svg>
                          <svg width="10" height="10" className="Reds">
                            <rect width="10" height="10" className="q3-5" />
                          </svg>
                          <svg width="10" height="10" className="Reds">
                            <rect width="10" height="10" className="q4-5" />
                          </svg>
                          <svg width="10" height="10" className="Reds">
                            <rect width="10" height="10" className="q5-5" />
                          </svg>
                        </span>
                      </a>

                      <a className="button is-dark is-outlined"
                        onClick={this.colorChangeGreen.bind(this)}>
                        <span >
                          <svg width="10" height="10" className="Greens">
                            <rect width="10" height="10" className="q0-5" />
                          </svg>
                          <svg width="10" height="10" className="Greens">
                            <rect width="10" height="10" className="q1-5" />
                          </svg>
                          <svg width="10" height="10" className="Greens">
                            <rect width="10" height="10" className="q2-5" />
                          </svg>
                          <svg width="10" height="10" className="Greens">
                            <rect width="10" height="10" className="q3-5" />
                          </svg>
                          <svg width="10" height="10" className="Greens">
                            <rect width="10" height="10" className="q4-5" />
                          </svg>
                          <svg width="10" height="10" className="Greens">
                            <rect width="10" height="10" className="q5-5" />
                          </svg>
                        </span>
                      </a>

                    </div>
                  </div>

                  <div className="column has-text-centered">
                    <h3>  Skalen </h3>

                    <div className="buttons is-centered">

                      <button
                        className="button is-dark is-outlined is-fullwidth"
                        value={0} onClick={this.scaleChange}>
                        gleichm????ige Gruppen
                      </button>

                      <button
                        className="button is-dark is-outlined is-fullwidth"
                        value={1} onClick={this.scaleChange}>
                        gleichm????ige Intervalle
                      </button>

                      <button
                        className="button is-dark is-outlined is-fullwidth"
                        value={2} onClick={this.scaleChange}>
                        flie??ende Intervalle
                      </button>

                    </div>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
              </footer>
            </div>
            <button className="modal-close is-large"
              onClick={this.closeModal.bind(this)}
              aria-label="close"></button>
          </div>
        );
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
    show_modal: state.show_modal,
    view_multiple: state.view_multiple,
  };
}

export default connect(mapStateToProps)(Settings);
