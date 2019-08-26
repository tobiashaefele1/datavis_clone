import React, {Component} from 'react';
import {connect} from 'react-redux';


/**
 *Component class for a single Indicator.
 *
 * @class MainSelector
 * @extends {Component}
 */
export class MainSelector extends Component {
  /**
     * this function is actually being called
     * - it calls HandlechangeProm and - once it is complete, an ajaxRequest
     * @param {event} e this is the event where handleChange is called on.
     * @memberof Indikator
     */
    handleChange = (e) => {
      this.handleChangeProm(e).then(() => {
        this.props.dispatch({type: 'LOADINGCHANGE'});
        this.props.ajaxRequest();
      });
    }

    /**
     *This function is called everytime the component updates.
     *
     * @param {*} prevProps
     * @memberof MainSelector
     */
    componentDidUpdate(prevProps) {
      if (this.props.view_multiple) {
        let percentage = 0;
        for (const i in this.props.indikators) {
          if (document.getElementById(`weight_${i}`).value != '') {
            percentage += parseFloat(
                document.getElementById(`weight_${i}`).value);
          }
        }
        if (percentage > 100) {
          // eslint-disable-next-line guard-for-in
          for (const i in this.props.indikators) {
            document.getElementById(
                `weight_${i}`).style.background = 'lightcoral';
          }
        } else if (percentage < 100) {
          // eslint-disable-next-line guard-for-in
          for (const i in this.props.indikators) {
            document.getElementById(
                `weight_${i}`).style.background = 'lightsalmon';
          }
        } else {
          // eslint-disable-next-line guard-for-in
          for (const i in this.props.indikators) {
            document.getElementById(`weight_${i}`).style.background = '#e6ffe6';
          }
        }
      }
    }

    /**
     *This function will return a promise to change the values in the dispatch
     *
     * @param {event} e is the event passed along with the button.
     * @return {Promise}
     * @memberof MainSelector
     */
    handleChangeProm = (e) => {
      return new Promise((resolve, reject) => {
        this.props.dispatch(changeValueDispatch(e.target.id, e.target.value));
        if ('1' == '1') {
          resolve(console.log('it worked'));
        } else {
          reject(Error(console.log('it broke')));
        }
      });
    }

    /**
     * This function checks if it is in single view of multiple view.
     * When in Multiple view it returns the percentage box,
     * if not it returns nothing.
     *
     * @return {JSX} the percentage box if needed.
     * @memberof Indikator
     */
    weight = () =>{
      if (this.props.view_multiple) {
        return (
          <div>
            <div className="weight_tooltip">

              <span className="weight_tooltiptext">
                     Der hier eingebene Wert legt die
                    prozentuale Gewichtung des gewählten Indikators fest.
                <br/>
                    Die Summe
                    aller individuellen Gewichtungen sollte 100% ergeben.
              </span>
                % &nbsp;<i className="far fa-question-circle" id="info_icon">
              </i>
            </div>
            <input className="input is-small" id={`weight_${this.props.number}`}
              onChange={this.handleChange.bind(this)}
              type="number"
              defaultValue={this.props.value_dic[`weight_${this.props.number}`]}
              style={{textAlign: 'center'}} >
            </input>
          </div>
        );
      }
    }

    /**
     *This is the function that renders the indicator.
     *
     * @return {JSX}
     * @memberof Indikator
     */
    render() {
      return (
        <div >
          <div className="columns is-gapless field is-grouped is-mobile"
            style={{marginBottom: '5px'}}>

            <div className="column is-6" style={{textAlign: 'left'}}>
              <div className="indicator_tooltip">
                <span className="tooltiptext">
                     Langname: {
                    (this.props.value_dic[`var_name_${this.props.number}`] ?
                    this.props.metadata[
                        this.props.value_dic[`var_name_${this.props.number}`]
                    ].Langname : '')} <br/>
                      Quelle: {
                    (this.props.value_dic[`var_name_${this.props.number}`] ?
                     this.props.metadata[
                         this.props.value_dic[`var_name_${this.props.number}`]
                     ].Quelle : '')}
                </span>
                <label className="indicator">&nbsp; {this.props.name} <i
                  className="far fa-question-circle" id="info_icon"></i>
                </label>
              </div>
              <div className="select is-dark is-small ">
                <select
                  defaultValue={
                    this.props.value_dic[`var_name_${this.props.number}`]}
                  id={`var_name_${this.props.number}`}
                  onChange={this.handleChange.bind(this)}>
                  <option disabled value="0"> -- Wähle Variable --</option>
                  {this.props.col_names_var.map((d, i) =>
                    <option value={d} key={i}>{d}</option>
                  )}
                </select>
              </div>
            </div>

            <div className="column is-3" style={{textAlign: 'left'}}>
                  &nbsp; Jahr
              <div className="select is-dark is-small">
                <select
                  defaultValue={
                    this.props.value_dic[`var_year_${this.props.number}`]}
                  id={`var_year_${this.props.number}`}
                  onChange={this.handleChange.bind(this)}>
                  <option disabled value="0"> -- Wähle Jahr -- </option>
                  {this.props.value_dic[`var_name_${this.props.number}`] ? (
                    this.props.all_years[
                        `${this.props.value_dic[
                            `var_name_${this.props.number}`]}`]
                        .map((d, i) =>
                          <option value={d} key={i}>{d}</option>)) : ''
                  }
                </select>
              </div>
            </div>

            <div className="column is-3" style={{textAlign: 'center'}}>
              {this.weight()}
            </div>
          </div>

          <div className="columns is-gapless field is-grouped is-mobile">

            <div className="column is-6" style={{textAlign: 'left'}}>
              <div className="indicator_tooltip">
                <span className="tooltiptext">
                 Langname: {
                    (this.props.value_dic[`ref_name_${this.props.number}`] ?
                    this.props.ref_dic[
                        this.props.value_dic[`ref_name_${
                          this.props.number}`]].Langname : '')}
                  <br/>
                      Quelle: {
                    (this.props.value_dic[`ref_name_${this.props.number}`] ?
                     this.props.ref_dic[this.props.value_dic[`ref_name_${
                       this.props.number}`]].Quelle : '')}
                </span>
                <label className="indicator" >&nbsp; Bezugsgröße <i
                  className="far fa-question-circle" id="info_icon">
                </i> </label>
              </div>
              <div className="select is-dark is-small">
                <select
                  defaultValue={
                    this.props.value_dic[`ref_name_${this.props.number}`]}
                  id={`ref_name_${this.props.number}`}
                  onChange={this.handleChange.bind(this)}>
                  <option disabled value="0"> -- Wähle Bezugsgröße -- </option>
                  {this.props.col_names_ref.map((d, i) =>
                    <option value={d} key={i}>{d}</option>
                  )}
                </select>
              </div>
            </div>

            <div className="column is-3" style={{textAlign: 'left'}}>
                  &nbsp; Jahr
              <div>
              </div>
              <div className="select is-dark is-small">
                <select
                  id={`ref_year_${this.props.number}`}
                  onChange={this.handleChange.bind(this)}>
                  defaultValue={
                    this.props.value_dic[`ref_year_${this.props.number}`]}
                  <option disabled value="0"> -- Wähle Jahr -- </option>
                  {this.props.years_ref.map((d, i) =>
                    <option value={d} key={i}>{d}</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div id={`in_${this.props.number}`}
            className="field is-grouped-multiline" >
          </div>
        </div>
      );
    }
}

/**
 *This function creates a dispatch ready input from the indicators.
 *
 * @param {String} value1
 * @param {String} value2
 * @return {Dict} that is send to the dispatch
 */
function changeValueDispatch(value1, value2) {
  return {
    type: 'CHANGEVALUE',
    value1,
    value2,
  };
}

/**
 *Here the props are selected from the store.
 *
 * @param {state} state current state of the store
 * @return {props} returns the selected states as props
 */
function mapStateToProps(state) {
  return {
    col_names_var: state.col_names_var,
    col_names_ref: state.col_names_ref,
    years_ref: state.years_ref,
    years_var: state.years_var,
    table_data: state.table_data,
    indicator_data: state.indicator_data,
    indikator_counter: state.indikator_counter,
    value_dic: state.value_dic,
    count_map: state.count_map,
    current_map: state.current_map,
    map_name: state.map_name,
    view_multiple: state.view_multiple,
    single_indic_data: state.single_indic_data,
    metadata: state.metadata,
    indikators: state.indikators,
    loading: state.loading,
    all_years: state.all_years,
    ref_dic: state.ref_dic,
  };
}

export default connect(mapStateToProps)(MainSelector);
