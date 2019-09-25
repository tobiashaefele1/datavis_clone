import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the InfoButton this opens the information modal.
 *
 * @class InfoButton
 * @extends {Component}
 */
class PCAButton extends Component {
    closePCA = () => {
      this.props.dispatch({type: 'PCA'});
    }

    /**
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof PCAButton
     */
    render() {
      return (
        <a className="button is-dark is-outlined is-large"
          onClick={this.closePCA.bind(this)}>
          <span className="icon">
            <i className="fas fa-chart-bar"></i>
          </span>
        </a>
      );
    }
}

export default connect()(PCAButton);


