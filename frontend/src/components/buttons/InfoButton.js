import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the InfoButton this opens the information modal.
 *
 * @class InfoButton
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
     * @memberof InfoButton
     */
    render() {
      return (
        <a className="button is-dark is-outlined is-large"
          onClick={this.closeInfo.bind(this)}>
          <span className="icon">
            <i className="far fa-question-circle"></i>
          </span>
        </a>
      );
    }
}

export default connect()(InfoButton);


