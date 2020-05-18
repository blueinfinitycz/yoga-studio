import {EVENTS} from '../globalVariables'

const reducer = (state, action) => {
    switch (action.type) {
        case EVENTS  : return {...state, data: action.payload}; break;
        default: return {...state}
    }
}

export default reducer