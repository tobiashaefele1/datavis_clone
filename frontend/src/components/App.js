import React, {Component} from 'react';

import Map from './maps/Map';
import MapSelector from './maps/MapSelector';
import {feature} from 'topojson';
import SmallTable from './tables/SmallTable';
import Indikators from './indikators/Indikators';
import {connect} from 'react-redux';
import PlusButton from './buttons/PlusButton';
import MinButton from './buttons/MinButton';
import SettingsButton from './buttons/SettingsButton';
import Settings from './modals/Settings';
import Table from './tables/Table';
import ViewPicker from './modals/ViewPicker';
import MinMaxTable from './tables/MinMaxTable';
import SVGExportButton from './buttons/SVGExportButton';


/**
 *Component class that contains all the other components.
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   *Creates an instance of App.
   * @param {*} props
   * @memberof App
   */
  constructor(props) {
    super(props);
  }

  /**
   *This function creates a dict to use in the dispatch to store a map.
   *
   * @param {*} value
   * @param {*} map
   * @return {Dict}
   * @memberof App
   */
  setMapinStoreDispatch(value, map) {
    return {
      type: 'SETMAPINSTORE',
      value,
      map,
    };
  }

  /**
   *This function is called before the App mounts,
   * here the Kreise map is loaded in.
   *
   * @memberof App
   */
  componentWillMount() {
    fetch('static/bmf/resources/Kreise15map.json')
        .then((response) => {
          if (response.status !== 200) {
            console.log('There was a problem: ${response.status}');
            return;
          }
          response.json().then((mapdata) => {
            this.props.dispatch(this.setMapinStoreDispatch(
                feature(mapdata, mapdata.objects.Kreise15map).features, 0));
            this.props.dispatch({type: 'LOADINGDONE'});
          });
        });
  }


  /**
   *This function is called after the component is mounted,
   * here the other 3 maps are loaded into the store.
   *
   * @memberof App
   */
  componentDidMount() {
    fetch('static/bmf/resources/AMR12map.json')
        .then((response) => {
          if (response.status !== 200) {
            console.log('There was a problem: ${response.status}');
            return;
          }
          response.json().then((mapdata) => {
            this.props.dispatch(this.setMapinStoreDispatch(
                feature(mapdata, mapdata.objects.AMR12map).features, 1));
          });
        });

    fetch('static/bmf/resources/AMR15map.json')
        .then((response) => {
          if (response.status !== 200) {
            console.log('There was a problem: ${response.status}');
            return;
          }
          response.json().then((mapdata) => {
            this.props.dispatch(this.setMapinStoreDispatch(
                feature(mapdata, mapdata.objects.AMR15map).features, 2));
          });
        });

    fetch('static/bmf/resources/AMR20map.json')
        .then((response) => {
          if (response.status !== 200) {
            console.log('There was a problem: ${response.status}');
            return;
          }
          response.json().then((mapdata) => {
            this.props.dispatch(this.setMapinStoreDispatch(
                feature(mapdata, mapdata.objects.AMR20map).features, 3));
          });
        });

    fetch('static/bmf/resources/bundeslandmap.json')
        .then((response) => {
          if (response.status !== 200) {
            console.log('There was a problem: ${response.status}');
            return;
          }
          response.json().then((mapdata) => {
            this.props.dispatch(this.setMapinStoreDispatch(
                feature(mapdata, mapdata.objects.bundeslandmap).features, 4));
          });
        });
  }

  /**
   *This function checks if the screen width is less than 1000px,
   * if this is the case it decrements the indicators to one.
   * This is to imporve layout on mobile devices.
   *
   * @param {*} value screen width
   * @memberof App
   */
  mobile(value) {
    if (value < 1000) {
      this.props.dispatch({
        type: 'DECREMENTINDIKATOR',
      });
      this.props.dispatch({
        type: 'DECREMENTINDIKATOR',
      });
    }
  }

  /**
   *This function renders the whole app.
   *
   * @return {JSX}
   * @memberof App
   */
  render() {
    return (

      <div>
        { this.mobile(window.screen.width) }
        <ViewPicker/>
        <div className="example-grid-logo">
          {/* Top Row */}
          <div className="row">
            <div className="three columns">
              <object type="image/svg+xml"
                data="static/bmf/resources/BMF.svg" width="100%"
                height="100%">Your browser does not support SVG
              </object>
            </div>
            <div className="six columns">
              <h3>BMF - GRW - Datenvisualisierung</h3>
            </div>
            <div className="three columns">
              <SettingsButton/>
              <Settings/>
            </div>

          </div>
        </div>
        <div className="example-grid-body">
          {/* main content */}
          <div className="row">
            <div className="box">
              <div className="three columns" id="big">
                <MapSelector/>
                <SmallTable/>
              </div>
              <div className="six columns" id="big">
                <Map/>
                <MinMaxTable/>
              </div>
              <div className="three columns" id="big">
                Indikatoren
                <Indikators/>
                <PlusButton/>
                <MinButton/>
                <div className="row"> Export / Upload</div>
                <div className="row">
                  <SVGExportButton />
                  <button id="csv_upload">Import CSV</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="twelve columns" id="big">
              <Table/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(App);
