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
        this.handleButtonResetProm().then(() => {
                  this.props.dispatch({type: 'CHANGEVARS'})
          });

    }

    handleButtonResetProm(){
      // console.log(data);
        return new Promise((resolve, reject) => {
            this.props.dispatch({type: 'LOADINGCHANGE'});
            this.props.dispatch({type: 'RESET'});
      if ("1" == "1") {
        resolve(console.log("it worked"));
      } else {
        reject(Error(console.log("It didn't work")));
      }
    });
    };










    /**
     *Render fucntion for the ResetButton class.
     *
     * @return {JSX} returns a button.
     * @memberof ResetButton
     */
    render() {
      
        return (
			<button onClick={this.handleButtonReset.bind(this)}>GRW 12</button>
		 
        );
      }
    
}


export default connect()(ResetButton);
