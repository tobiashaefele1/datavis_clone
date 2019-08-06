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
	col_names_var: JSON.parse(context.col_names_var),
	col_names_ref: JSON.parse(context.col_names_ref),
	years_ref: JSON.parse(context.years_ref),
	years_var: JSON.parse(context.years_var),
	table_data: JSON.parse(context.table_data),
	indicator_data: JSON.parse(context.indicator_data) 
}



function reducer(state = initalState, action) {
	console.log('reducer', state, action);

	switch (action.type) {

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
		
		default:
			return state;
	}

}


export const store = createStore(reducer);


