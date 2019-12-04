import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the InfoButton this opens the information modal.
 *
 * @class InfoButton
 * @extends {Component}
 */
class MoneyButton extends Component {
    moneyClick = () => {
      this.props.dispatch({type: 'money'});
    }

    /**
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof InfoButton
     */
    render() {
        // console.log(this.props.view_multiple)
        if(this.props.view_multiple){
      return (
        <a className="button is-dark is-outlined is-large"
          onClick={this.moneyClick.bind(this)}>
          <span className="icon">
        <i className="fas fa-euro-sign"></i>
          </span>
        </a>
      )}

        else {return ''}
    }
}

function mapStateToProps(state) {
  return {
    view_multiple: state.view_multiple}}



export default connect(mapStateToProps)(MoneyButton);



