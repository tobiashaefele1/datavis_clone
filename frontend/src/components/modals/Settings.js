import React, {Component} from 'react';
import {connect} from 'react-redux';
import ViewButton from '../buttons/ViewButton';
import ChangeViewButton from '../buttons/ChangeViewButton';
/**
 *Component class to crete the Settings modal.
 *
 * @class Settings
 * @extends {Component}
 */
class Settings extends Component {
    /**
     *This function closes the modal.
     *
     * @memberof Settings
     */
    closeModal = () => {
      this.props.dispatch({type: 'MODAL'});
    }
    /**
     *This Function changes the color of the map.
     *
     * @param {event} e this is the color that is selected.
     * @memberof Settings
     */
    colorChange = (e) =>{
      this.props.dispatch(this.changeColorDispatch(e.target.value));
    };

    scaleChange = (e) =>{
      this.props.dispatch(this.changeScaleDispatch(e.target.value));
    };



    /**
     *This function creates a dispatch ready input.
     *
     * @param {*} value
     * @return {Dict} ready to send to dispatch
     * @memberof Settings
     */
    changeColorDispatch(value) {
      return (
        {
          type: 'CHANGECOLOR',
          value,
        }
      );
    };

    changeScaleDispatch(value) {
      return (
        {
          type: 'CHANGESCALE',
          value,
        }
      );
	};



    /**
     *This function renders the Settings modal.
     *
     * @return {JSX}
     * @memberof Settings
     */
    render() {
      if (this.props.show_modal) {
        return (

			  <div className="modal is-active">
  				<div className="modal-background" onClick={this.closeModal.bind(this)}></div>
  					<div className="modal-content">
   						<div className="box">
							   <h2 className=" title has-text-centered">Einstellungen</h2>
							   <div className="columns">
									<div className="column">
										 <h3>Darstellung</h3>
                							<ChangeViewButton/>
									</div>
									<div className="column">
										<h3>Farbpaletten</h3>
										<div className="buttons">
										<a class="button is-dark is-outlined" value={0} onClick={this.colorChange.bind(this)}>
    			<span>
					<svg width="10" height="10" className="Blues">
												<rect width="10" height="10" className="q0-5" />
											</svg>
											<svg width="10" height="10" className="Blues">
												<rect width="10" height="10" className="q1-5" />
											</svg>
											<svg width="10" height="10" className="Blues">
												<rect width="10" height="10" className="q2-5" />
											</svg>
											<svg width="10" height="10" className="Blues">
												<rect width="10" height="10" className="q3-5" />
											</svg>
											<svg width="10" height="10" className="Blues">
												<rect width="10" height="10" className="q4-5" />
											</svg>
											<svg width="10" height="10" className="Purples">
												<rect width="10" height="10" className="q5-5" />
											</svg>		
											</span>
  			</a>
											
			<a class="button is-dark  is-outlined" value={1} onClick={this.colorChange.bind(this)}>
    			<span>
					<svg width="10" height="10" className="Reds">
                    <rect width="10" height="10" className="q0-5" />
                  </svg>
                  <svg width="10" height="10" className="Reds">
                    <rect width="10" height="10" className="q1-5" />
                  </svg>
                  <svg width="10" height="10" className="Reds">
                    <rect width="10" height="10" className="q2-5" />
                  </svg>
                  <svg width="10" height="10" className="Reds">
                    <rect width="10" height="10" className="q3-5" />
                  </svg>
                  <svg width="10" height="10" className="Reds">
                    <rect width="10" height="10" className="q4-5" />
                  </svg>
                  <svg width="10" height="10" className="Reds">
                    <rect width="10" height="10" className="q5-5" />
                  </svg>	
											</span>
  			</a>
					<a class="button is-dark is-outlined" value={2} onClick={this.colorChange.bind(this)}>
    			<span>
					 <svg width="10" height="10" className="Greens">
                    <rect width="10" height="10" className="q0-5" />
                  </svg>
                  <svg width="10" height="10" className="Greens">
                    <rect width="10" height="10" className="q1-5" />
                  </svg>
                  <svg width="10" height="10" className="Greens">
                    <rect width="10" height="10" className="q2-5" />
                  </svg>
                  <svg width="10" height="10" className="Greens">
                    <rect width="10" height="10" className="q3-5" />
                  </svg>
                  <svg width="10" height="10" className="Greens">
                    <rect width="10" height="10" className="q4-5" />
                  </svg>
                  <svg width="10" height="10" className="Greens">
                    <rect width="10" height="10" className="q5-5" />
                  </svg>	
											</span>
  			</a>						
                							
            </div>
                 </div>

									<div className="column">
										<h3>  Skalen </h3>

									<div className="buttons">
									<a class="button is-dark is-outlined" value={0} onClick={this.scaleChange}>
    									
										<span>gleichmäßige Gruppen</span>
															</a>
									<a class="button is-dark is-outlined" value={1} onClick={this.scaleChange}>
    									
										<span>gleichmäßige Intervalle</span>
															</a>

															<a class="button is-dark is-outlined" value={2} onClick={this.scaleChange}>
    									
										<span>fließende Intervalle</span>
															</a>
								
								</div>
										
								</div>
							   </div>
                </div>
				</div>
                  
  				<button class="modal-close is-large" onClick={this.closeModal.bind(this)} aria-label="close"></button>
			</div>
           
                

            
          );
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
	show_modal: state.show_modal,
	view_multiple: state.view_multiple,
  };
}

export default connect(mapStateToProps)(Settings);
