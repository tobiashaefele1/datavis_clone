import { createStore } from 'redux';
import produce from 'immer';
import * as json from "webpack/lib/JsonParser";



const initalState = {
	smalltable: [['Name', 'placeholder'], ['ID', 'placeholder'], ['Bund', 'placeholder'], ['Value', 'placeholder'], ['Rank', 'placeholder']],
	counter: 0,
	count_map: 0,
	current_map: [],
	kreise: [],
	amr12: [],
	amr15: [],
	amr20: [],
	bund: [],
	indikator_counter: 3,
	indikators: ['indikator1', 'indikator2', 'indikator3'],
	//insertion tobias - empty state for indicator_map
	indicator_map: [],
	indikators: ['indikator1', 'indikator2', 'indikator3'],
	col_names_var: JSON.parse(context.col_names_var),
	col_names_ref: JSON.parse(context.col_names_ref),
	years_ref: JSON.parse(context.years_ref),
	years_var: JSON.parse(context.years_var),
	table_data: JSON.parse(context.table_data),
	indicator_data: JSON.parse(context.indicator_data),
	value_dic: {
		'var_name_1': null,
		'var_name_2': null,
		'var_name_3': null,
		'var_name_4': null,
		'var_name_5': null,

		'var_year_1': null,
		'var_year_2': null,
		'var_year_3': null,
		'var_year_4': null,
		'var_year_5': null,

		'weight_1': null,
		'weight_2': null,
		'weight_3': null,
		'weight_4': null,
		'weight_5': null,

		'ref_name_1': null,
		'ref_name_2': null,
		'ref_name_3': null,
		'ref_name_4': null,
		'ref_name_5': null,

		'ref_year_1': null,
		'ref_year_2': null,
		'ref_year_3': null,
		'ref_year_4': null,
		'ref_year_5': null,

	}
}



function reducer(state = initalState, action) {
	console.log('reducer', state, action);

	switch (action.type) {

		case 'CHANGEVALUE':
			return produce(state, draft =>{
				console.log(state.value_dic)
				draft.value_dic[action.value1] = action.value2

			})


		case 'CHANGE_NAME':
			return produce(state, draft => {
				console.log(state.current_map)
				draft.smalltable[0][1] = state.current_map[action.value].properties.NAME_2,
				draft.smalltable[1][1] = state.current_map[action.value].properties.CC_2,
				draft.smalltable[2][1] = state.current_map[action.value].properties.NAME_1
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

					draft.current_map.properties['indicator'] = state.indicator_map
				}
			)


		default:
			return state;
	}

}


export const store = createStore(reducer);


