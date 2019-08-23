import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class for the SVGExportButton this creates a file,
 * of the current map, that is offert as a download.
 *
 * @class SVGExportButton
 * @extends {Component}
 */
class SVGExportButton extends Component {
    exportsvg = () => {
		let legend = $('#legend').html()
		

	  let svgData = $('#svg')[0];
	  console.log(svgData)
      const serial = new XMLSerializer();
	  svgData = serial.serializeToString(svgData);
		var svgBegin = svgData.slice(0, 98)
		console.log(svgBegin)
		var svgMap = svgData.slice(98, -6)
		console.log(svgMap)
	
		var newSVG = svgBegin.replace("450", "500")
		
		newSVG += legend
		newSVG += svgMap
		newSVG += '<text y="445" font-size="9" >&#9400;Bundesministerium der Finanzen</text>'
		newSVG += `<text y="470" font-size="13" >${this.props.view_multiple ? "Zusammengesetzter Indikator" : (this.props.metadata[this.props.value_dic['var_name_0']].csvname + ', ' + this.props.value_dic['var_year_0'])} </text>`
		newSVG += '</svg>'

	  console.log(newSVG)


      const svgBlob = new Blob([newSVG],
          {type: 'image/svg+xml;charset=utf-8'});
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `Karte_BMF_${this.props.view_multiple ? "Zusammengesetzter Indikator" : (this.props.metadata[this.props.value_dic['var_name_0']].csvname + '_' + this.props.value_dic['var_year_0'])}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }

    /**
     *This function renders the button.
     *
     * @return {JSX}
     * @memberof SVGExportButton
     */
    render() {
      return (
		    <button class="button is-dark is-outlined is-fullwidth" onClick={this.exportsvg.bind(this)}>
    			
   					 <span>Karte</span>
  			</button>
       
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
 
   
      value_dic: state.value_dic,
      metadata: state.metadata,
  };
}

export default connect(mapStateToProps)(SVGExportButton);


