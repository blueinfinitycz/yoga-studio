import {PRASHAD} from '../globalVariables'

const reducer = (state, action) => {
    switch (action.type) {
        case PRASHAD  : return {...state, data: action.payload}; break;
        default: return {...state}
    }
}

export default reducer