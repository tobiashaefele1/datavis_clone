import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the SettingsButton this opens the Settings modal.
 *
 * @class SettingsButton
 * @extends {Component}
 */
class SettingsButton extends Component {
    closeModal = () => {
      this.props.dispatch({type: 'MODAL'});
    }

    /**
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof SettingsButton
     */
    render() {
      return (
		  	<a class="button is-link is-outlined" onClick={this.closeModal.bind(this)}>
    			<span class="icon">
     				 <i class="fas fa-cogs"></i>
    					</span>
   					 {/* <span>Einstellungen</span> */}
  			</a>
        
      );
    }
}

export default connect()(SettingsButton);


