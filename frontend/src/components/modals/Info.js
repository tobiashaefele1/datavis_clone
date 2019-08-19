import React, {Component} from 'react';
import {connect} from 'react-redux';
import ViewButton from '../buttons/ViewButton';
/**
 *Component class to crete the Settings modal.
 *
 * @class Settings
 * @extends {Component}
 */
class Info extends Component {
    /**
     *This function closes the modal.
     *
     * @memberof Settings
     */
    closeInfo = () => {
      this.props.dispatch({type: 'INFO'});
    }
    /**
     *This Function changes the color of the map.
     *
     * @param {event} e this is the color that is selected.
     * @memberof Settings
     */
    // colorChange = (e) =>{
    //   this.props.dispatch(this.changeColorDispatch(e.target.value));
    // };
    //
    // scaleChange = (e) =>{
    //   this.props.dispatch(this.changeScaleDispatch(e.target.value));
    // };



    /**
     *This function creates a dispatch ready input.
     *
     * @param {*} value
     * @return {Dict} ready to send to dispatch
     * @memberof Settings
     */
    // changeColorDispatch(value) {
    //   return (
    //     {
    //       type: 'CHANGECOLOR',
    //       value,
    //     }
    //   );
    // };
    //
    // changeScaleDispatch(value) {
    //   return (
    //     {
    //       type: 'CHANGESCALE',
    //       value,
    //     }
    //   );
    // };


    /**
     *This function renders the Settings modal.
     *
     * @return {JSX}
     * @memberof Settings
     */
    render() {
      if (this.props.showInfo) {
        return (
          <div>
            <div id="settings" className="import_modal">
              <div className="import_modal-content">
                <span className="close"
                  onClick={this.closeInfo.bind(this)}>&times;</span>
                    <h3>Infos</h3>
                  <text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac aliquam ipsum, quis egestas libero. Proin tempus felis a erat vestibulum consequat. Mauris non massa nisl. Maecenas gravida dui et tortor ultricies, vel dapibus lectus convallis. Vestibulum tempus laoreet malesuada. Sed fringilla ultrices urna, at commodo lacus finibus facilisis. Duis aliquet lacus sollicitudin molestie ultrices. Aenean et urna auctor, faucibus ex vel, euismod tortor. Aenean finibus dolor vitae erat mollis laoreet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Pellentesque neque tellus, suscipit sed risus at, condimentum suscipit quam. Sed tempor, sapien quis vestibulum sodales, turpis neque imperdiet libero, ac iaculis diam ante in urna. Nullam maximus rhoncus metus rhoncus tincidunt. Etiam eget ultrices massa, ut molestie magna. Pellentesque laoreet nisl ut tortor consectetur, eu convallis ipsum mattis. Vivamus pellentesque augue ut dignissim placerat. In lacinia porta ornare.

Nulla ultricies nisi et nulla efficitur interdum vitae eget arcu. Aenean eu massa quis nisl egestas lobortis sed nec arcu. Donec dui ante, tincidunt a suscipit non, imperdiet ut leo. Proin fringilla mi eget risus auctor, quis vestibulum leo molestie. Nam nec enim sit amet sem ornare iaculis. Phasellus volutpat vitae turpis ac fermentum. Sed a blandit est. Quisque lacinia consectetur augue maximus laoreet. Pellentesque tellus nibh, auctor et ultricies quis, faucibus non metus. Sed quis velit quis metus iaculis tempus. Vestibulum nunc nibh, pretium eu imperdiet sed, dignissim nec sem. In non ornare risus. Vivamus id tempor velit. Duis ornare nunc et lorem finibus, sit amet tristique nulla mattis.

                  </text>git

                <div>
                </div>

              </div>

            </div>
                    <button onClick={this.closeInfo.bind(this)}>zurück</button>


          </div>);
      } else {
        return ('');
      }
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
    showInfo: state.showInfo,
  };
}

export default connect(mapStateToProps)(Info);
