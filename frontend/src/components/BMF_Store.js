import {action, createStore} from "easy-peasy";

export const store = createStore({
    map: {
        current_map: 0,

        change_map: action((state, payload) =>{
            state.current_map = payload;
        })
    }
})
