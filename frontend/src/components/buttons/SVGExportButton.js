import React, {Component} from 'react';
import {connect} from 'react-redux';

class SVGExportButton extends Component {
	exportsvg = () => {
	var svgData = $("#svg")[0];
	var serial = new XMLSerializer();
	svgData = serial.serializeToString(svgData)
	var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
	var svgUrl = URL.createObjectURL(svgBlob);
	var downloadLink = document.createElement("a");
	downloadLink.href = svgUrl;
	downloadLink.download = "newesttree.svg";
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);

	}

	render() {
	  return (
	    <button onClick={this.exportsvg.bind(this)}>Export Map</button>
	  );
	}
}


export default connect()(SVGExportButton);


