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
          <div className="modal is-active">
            <div className="modal-background" onClick={this.closeModal.bind(this)}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title" style={{textAlign: 'center'}}>Ansicht wählen:</p>
              </header>
              <section className="modal-card-body">


                <div className="btn-group-vertical is-centered" style={{padding: '10px 24px'}}>

                  <div className="is-centered" style={{textAlign: 'center', paddingBottom: '20px'}}>
                    <a className="button is-dark is-outlined is-centered" onClick={this.changeViewMultiple.bind(this)} >
                                    aggregierten Indikator zusammensetzen
                    </a>
                  </div>

                  <div className="is-centered" style={{textAlign: 'center', paddingBottom: '0px'}}>
                    <a className="button is-dark is-outlined is-centered" onClick={this.changeViewSingle.bind(this)}>
                                        einzelne Indikatoren ansehen
                    </a>
                  </div>
                </div>

              </section>
              <footer className="modal-card-foot">

              </footer>


            </div>


            <button className="modal-close is-large" onClick={this.closeModal.bind(this)} aria-label="close"></button>
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
    show_viewpicker: state.show_viewpicker,
    view_multiple: state.view_multiple,
  };
}

export default connect(mapStateToProps)(ViewPicker);
