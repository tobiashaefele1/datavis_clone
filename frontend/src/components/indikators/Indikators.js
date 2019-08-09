import React, {Component} from 'react';
import Indikator from './Indikator';
import {connect} from 'react-redux';

/**
 *Component class for all the indicators.
 *
 * @class Indikators
 * @extends {Component}
 */
class Indikators extends Component {
  /**
   *This function is automatically called when the props or state updates
   *
   * @memberof Indikators
   */
  componentDidUpdate() {
    this.props.dispatch({type: 'UPDATECOLUMNS'});
  }

  /**
   *This is the function that renders the indicators.
   *
   * @return {JSX}
   * @memberof Indikators
   */
  render() {
    return (
      <div key='indikators'>
        {this.props.indikators.map( (d, i) =>
          <Indikator key={i} number={i} name={d} />
        )
        }
      </div>

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
    indikators: state.indikators,
    view_multiple: state.view_multiple,
  };
}

export default connect(mapStateToProps)(Indikators);
