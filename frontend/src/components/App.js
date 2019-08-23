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
import MetaExportButton from './buttons/MetaExportButton';
import ChangeViewButton from './buttons/ChangeViewButton';



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
   *This function checks if the screen width is less than 1000px,
   * if this is the case it decrements the indicators to one.
   * This is to imporve layout on mobile devices.
   *
   * @param {*} value screen width
   * @memberof App
   */
  mobile(value) {
    if (value < 1000 && this.props.view_multiple && this.props.firstload) {
      this.props.dispatch({
        type: 'CHANGEVIEW',
      });
     
    }else if(value >1000){
		return( <ViewPicker />)
	}
  }

  indikatorSet(value){
	  if(value < 1000) {
		  return (<div className="column is-half is-mobile is-centered is-vcentered has-text-centered ">
			  	<div><Map/></div>
                <div className="columns is-centered ">
                <MinMaxTable/>
				</div></div>)
	  }else{
		  return (<div className="column is-one-quarter has-text-centered"><div id="optionbox" className="box   has-background-white-ter has-text-black "><MapSelector/>
				<Indikators/>
                <div className=" buttons is-centered">
                <PlusButton/>
				<MinButton/></div></div></div>	
				)
	  }
  }
  mapSet(value){
	  if(value < 1000) {
		  return (<div className="column is-one-quarter has-text-centered    "><div id="optionbox" className="box   has-background-white-ter has-text-black "><MapSelector/>
				<Indikators/>
				<div className=" buttons  is-centered">
                <PlusButton/>
				<MinButton/></div></div></div>)
	  }else{
		  return (
			  <div className="column is-mobile is-half is-centered is-vcentered has-text-centered ">
				<div><Map/></div>
				<div className="columns is-centered ">
                <MinMaxTable/>
				</div>
		  </div>	
				)
	  }
  }

  headline = () => {
      return (this.props.view_multiple ? "Zusammengesetzter Indikator" : `${this.props.metadata[this.props.value_dic['var_name_0']].csvname}, ${this.props.value_dic['var_year_0']} ` )
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
        
		<div className="columns is-marginless is-mobile">

		<div className="column is-one-quarter">
 			
   				 
     		<object className="is-pulled-left" type="image/svg+xml" 
                data="static/bmf/resources/BMF_2017_WebSVG_de.svg" >Your browser does not support SVG
              </object>
     				 
		</div>
		<div className="column"><h2 className="title has-text-centered">
            Lebensverhältnisse in Deutschland </h2>
            			<h2 className="subtitle has-text-centered">Visualisierung von Indikatoren</h2>
     				 </div>
					  

		<div className="column is-one-quarter">

			<div className=" buttons is-centered " >
			<SettingsButton/>
              <InfoButton/>
			</div>
			<Info/>
			{/* TODO: find someway to show these nicel */}
              <Settings/>
            
			</div>			  
		</div>
		<div className="columns is-marginless has-text-black">
			<div className="column is-hidden-mobile is-paddingless ">
				<div className="subtitle has-text-centered" style={{fontWeight : "bold"}}>Einstellungen</div>
			</div>
			<div className="column is-half is-paddingless ">
				<div className="subtitle has-text-centered" style={{fontWeight : "bold"}}>{this.headline()}</div>
			</div>
			<div className="column is-hidden-mobile is-paddingless">
				<div className="subtitle has-text-centered" style={{fontWeight : "bold"}} >Übersicht</div>
			</div>
		</div>
		<div className="columns is-marginless">
			
				{this.indikatorSet(window.screen.width)}
			
		
			
				{this.mapSet(window.screen.width)}

			<div className="column is-one-quarter has-text-centered   ">
				
				<div id="optionbox" className="box has-background-white-ter has-text-black ">
				
					<div> </div>
				<SmallTable/>
					
					<div className="columns">
						<div className="column full-width">
						
							<div>Darstellung</div>
								<div className="buttons is-centered">
									<ChangeViewButton/>
							</div>
							
							<div>Export</div>
							<div className="buttons is-centered">
							<SVGExportButton />
							<MetaExportButton/>
							</div>
							<div>Tabelle</div>
							<div className="buttons is-centered">
							<TableButton />	
							</div>
				
						</div>

				</div>
				
				</div>
				
				
				
				
				
	
			</div>

		</div>
		<Table/>


    </div>
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
	   firstload: state.firstload,
  };
}
export default connect(mapStateToProps)(App);
