import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component to create the area specific information.
 *
 * @class SmallTable
 * @extends {Component}
 */
class SmallTable extends Component {
  /**
   *This function renders the table.
   *
   * @return {JSX}
   * @memberof SmallTable
   */
  render() {
    return (
      <table id="specInfo" className="u-80-width">
        <thead>
          <tr>
            <th colSpan="2">Area specific information</th>
          </tr>
        </thead>
        <tbody>
          {this.props.smalltable.map((d, i) =>
            <tr key= {`tr-${i}`}>
              <td key= {`td-${i}-key`}>{d[0]}</td>
              <td key={`td-${i}-value`}>{d[1]}</td>
            </tr>
          )}
        </tbody>
      </table>
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
    smalltable: state.smalltable,
  };
}

export default connect(mapStateToProps)(SmallTable);
