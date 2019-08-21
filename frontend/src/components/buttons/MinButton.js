import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *This component class is for the min button that removes indikators.
 *
 * @class MinButton
 * @extends {Component}
 */
class MinButton extends Component {
    handleButton = () => {
      this.props.dispatch({type: 'DECREMENTINDIKATOR'});
    }

    /**
     *Render fucntion for the MinButton class.
     *
     * @return {JSX} returns a button.
     * @memberof MinButton
     */
    render() {
      if (this.props.ic < 2) {
        return (
          ''
        );
      } else {
        return (
			<a class="button is-dark is-outlined" onClick={this.handleButton.bind(this)}>
    			<span class="icon">
     				 <i class="fas fa-minus"></i>
    					</span>
   					 {/* <span>Einstellungen</span> */}
  			</a>
          
        );
      }
    }
}
/**
 * mapStateToProps function
 *
 * @param {*} state the current state from store
 * @return {*} needed props
 */
function mapStateToProps(state) {
  return {
    ic: state.indikator_counter,
  };
}

export default connect(mapStateToProps)(MinButton);
