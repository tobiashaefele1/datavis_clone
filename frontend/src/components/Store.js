import {createStore} from 'redux';
import produce from 'immer';

console.log(context);

const initalState = {
  smalltable: [['Name', 'placeholder'],
    ['ID', 'placeholder'],
    ['Einwohner (2017)', 'placeholder'],
    ['Fläche (km2)', 'placeholder'],
    ['Bundesland', 'placeholder'],
    ['Angezeigter Wert', 'placeholder']],

  currentScale: 0,
  scaleOptions: [0,1,2],

  current_color: ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'],
  color_options: [['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'],
    ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
    ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c']],
  counter: 0,
  count_map: 1,
  current_map: [], // what needs to be changed in here?
  kreise: [],
  amr12: [],
  amr15: [],
  amr20: [],
  ror: [],
  bund: [],
  map_name: ['KRS_15', 'AMR_12', 'AMR_15', 'AMR_20', 'ROR11', 'Bundesland_ID'],
  indikator_counter: 4,
  indikators: ['indikator 1', 'indikator 2', 'indikator 3', 'indikator 4'],
  col_names_var: JSON.parse(context.col_names_var),
  col_names_ref: JSON.parse(context.col_names_ref),
  years_ref: JSON.parse(context.years_ref),
  showTable: false,
  indicator_data: JSON.parse(context.indicator_data),
  single_indic_data: JSON.parse(context.single_indic_data),
  table_data: JSON.parse(context.table_data),
  // metadata: JSON.parse(context.metadata.replace(/'/g, '"')),
  metadata: JSON.parse((context.metadata.replace(/(\r\n|\n|\r)/gm,""))),
    all_years: JSON.parse(context.all_years),


  show_modal: false,
  showInfo: false,
  value_dic: {
    'var_name_0': 'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200',
    'var_name_1': 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200',
    'var_name_2': 'Erwerbstätigenprognose _ORIGINAL_200',
    'var_name_3': 'Infrastrukturindikator_ORIGINAL_200',
    'var_name_4': null,
    'var_name_5': null,
    'var_year_0': '2009-12', 'var_year_1': '2010', 'var_year_2': '2011-18', 'var_year_3': '2012',
    'var_year_4': null, 'var_year_5': null,
    'weight_0': 45, 'weight_1': 40, 'weight_2': 7.5, 'weight_3': 7.5,
    'weight_4': 0, 'weight_5': 0,
    'ref_name_0': 'Erwerbspersonen gesamt_100', 'ref_name_1': 'Erwerbstätige gesamt_100',
    'ref_name_2': 'Erwerbstätige gesamt_100',
    'ref_name_3': 'Erwerbstätige gesamt_100',
    'ref_name_4': 'Erwerbstätige gesamt_100', 'ref_name_5': 'Erwerbstätige gesamt_100',
    'ref_year_0': '2011', 'ref_year_1': '2011', 'ref_year_2': '2012', 'ref_year_3': '2012',
    'ref_year_4': 2012, 'ref_year_5': 2012,
  },
  table_columns: [{
    Header: 'Kennziffer',
    accessor: 'Kennziffer',
  },
  {
    Header: 'Aggregated',
    accessor: 'selbstersteller_Indikator',
  },
  {
    Header: 'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200 2009-12',
    accessor: 'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200 2009-12',
  },
{
    Header: 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200 2010',
    accessor: 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200 2010',
  },
{
    Header: 'Erwerbstätigenprognose _ORIGINAL_200 2011-18',
    accessor: 'Erwerbstätigenprognose _ORIGINAL_200 2011-18',
  },
{
    Header: 'Infrastrukturindikator_ORIGINAL_200 2012',
    accessor: 'Infrastrukturindikator_ORIGINAL_200 2012',
  },

  ],
  loading: false,
  firstload: true,
  var_year_data: JSON.parse(context.var_year_data),

    // THIS IS THE ORIGINAL THAT USED TO WORK STATICALLY; ABOVE IS DERIVING THESE VALUES FROM CONTEXT; TOO
  // var_year_data: {'var_year_0': [], 'var_year_1': [], 'var_year_2': [],
  //   'var_year_3': [], 'var_year_4': [], 'var_year_5': []},
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
  console.log('reducer', state, action);
  console.log(action.value);
  console.log(action.data)

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
        switch(action.value){
          case '0':
            draft.currentScale = state.scaleOptions[0];
            break;
          case '1':
            draft.currentScale = state.scaleOptions[1]
            break;
          case '2':
            draft.currentScale = state.scaleOptions[2];
            break;
          }

      })

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
			draft.indikators = ['indikator 1', 'indikator 2', 'indikator 3', 'indikator 4'];
			draft.current_map = state.amr12;
			draft.count_map = 1;
			draft.view_multiple = true;
			draft.table_data = JSON.parse(context.table_data)
			draft.value_dic = {
								'var_name_0': 'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200',
								'var_name_1': 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200',
								'var_name_2': 'Erwerbstätigenprognose _ORIGINAL_200',
								'var_name_3': 'Infrastrukturindikator_ORIGINAL_200',
								'var_name_4': null,
								'var_name_5': null,
								'var_year_0': '2009-12', 'var_year_1': '2010', 'var_year_2': '2011-18', 'var_year_3': '2012',
								'var_year_4': null, 'var_year_5': null,
								'weight_0': 45, 'weight_1': 40, 'weight_2': 7.5, 'weight_3': 7.5,
								'weight_4': null, 'weight_5': null,
								'ref_name_0': 'Erwerbspersonen gesamt_100', 'ref_name_1': 'Erwerbstätige gesamt_100',
								'ref_name_2': 'Erwerbstätige gesamt_100',
								'ref_name_3': 'Erwerbstätige gesamt_100',
								'ref_name_4': null, 'ref_name_5': null,
								'ref_year_0': '2011', 'ref_year_1': '2011', 'ref_year_2': '2012', 'ref_year_3': '2012',
								'ref_year_4': null, 'ref_year_5': null,
								 }
			draft.table_columns = [{
									Header: 'Kennziffer',
									accessor: 'Kennziffer',
								},
								{
									Header: 'Aggregated',
									accessor: 'selbstersteller_Indikator',
								},
								{
									Header: 'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200 2009-12',
									accessor: 'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200 2009-12',
								},
								{
									Header: 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200 2010',
									accessor: 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200 2010',
								},
								{
									Header: 'Erwerbstätigenprognose _ORIGINAL_200 2011-18',
									accessor: 'Erwerbstätigenprognose _ORIGINAL_200 2011-18',
								},
								{
									Header: 'Infrastrukturindikator_ORIGINAL_200 2012',
									accessor: 'Infrastrukturindikator_ORIGINAL_200 2012',
								},

								]
		})  


    case 'CHANGEVIEW':
      return produce(state, (draft) => {
		  if(state.view_multiple){
			draft.indikator_counter = 1;
			while (draft.indikators.length > 1) {
			draft.indikators.pop();
			}
		}else{
			draft.indikator_counter = 4;
			draft.indikators = ['indikator 1', 'indikator 2', 'indikator 3', 'indikator 4'];
		}
        draft.view_multiple = !state.view_multiple;
      });

    case 'LOADINGCHANGE':
      return produce(state, (draft) => {
		draft.loading = !state.loading;
		console.log(draft.loading)
      }

	  );
	case 'FIRSTLOADDONE':
      return produce(state, (draft) => {
        draft.firstload = false;
      }

      );

    case 'UPDATECOLUMNS':
      return produce(state, (draft) => {
          console.log(state.table_data);
        while (draft.table_columns.length > 2) {
          draft.table_columns.pop();
        }
        for (let i = 0; i <= state.indikator_counter; i++) {
          const ColumnName = state.value_dic['var_name_' + i]
          + ' ' + state.value_dic['var_year_' +i];
          console.log(ColumnName)
          if (ColumnName in state.table_data[0]) {
            draft.table_columns.push({
              Header: ColumnName, accessor: ColumnName});
          }
        }
      });

    case 'UPDATEDATA':
      return produce(state, (draft) => {
        draft.indicator_data = [...action.data.indicator_data];
        draft.var_year_data = action.data.var_year_data;
        draft.single_indic_data = [...action.data.single_indic_data];
        draft.table_data = [...action.data.table_data];

      });

    case 'MODAL':
      return produce(state, (draft) => {
        draft.show_modal = !state.show_modal;
      });


      case 'INFO':
          return produce(state, (draft) => {
              draft.showInfo  = !state.showInfo;
      });

    case 'INCREMENTINDIKATOR':
      return produce(state, (draft) => {
        draft.indikator_counter = state.indikator_counter + 1;
        draft.indikators.push('indikator' + " " + draft.indikator_counter);
      }
      );
    case 'DECREMENTINDIKATOR':
      return produce(state, (draft) => {
        draft.indikator_counter = state.indikator_counter - 1;
        draft.indikators.pop();
      }
      );

    case 'CHANGEVALUE':
      return produce(state, (draft) => {
        console.log(state.value_dic);
        draft.value_dic[action.value1] = action.value2;
      });


    case 'CHANGE_NAME':
      return produce(state, (draft) => {
        console.log(state.current_map);
        draft.smalltable[0][1] = state.current_map[action.value]
            .properties.Name,
        draft.smalltable[1][1] = state.current_map[action.value]
            .properties.Kennziffer,
        draft.smalltable[2][1] = state.current_map[action.value]
            .properties.Einwohner_2017,
        draft.smalltable[3][1] = state.current_map[action.value]
            .properties.area_km2,
        draft.smalltable[4][1] = state.current_map[action.value]
			.properties.Bundesland;
		draft.smalltable[5][1] = state.current_map[action.value].properties.indicator	
        while (draft.smalltable.length > 6) {
          draft.smalltable.pop();
        }
        // if (draft.smalltable.length < state.indikator_counter + 6) {
        //   state.indikators.map((d, i) =>
        //     draft.smalltable.push([state.value_dic['var_name_' + i], '-'])
        //       // #TODO: Daten von Indikator in Tabelle einfügen
        //   );
        // }
      });

    case 'SETMAPINSTORE':
      return produce(state, (draft) => {
        switch (action.map) {
          case 0:
            draft.kreise = [...action.value]
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
      }
      );
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
      }
      );

      // insertion Tobias: load map here with indicators
    case 'CHANGEVARS':
		console.log('CHANGEVARS HEREEE')
      return produce(state, (draft) => {
		 const template = state.current_map;
       
      const value = (state.view_multiple ?
        state.indicator_data : state.single_indic_data);
      // console.log(value);

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
      }
      );

    default:
      return state;
  }
}


export const store = createStore(reducer);




// TOBIAS BOTTOM HARDCODED LIST OF INITIAL VALUES FOR VALUE DICT - does seem to throw an error
//   value_dic: {
//     'var_name_0': 'Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200',
//     'var_name_1': 'Lohn pro Beschäftigtem 2010 _ORIGINAL_200',
//     'var_name_2': 'Erwerbstätigenprognose _ORIGINAL_200',
//     'var_name_3': 'Infrastrukturindikator_ORIGINAL_200',
//     'var_name_4': null,
//     'var_name_5': null,
//     'var_year_0': '2009-12', 'var_year_1': '2010', 'var_year_2': '2011-18', 'var_year_3': '2012',
//     'var_year_4': null, 'var_year_5': null,
//     'weight_0': 45, 'weight_1': 40, 'weight_2': 7.5, 'weight_3': 7.5,
//     'weight_4': null, 'weight_5': null,
//     'ref_name_0': 'Erwerbspersonen gesamt_100', 'ref_name_1': 'Erwerbstätige gesamt_100',
//     'ref_name_2': 'Erwerbstätige gesamt_100',
//     'ref_name_3': 'Erwerbstätige gesamt_100',
//     'ref_name_4': null, 'ref_name_5': null,
//     'ref_year_0': '2011', 'ref_year_1': '2011', 'ref_year_2': '2012', 'ref_year_3': '2012',
//     'ref_year_4': null, 'ref_year_5': null,
//   },