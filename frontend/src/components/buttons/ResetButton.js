import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *This component class is for the reset button that resets everything to initail settings.
 *
 * @class ResetButton
 * @extends {Component}
 */
class ResetButton extends Component {
	
	handleButtonReset = () => {
	    #TODO: this news a promise function, otherwis the order isnt right
		this.props.dispatch({type: 'LOADINGCHANGE'})
		this.props.dispatch({type: 'RESET'})
		this.props.dispatch({type: 'CHANGEVARS'})
    }

    /**
     *Render fucntion for the ResetButton class.
     *
     * @return {JSX} returns a button.
     * @memberof ResetButton
     */
    render() {
      
        return (
			<button onClick={this.handleButtonReset.bind(this)}>Zurücksetzen</button>
		 
        );
      }
    
}


export default connect()(ResetButton);
