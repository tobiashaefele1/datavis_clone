import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the ChangeViewButton this opens the modal to change the view.
 *
 * @class ChangeViewButton
 * @extends {Component}
 */
class ChangeViewButton extends Component {

	 /**
     *This function changes the view.
     *
     * @memberof ChangeViewButton
     */
    changeView = () => {
        this.props.dispatch({type: 'CHANGEVIEW'});  
    }
 
	viewButton(){
		if(this.props.view_multiple){
			return( 
				
				<a class="button is-dark is-outlined" onClick={this.changeView}>
    									
										<span>einzelne Indikator ansehen</span>
															</a>

			)
		}else{
			return(
			
					

				<a class="button is-dark is-outlined" onClick={this.changeView}>
    									
										<span>Aggregierten Indikator</span>
										
															</a>

			)
		}
	}
    /**
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof ChangeViewButton
     */
    render() {
      return (
		<div>{this.viewButton()}</div>
      );
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
	view_multiple: state.view_multiple,
  };
}

export default connect(mapStateToProps)(ChangeViewButton);


