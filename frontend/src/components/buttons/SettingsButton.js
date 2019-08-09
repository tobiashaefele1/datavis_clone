import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the SettingButton this opens the Settings modal.
 *
 * @class SettingButton
 * @extends {Component}
 */
class SettingButton extends Component {
    closeModal = () => {
      this.props.dispatch({type: 'MODAL'});
    }

    /**
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof SettingButton
     */
    render() {
      return (
        <button onClick={this.closeModal.bind(this)}>Settings</button>
      );
    }
}

export default connect()(SettingButton);


