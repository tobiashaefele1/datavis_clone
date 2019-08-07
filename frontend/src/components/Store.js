import { createStore } from 'redux';
import produce from 'immer';
import * as json from "webpack/lib/JsonParser";



const initalState = {
	smalltable: [['Name', 'placeholder'], ['ID', 'placeholder'],['Einwohner (2017)', 'placeholder'],['Fläche km2', 'placeholder'], ['Bund', 'placeholder'], ['Rank', 'placeholder']],
	counter: 0,
	count_map: 0,
	current_map: [],
	kreise: [],
	amr12: [],
	amr15: [],
	amr20: [],
	bund: [],
	map_name: ['KRS_15', 'AMR_12', 'AMR_15', 'AMR_20', 'Bundesland_ID'],
	indikator_counter: 3,
	indikators: ['indikator1', 'indikator2', 'indikator3'],
	col_names_var: JSON.parse(context.col_names_var),
	col_names_ref: JSON.parse(context.col_names_ref),
	years_ref: JSON.parse(context.years_ref),
	years_var: JSON.parse(context.years_var),
	table_data: [],
	indicator_data: [],
	show_modal: false,
	value_dic: {
		'var_name_0': null, 'var_name_1': null, 'var_name_2': null, 'var_name_3': null, 'var_name_4': null,'var_name_5': null,
		'var_year_0': null, 'var_year_1': null, 'var_year_2': null, 'var_year_3': null, 'var_year_4': null, 'var_year_5': null,
		'weight_0': null, 'weight_1': null, 'weight_2': null, 'weight_3': null, 'weight_4': null, 'weight_5': null,
		'ref_name_0': null, 'ref_name_1': null, 'ref_name_2': null, 'ref_name_3': null, 'ref_name_4': null, 'ref_name_5': null,
		'ref_year_0': null, 'ref_year_1': null, 'ref_year_2': null, 'ref_year_3': null, 'ref_year_4': null, 'ref_year_5': null,
	},
	table_columns: [{
					Header: 'Kennziffer',
					accessor: 'Kennziffer'},
				{Header: 'Aggregated',
					accessor: 'selbstersteller_Indikator'}],
	loading: true
}



function reducer(state = initalState, action) {
	console.log('reducer', state, action);

	switch (action.type) {

		case 'LOADINGDONE':
			return produce(state, draft =>{
				draft.loading = false
			}
				
				)

		case 'UPDATECOLUMNS':
			return produce(state, draft =>{
				while(draft.table_columns.length > 2){
					draft.table_columns.pop()
				}
				for(let i = 0; i < state.indikator_counter; i++){
					let column_name = state.value_dic['var_name_' + i]+ " " + state.value_dic['var_year_' + i]
					console.log(column_name)
					if (column_name in state.table_data[0]) {
						draft.table_columns.push({ Header: column_name , accessor: column_name })
					}
				}				
				
			})

		case 'UPDATEDATA':
			return produce(state, draft =>{
				draft.table_data = [...action.data.table_data],
				draft.indicator_data = [...action.data.indicator_data]
				console.log(draft.table_data)
				console.log(draft.indicator_data)
			})

		case 'MODAL':
			return produce(state, draft =>{
				draft.show_modal = !state.show_modal
			})

		case 'INCREMENTINDIKATOR':
			return produce(state, draft =>{
				draft.indikator_counter = state.indikator_counter + 1
				draft.indikators.push('indikator' + draft.indikator_counter )
			}
			)
		case 'DECREMENTINDIKATOR':
			return produce(state, draft => {
				draft.indikator_counter = state.indikator_counter - 1
				draft.indikators.pop()
			}
			)

		case 'CHANGEVALUE':
			return produce(state, draft =>{
				console.log(state.value_dic)
				draft.value_dic[action.value1] = action.value2

			})


		case 'CHANGE_NAME':
			return produce(state, draft => {
				console.log(state.current_map)
				draft.smalltable[0][1] = state.current_map[action.value].properties.Name,
				draft.smalltable[1][1] = state.current_map[action.value].properties.Kennziffer,
				draft.smalltable[2][1] = state.current_map[action.value].properties.Einwohner_2017,
				draft.smalltable[3][1] = state.current_map[action.value].properties.area_km2,
				draft.smalltable[4][1] = state.current_map[action.value].properties.Bundesland
				while (draft.smalltable.length > 6){
					draft.smalltable.pop()
				}
				if(draft.smalltable.length < state.indikator_counter + 6){
					state.indikators.map((d, i) =>
						draft.smalltable.push([state.value_dic['var_name_'+ i], 'place'])
					)
				}
	
			
			})

		case 'SETMAPINSTORE':	

			return produce(state, draft => {
				
				switch(action.map){
					case 0:
						draft.kreise = [...action.value],
						draft.current_map = [...action.value]
						break;
					case 1:
						draft.amr12 = [...action.value];
						break;
					case 2:
						draft.amr15 = [...action.value];
						break;
					case 3:
						draft.amr20 = [...action.value];
						break;
					case 4:
						draft.bund = [...action.value];
						break;	
				}
			}
				)
		case 'CHANGEMAP':
			return produce(state, draft =>{
				draft.count_map = action.value
				switch (action.value) {
				case 0:
					draft.current_map = state.kreise
					break;
				case 1:
						draft.current_map = state.amr12
					break;
				case 2:
						draft.current_map = state.amr15
					break;
				case 3:
						draft.current_map = state.amr20
					break;
				case 4:
						draft.current_map = state.bund
					break;
			}
		}
				)

		// insertion Tobias: load map here with indicators
		case 'CHANGEVARS':
			return product(state, draft => {

				// draft.current_map = valuevaluevalefromfunction

				}
			)


		default:
			return state;
	}

}


export const store = createStore(reducer);


