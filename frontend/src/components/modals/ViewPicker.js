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
  					<div className="modal-content">
   						<div className="box">
				<div className="buttons is-centered">
				<a class="button is-link is-outlined" onClick={this.changeViewMultiple.bind(this)}>
    									
										<span>einen aggregierten Indikator zusammensetzen</span>
															</a>
															<a class="button is-link is-outlined" onClick={this.changeViewSingle.bind(this)}>
    									
										<span>einzelne Indikatoren ansehen</span>
															</a>

        
                
                
               
</div>
                
				</div>
              </div>
			  <button class="modal-close is-large" onClick={this.closeModal.bind(this)} aria-label="close"></button>
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
