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
      let svgData = $('#map')[0];
      const serial = new XMLSerializer();
	  svgData = serial.serializeToString(svgData);

      const svgBlob = new Blob([svgData],
          {type: 'image/svg+xml;charset=utf-8'});
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'map.svg';
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
        <button onClick={this.exportsvg.bind(this)}>Karte exportieren</button>
      );
    }
}

export default connect()(SVGExportButton);


