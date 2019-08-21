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
      <table id="specInfo" className="table  is-fullwidth">
        
        <tbody>
          {this.props.smalltable.map((d, i) =>
            <tr key= {`tr-${i}`}>
              <td className='st-left' key= {`td-${i}-key`}>{d[0]}</td>
              <td className='st-right' key={`td-${i}-value`}>{d[1]}</td>
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
