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
		  	<a className="button is-dark is-outlined is-large" onClick={this.closeModal.bind(this)}>
    			<span className="icon">
     				 <i className="fas fa-cogs"></i>
    					</span>
   					 {/* <span>Einstellungen</span> */}
  			</a>

      );
    }
}

export default connect()(SettingsButton);


