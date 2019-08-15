import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component that creates the modal to pick a view.
 *
 * @class ViewPicker
 * @extends {Component}
 */
class ViewPicker extends Component {
    /**
     *This function closes the modal.
     *
     * @memberof ViewPicker
     */
    closeModal = () => {
      this.props.dispatch({type: 'VIEWMODAL'});
    }

    /**
     *This function changes the view to single view and closes the modal.
     *
     * @memberof ViewPicker
     */
    changeViewSingle = () => {
      if (this.props.view_multiple) {
        this.props.dispatch({type: 'CHANGEVIEW'});
      }
      this.props.dispatch({type: 'VIEWMODAL'});
    }

    /**
     *This function changes the view to multiple view and closes the modal.
     *
     * @memberof ViewPicker
     */
    changeViewMultiple = () => {
      if (!this.props.view_multiple) {
		this.props.dispatch({type: 'CHANGEVIEW'}); 
      }
      this.props.dispatch({type: 'VIEWMODAL'});
    }


    /**
     *This function renders the modal.
     *
     * @return {JSX}
     * @memberof ViewPicker
     */
    render() {
      if (this.props.show_viewpicker) {
        return (
          <div>
            <div id="settings" className="import_modal">
              <div className="import_modal-content">
                <span className="close"
                  onClick={this.closeModal.bind(this)}>&times;</span>
                <p>Willkommen!</p>
                <p> Ich möchte... </p>
                <div className="row" id = "multiple_button">
                  <button id="aggreg.indic.button"
                    onClick={this.changeViewMultiple.bind(this)}>
                        einen aggregierten Indikator zusammensetzen
                  </button>
                </div>

                <div className = "row" id = "single_button">
                  <button id="single.indic.button"
                    onClick={this.changeViewSingle.bind(this)}>
                        einzelne Indikatoren ansehen
                  </button>
                </div>

              </div>
            </div>
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
    show_viewpicker: state.show_viewpicker,
    view_multiple: state.view_multiple,
  };
}

export default connect(mapStateToProps)(ViewPicker);
