import React, {Component} from 'react';

import Map from './maps/Map';
import MapSelector from './maps/MapSelector';
import {feature} from 'topojson';
import SmallTable from './tables/SmallTable';
import Main_selector from "./indikators/Main_selector";
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
import ResetButton from './buttons/ResetButton';
import TableButton from './buttons/TableButton';
import InfoButton from "./buttons/InfoButton";
import Info from "./modals/Info";



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
    fetch('static/bmf/resources/AMR12map.json')
        .then((response) => {
          if (response.status !== 200) {
            console.log('There was a problem: ${response.status}');
            return;
          }
          response.json().then((mapdata) => {
            this.props.dispatch(this.setMapinStoreDispatch(
                feature(mapdata, mapdata.objects.AMR12map).features, 1));
			this.props.dispatch({type: 'FIRSTLOADDONE'});
			this.props.dispatch({type: 'CHANGEVARS'});  
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
  
      fetch('static/bmf/resources/Kreise15map.json')
        .then((response) => {
          if (response.status !== 200) {
            console.log('There was a problem: ${response.status}');
            return;
          }
          response.json().then((mapdata) => {
            this.props.dispatch(this.setMapinStoreDispatch(
                feature(mapdata, mapdata.objects.Kreise15map).features, 0));
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
                feature(mapdata, mapdata.objects.bundeslandmap).features, 5));
          });
		});

	fetch('static/bmf/resources/ROR11map.json')
        .then((response) => {
          if (response.status !== 200) {
            console.log('There was a problem: ${response.status}');
            return;
          }
          response.json().then((mapdata) => {
            this.props.dispatch(this.setMapinStoreDispatch(
                feature(mapdata, mapdata.objects.ROR11map).features, 4));
          });
        });
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
      
        {/* <ViewPicker/> */}
		<div className="columns is-marginless">

		<div className="column is-one-fifth">
 			
   				 
     		<object className="is-pulled-left" type="image/svg+xml" 
                data="static/bmf/resources/BMF_2017_WebSVG_de.svg" >Your browser does not support SVG
              </object>
     				 
		</div>
		<div className="column"><h2 class="title has-text-centered">
      				    Lebensverhältnisse in Deutschland
            			<h2 class="subtitle">Visualisierung von Indikatoren</h2>
     				 </h2></div>
					  

		<div className="column is-one-fifth">

			<div className=" buttons field is-grouped is-pulled-right">
			<SettingsButton/>
              <InfoButton/>
			</div>

			{/* TODO: find someway to show these nicel */}
              <Settings/>
              <Info/>
			</div>			  
		</div>
		<div className="columns is-gapless is-marginless">
			<div className="column is-one-fifth has-background-black-ter">
				<MapSelector/>
				<Indikators/>
                <PlusButton/>
                <MinButton/>
			</div>
			<div className="column is-three-fifth">
				<Map/>
                <MinMaxTable/>

			</div>
			<div className="column is-one-fifth ">
				<SmallTable/>

				<SVGExportButton />
				  <TableButton />

			</div>

		</div>
		<div className="columns">
			<div className="column">
				<Table />
			</div>
		</div>



    </div>
    );
  }
}

export default connect()(App);
