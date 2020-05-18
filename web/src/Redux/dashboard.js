import {DASHBOARD} from '../globalVariables'

const reducer = (state, action) => {
    switch (action.type) {
        case DASHBOARD  : return {...state, data: action.payload}; break;
        default: return {...state}
    }
}

export default reducer