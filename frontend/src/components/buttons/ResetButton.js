import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *This component class is for the reset button that resets everything to initail settings.
 *
 * @class ResetButton
 * @extends {Component}
 */
class ResetButton extends Component {
	
	handleButton = () => {
		this.props.dispatch({type: 'RESET'})
    }

    /**
     *Render fucntion for the ResetButton class.
     *
     * @return {JSX} returns a button.
     * @memberof ResetButton
     */
    render() {
      
        return (
          <button onClick={this.handleButton.bind(this)}>RESET!</button>
        );
      }
    
}


export default connect()(ResetButton);
