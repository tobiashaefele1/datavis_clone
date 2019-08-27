import {createStore} from 'redux';
import produce from 'immer';

const initalState = {

  // Map variables
  currentScale: 0,
  scaleOptions: [0, 1, 2],
  current_color: ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'],
  color_options: [['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'],
    ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
    ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c']],
  counter: 0,
  count_map: 1,
  current_map: [],
  kreise: [],
  amr12: [],
  amr15: [],
  amr20: [],
  ror: [],
  bund: [],
  map_name: ['KRS_15', 'AMR_12', 'AMR_15', 'AMR_20', 'ROR11', 'Bundesland_ID'],

  // Indikator variables
  indikator_counter: 4,
  indikators: ['Indikator 1', 'Indikator 2', 'Indikator 3', 'Indikator 4'],
  all_years: JSON.parse(context.all_years),
  value_dic: {
    'var_name_0': 'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200',
    'var_name_1': 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200',
    'var_name_2': 'Erwerbstätigenprognose _ORIGINAL_200',
    'var_name_3': 'Infrastrukturindikator_ORIGINAL_200',
    'var_name_4': null,
    'var_name_5': null,
    'var_year_0': '2009-12', 'var_year_1': '2010',
    'var_year_2': '2011-18', 'var_year_3': '2012',
    'var_year_4': null, 'var_year_5': null,
    'weight_0': 45, 'weight_1': 40, 'weight_2': 7.5, 'weight_3': 7.5,
    'weight_4': 0, 'weight_5': 0,
    'ref_name_0': 'Zivile Erwerbspersonen_100',
    'ref_name_1': 'SV-pflichtig Beschäftigte am Wohnort_100',
    'ref_name_2': 'SV-pflichtig Beschäftigte am Wohnort_100',
    'ref_name_3': 'SV-pflichtig Beschäftigte am Wohnort_100',
    'ref_name_4': 'SV-pflichtig Beschäftigte am Wohnort_100',
    'ref_name_5': 'SV-pflichtig Beschäftigte am Wohnort_100',
    'ref_year_0': '2011', 'ref_year_1': '2011',
    'ref_year_2': '2012', 'ref_year_3': '2012',
    'ref_year_4': '2018', 'ref_year_5': '2018',
  },
  ref_dic: {'Einwohner 15-64_100':
  {'Langname': 'Einwohner 15-64', 'Quelle': 'Zensus Fortschreibung'},
  'Einwohner gesamt_100': {'Langname': 'Einwohner gesamt',
    'Quelle': 'Fortschreibung des Bevölkerungsstandes 2011'},
  'Fläche_100': {'Langname': 'Fläche',
    'Quelle': 'Inkar Datenbank, immer Gebietsstand 2015'},
  'SV-pflichtig Beschäftigte am Wohnort_100':
     {'Langname': 'SV-pflichtig Beschäftigte am Wohnort',
       'Quelle': 'Statistik der Bundesagentur für Arbeit'},
  'Zivile Erwerbspersonen_100': {'Langname': 'Zivile Erwerbspersonen',
    'Quelle': 'Statistik der Bundesagentur für Arbeit,'
    + ' rückerrechnet aus Arbeitslosenzahlen und Arbeitslosenquoten'},
  },

  // Table variables
  smalltable: [['Name', '-'],
    ['ID', '-'],
    ['Einwohner (2017)', '-'],
    ['Fläche (km2)', '-'],
    ['Bundesland', '-'],
    ['Angezeigter Wert', '-']],

  table_columns: [{
    Header: 'Kennziffer',
    accessor: 'Kennziffer',
    style: {textAlign: 'right'},
  },
  {
    Header: 'Name',
    accessor: 'Name',
    style: {textAlign: 'left'},
  },

  {
    Header: 'aggregierter Indikator',
    accessor: 'aggregierter Indikator',
    style: {textAlign: 'right'},
  },
  {
    Header: 'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200 2009-12',
    accessor: 'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200 2009-12',
    style: {textAlign: 'right'},
  },
  {
    Header: 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200 2010',
    accessor: 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200 2010',
    style: {textAlign: 'right'},
    Cell: (props) =>
      ((props.value !== null || props.value != '' )
     ? props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'),
  },
  {
    Header: 'Erwerbstätigenprognose _ORIGINAL_200 2011-18',
    accessor: 'Erwerbstätigenprognose _ORIGINAL_200 2011-18',
    style: {textAlign: 'right'},
  },
  {
    Header: 'Infrastrukturindikator_ORIGINAL_200 2012',
    accessor: 'Infrastrukturindikator_ORIGINAL_200 2012',
    style: {textAlign: 'right'},
  }],
  col_names_var: JSON.parse(context.col_names_var),
  col_names_ref: JSON.parse(context.col_names_ref),
  years_ref: JSON.parse(context.years_ref),
  showTable: false,
  indicator_data: JSON.parse(context.indicator_data),
  single_indic_data: JSON.parse(context.single_indic_data),
  table_data: JSON.parse(context.table_data),
  metadata: JSON.parse((context.metadata.replace(/(\r\n|\n|\r)/gm, ''))),
  all_years: JSON.parse(context.all_years),


  // Modal variables
  show_modal: false,
  showInfo: false,


  // Loading variables
  loading: false,
  firstload: true,

  // View variables
  view_multiple: true,
  show_viewpicker: true,

};

/**
 * This is the reducer to change state of the store.
 * @param {*} state this is the initalState that goes in the store.
 * @param {*} action this is the action that is called to the reducer.
 * @return {*}
 */
function reducer(state = initalState, action) {
  switch (action.type) {
    case 'CHANGECOLOR':
      return produce(state, (draft) => {
        switch (action.value) {
          case '0':
            draft.current_color = state.color_options[0];
            break;
          case '1':
            draft.current_color = state.color_options[1];
            break;
          case '2':
            draft.current_color = state.color_options[2];
            break;
          default:
            draft.current_color = state.color_options[0];
            break;
        }
      });

    case 'CHANGESCALE':
      return produce(state, (draft) => {
        switch (action.value) {
          case '0':
            draft.currentScale = state.scaleOptions[0];
            break;
          case '1':
            draft.currentScale = state.scaleOptions[1];
            break;
          case '2':
            draft.currentScale = state.scaleOptions[2];
            break;
        }
      });

    case 'SHOWTABLE':
      return produce(state, (draft) => {
        draft.showTable = !state.showTable;
      }
      );


    case 'VIEWMODAL':
      return produce(state, (draft) => {
        draft.show_viewpicker = !state.show_viewpicker;
      });

    case 'RESET':
      return produce(state, (draft)=>{
        draft.indicator_data = JSON.parse(context.indicator_data);
        draft.single_indic_data = JSON.parse(context.single_indic_data);
        draft.indikator_counter = 4;
        draft.indikators =
        ['Indikator 1', 'Indikator 2', 'Indikator 3', 'Indikator 4'];
        draft.current_map = state.amr12;
        draft.count_map = 1;
        draft.view_multiple = true;
        draft.table_data = JSON.parse(context.table_data);
        draft.value_dic = {
          'var_name_0':
          'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200',
          'var_name_1': 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200',
          'var_name_2': 'Erwerbstätigenprognose _ORIGINAL_200',
          'var_name_3': 'Infrastrukturindikator_ORIGINAL_200',
          'var_name_4': null,
          'var_name_5': null,
          'var_year_0': '2009-12', 'var_year_1': '2010',
          'var_year_2': '2011-18', 'var_year_3': '2012',
          'var_year_4': null, 'var_year_5': null,
          'weight_0': 45, 'weight_1': 40, 'weight_2': 7.5, 'weight_3': 7.5,
          'weight_4': 0, 'weight_5': 0,
          'ref_name_0': 'Zivile Erwerbspersonen_100',
          'ref_name_1': 'SV-pflichtig Beschäftigte am Wohnort_100',
          'ref_name_2': 'SV-pflichtig Beschäftigte am Wohnort_100',
          'ref_name_3': 'SV-pflichtig Beschäftigte am Wohnort_100',
          'ref_name_4': 'SV-pflichtig Beschäftigte am Wohnort_100',
          'ref_name_5': 'SV-pflichtig Beschäftigte am Wohnort_100',
          'ref_year_0': '2011', 'ref_year_1': '2011',
          'ref_year_2': '2012', 'ref_year_3': '2012',
          'ref_year_4': '2018', 'ref_year_5': '2018',
        };
        draft.table_columns = [{
          Header: 'Kennziffer',
          accessor: 'Kennziffer',
          style: {textAlign: 'right'},
        },
        {
          Header: 'Name',
          accessor: 'Name',
          style: {textAlign: 'left'},
        },

        {
          Header: 'aggregierter Indikator',
          accessor: 'aggregierter Indikator',
          style: {textAlign: 'right'},
        },

        {
          Header:
          'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200 2009-12',
          accessor:
          'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200 2009-12',
          style: {textAlign: 'right'},
        },
        {
          Header: 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200 2010',
          accessor: 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200 2010',
          style: {textAlign: 'right'},
          Cell: (props) =>
            ((props.value !== null || props.value != '' )
           ? props.value
               .toString()
               .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'),
        },
        {
          Header: 'Erwerbstätigenprognose _ORIGINAL_200 2011-18',
          accessor: 'Erwerbstätigenprognose _ORIGINAL_200 2011-18',
          style: {textAlign: 'right'},
        },
        {
          Header: 'Infrastrukturindikator_ORIGINAL_200 2012',
          accessor: 'Infrastrukturindikator_ORIGINAL_200 2012',
          style: {textAlign: 'right'},
        },
        ];
      });

    case 'CHANGEVIEW':
      return produce(state, (draft) => {
        if (state.view_multiple) {
          draft.indikator_counter = 1;
          while (draft.indikators.length > 1) {
            draft.indikators.pop();
          }
        } else {
          draft.indikator_counter = 4;
          draft.indikators =
          ['Indikator 1', 'Indikator 2', 'Indikator 3', 'Indikator 4'];
        }
        draft.view_multiple = !state.view_multiple;
      });

    case 'LOADINGSTART':
      return produce(state, (draft) => {
        draft.loading = true;
      });


    case 'FIRSTLOADDONE':
      return produce(state, (draft) => {
        draft.firstload = false;
      });

    case 'UPDATECOLUMNS':
      return produce(state, (draft) => {
        while (draft.table_columns.length > 3) {
          draft.table_columns.pop();
        }
        for (let i = 0; i <= state.indikator_counter; i++) {
          const ColumnName = state.value_dic['var_name_' + i]
          + ' ' + state.value_dic['var_year_' +i];
          if (ColumnName in state.table_data[0]) {
            draft.table_columns.push({
              Header: ColumnName,
              accessor: ColumnName,
              style: {textAlign: 'right'},
              Cell: (props) => ((props.value !== undefined )
              ? (props.value
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : '-'),
            });
          }
        }
      });

    case 'UPDATEDATA':
      return produce(state, (draft) => {
        draft.indicator_data = [...action.data.indicator_data];
        draft.single_indic_data = [...action.data.single_indic_data];
        draft.table_data = [...action.data.table_data];
      });

    case 'MODAL':
      return produce(state, (draft) => {
        draft.show_modal = !state.show_modal;
      });

    case 'INFO':
      return produce(state, (draft) => {
        draft.showInfo = !state.showInfo;
      });

    case 'INCREMENTINDIKATOR':
      return produce(state, (draft) => {
        draft.indikator_counter = state.indikator_counter + 1;
        draft.indikators.push('Indikator' + ' ' + draft.indikator_counter);
      });

    case 'DECREMENTINDIKATOR':
      return produce(state, (draft) => {
        draft.indikator_counter = state.indikator_counter - 1;
        draft.indikators.pop();
      });

    case 'UPDATEVALDICYEARS':
      return produce(state, (draft) => {
        draft.value_dic['var_year_0'] = action.currentYears[0];
        draft.value_dic['var_year_1'] = action.currentYears[1];
        draft.value_dic['var_year_2'] = action.currentYears[2];
        draft.value_dic['var_year_3'] = action.currentYears[3];
        draft.value_dic['var_year_4'] = action.currentYears[4];
        draft.value_dic['var_year_5'] = action.currentYears[5];
      });

    case 'CHANGEVALUE':
      return produce(state, (draft) => {
        draft.value_dic[action.value1] = action.value2;
      });

    case 'CHANGE_NAME':
      return produce(state, (draft) => {
        draft.smalltable[0][1] = state.current_map[action.value]
            .properties.Name,
        draft.smalltable[1][1] = state.current_map[action.value]
            .properties.Kennziffer,
        draft.smalltable[2][1] = Math.round(state.current_map[action.value]
            .properties.Einwohner_2017)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        draft.smalltable[3][1] = state.current_map[action.value]
            .properties.area_km2
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        draft.smalltable[4][1] = state.current_map[action.value]
            .properties.Bundesland;
        draft.smalltable[5][1] =
        ((state.current_map[action.value].properties.indicator !== null
            || state.current_map[action.value].properties.indicator != '' )
            ? (Math.round(state.current_map[action.value]
                .properties.indicator *10) / 10)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-');
        while (draft.smalltable.length > 6) {
          draft.smalltable.pop();
        }
      });

    case 'SETMAPINSTORE':
      return produce(state, (draft) => {
        switch (action.map) {
          case 0:
            draft.kreise = [...action.value];
            break;
          case 1:
            draft.amr12 = [...action.value];
            draft.current_map = [...action.value];
            break;
          case 2:
            draft.amr15 = [...action.value];
            break;
          case 3:
            draft.amr20 = [...action.value];
            break;
          case 4:
            draft.ror = [...action.value];
            break;
          case 5:
            draft.bund = [...action.value];
            break;
        }
      });

    case 'CHANGEMAP':
      return produce(state, (draft) => {
        draft.count_map = action.value;
        switch (action.value) {
          case 0:
            draft.current_map = state.kreise;
            break;
          case 1:
            draft.current_map = state.amr12;
            break;
          case 2:
            draft.current_map = state.amr15;
            break;
          case 3:
            draft.current_map = state.amr20;
            break;
          case 4:
            draft.current_map = state.ror;
            break;
          case 5:
            draft.current_map = state.bund;
            break;
        }
      });

    case 'CHANGEVARS':
      return produce(state, (draft) => {
        const template = state.current_map;
        const value = (state.view_multiple ?
        state.indicator_data : state.single_indic_data);
        let i;
        for (i = 0; i < template.length; i++) {
          let j;
          for (j = 0; j < value[0].length; j++) {
            if (template[i].properties.Kennziffer == value[0][j]) {
              template[i].properties.indicator = value[1][j];
            }
          }
        }
        draft.current_map = [...template];
        draft.loading = false;
      });

    default:
      return state;
  }
}

export const store = createStore(reducer);
