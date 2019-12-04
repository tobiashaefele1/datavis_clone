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

         if(this.props.view_multiple){
      return (
        <a className="button is-dark is-outlined is-large"
          onClick={this.closePCA.bind(this)}>
          <span className="icon">
            <i className="fas fa-chart-bar"></i>
          </span>
        </a>
      );
    }
    else {return ''}
    }
}
function mapStateToProps(state) {
  return {
    view_multiple: state.view_multiple}}



export default connect(mapStateToProps)(PCAButton);


