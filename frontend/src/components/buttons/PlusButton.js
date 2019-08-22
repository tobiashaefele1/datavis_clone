import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the PlusButton that increases the number of indicators
 *
 * @class PlusButton
 * @extends {Component}
 */
class PlusButton extends Component {
    /**
     *Handles the button press. Increases the number of indicators

     * @memberof PlusButton
     */
    handleButton = () => {
      this.props.dispatch({type: 'INCREMENTINDIKATOR'});
    }

    /**
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof PlusButton
     */
    render() {
      if (this.props.ic > 5 || !this.props.view_multiple) {
        return ('');
      } else {
        return (
          <a class="button is-dark is-outlined" onClick={this.handleButton.bind(this)}>
    			<span class="icon">
     				 <i class="fas fa-plus"></i>
    					</span>
   					 {/* <span>Einstellungen</span> */}
  			</a>
        );
      }
    }
}

/**
 *Here the props are selected from the store

 * @param {state} state current state of the store
 * @return {props} returns the selected states as props
 */
function mapStateToProps(state) {
  return {
    ic: state.indikator_counter,
    view_multiple: state.view_multiple,
  };
}

export default connect(mapStateToProps)(PlusButton);
