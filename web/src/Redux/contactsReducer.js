import {CONTACTS} from '../globalVariables'

const reducer = (state, action) => {
    switch (action.type) {
        case CONTACTS  : return {...state, data: action.payload}; break;
        default: return {...state}
    }
}

export default reducer