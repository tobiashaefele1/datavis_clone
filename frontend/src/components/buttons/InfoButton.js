import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the SettingsButton this opens the Settings modal.
 *
 * @class SettingsButton
 * @extends {Component}
 */
class InfoButton extends Component {
    closeInfo = () => {
      this.props.dispatch({type: 'INFO'});
    }

    /**
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof SettingsButton
     */
    render() {
      return (
        <button onClick={this.closeInfo.bind(this)}>Infos</button>
      );
    }
}

export default connect()(InfoButton);


