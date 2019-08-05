import React, {Component} from 'react';
import Map from './Map'
import {useStoreActions} from "easy-peasy";




class MapSelector extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>
                <label>Maps</label>
                <select className="u-80-width" id="map_selector" onChange={this.props.handleMapChange.bind(this)}>
                    <option value="0">Kreise</option>
                    <option value="1">AMR12</option>
                    <option value="2">AMR15</option>
                    <option value="3">AMR20</option>
                    <option value="4">Bund</option>
                </select>

            </div>
        );
    }
}


export default MapSelector;
