import { createStore } from 'redux';

const initalState = {
	smalltable: [['Name', 'placeholder'], ['ID', 'placeholder'], ['Bund', 'placeholder'], ['Value', 'placeholder'], ['Rank', 'placeholder']]
}

function reducer(state = initalState, action) {
	console.log('reducer', state, action);
	return state;
}

export const store = createStore(reducer);
