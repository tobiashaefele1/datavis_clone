import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 * Component class for the ChangeViewButton
 * this opens the modal to change the view.
 *
 * @class ChangeViewButton
 * @extends {Component}
 */
class ChangeViewButton extends Component {
  /**
     *This function changes the view.
     *
     * @memberof ChangeViewButton
     */
    changeView = () => {
      this.props.dispatch({type: 'CHANGEVIEW'});
    }

    /**
     * This method decides if which text
     *  needs to be shown in the button to switch views.
     *
     * @return {JSX} the text shown in the button
     * @memberof ChangeViewButton
     */
    viewButton() {
      if (this.props.view_multiple) {
        return (
          <span>einzelnen Indikator ansehen</span>
        );
      } else {
        return (
          <span>aggregierten Indikator zusammenstellen</span>
        );
      }
    }

    /**
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof ChangeViewButton
     */
    render() {
      return (
        <button className="button is-dark is-outlined is-fullwidth"
          onClick={this.changeView}>{this.viewButton()}</button>
      );
    }
}

/**
 *Here the props are selected from the store.
 *
 * @param {state} state current state of the store
 * @return {props} returns the selected states as props
 */
function mapStateToProps(state) {
  return {
    view_multiple: state.view_multiple,
  };
}

export default connect(mapStateToProps)(ChangeViewButton);
