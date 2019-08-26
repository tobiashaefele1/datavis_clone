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
	    this.props.dispatch({type: 'CHANGEVARS'});
	    this.props.dispatch({type: 'UPDATECOLUMNS'});
	    document.getElementById('var_name_0').value='Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200';
	    document.getElementById('var_name_1').value='Lohn pro Beschäftigtem 2010 _ORIGINAL_200';
	    document.getElementById('var_name_2').value='Erwerbstätigenprognose _ORIGINAL_200';
	    document.getElementById('var_name_3').value='Infrastrukturindikator_ORIGINAL_200';
	    document.getElementById('var_year_0').value='2009-12';
	    document.getElementById('var_year_1').value='2010';
	    document.getElementById('var_year_2').value='2011-18';
	    document.getElementById('var_year_3').value='2012';
	    document.getElementById('ref_name_0').value='Zivile Erwerbspersonen_100';
	    document.getElementById('ref_name_1').value='SV-pflichtig Beschäftigte am Wohnort_100';
	    document.getElementById('ref_name_2').value='SV-pflichtig Beschäftigte am Wohnort_100';
	    document.getElementById('ref_name_3').value='SV-pflichtig Beschäftigte am Wohnort_100';
	    document.getElementById('ref_year_0').value='2011';
	    document.getElementById('ref_year_1').value='2011';
	    document.getElementById('ref_year_2').value='2012';
	    document.getElementById('ref_year_3').value='2012';
	    document.getElementById('weight_0').value= 45;
	    document.getElementById('weight_1').value= 40;
	    document.getElementById('weight_2').value= 7.5;
	    document.getElementById('weight_3').value= 7.5;
	  });
	}

	handleButtonResetProm() {
	  // console.log(data);
	  return new Promise((resolve, reject) => {
	    this.props.dispatch({type: 'LOADINGCHANGE'});
	    this.props.dispatch({type: 'RESET'});
	    if ('1' == '1') {
	      resolve(console.log('reset worked'));
	    } else {
	      reject(Error(console.log('reset didn\'t work')));
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


        	            <div className="reset_tooltip">

	      <span className="reset_tooltiptext">
                   setzt alle Parameter auf den "originalen" GRW-Indikator von 2012 zurück
	      </span>
	      <a className="button is-dark is-outlined is-large"
							   onClick={this.handleButtonReset.bind(this)}>
    			<span className="icon">
     				 <i className="fas fa-undo"></i>
    					</span>
	        {/* <span>Einstellungen</span> */}
	      </a>

	    </div>

	  );
	}
}


export default connect()(ResetButton);
