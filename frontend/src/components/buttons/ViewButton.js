import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the ViewButton this opens the modal to change the view.
 *
 * @class ViewButton
 * @extends {Component}
 */
class ViewButton extends Component {
    closeModal = () => {
      this.props.dispatch({type: 'MODAL'});
      this.props.dispatch({type: 'VIEWMODAL'});
    }

    /**
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof ViewButton
     */
    render() {
      return (
        <button onClick={this.closeModal.bind(this)}>Ansicht wechseln</button>
      );
    }
}

export default connect()(ViewButton);


