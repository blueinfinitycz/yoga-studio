import {REQUEST_START,REQUEST_SUCCESS, REQUEST_ERROR} from '../globalVariables'

const init = {
    isLoading: 0,
    isLogged:  0,
    error: 0,
}

const reducer = (state=init, action) => {
    switch (action.type) {
        case REQUEST_START : return {...state, isLoading: 1}; break;
        case REQUEST_SUCCESS : return {...state, isLoading: 0, isLogged: action.data.isLogged}; break;
        case REQUEST_ERROR : return {...state, isLoading: 0, isLogged: 0, error: 1}; break;
        default: return {...state}
    }  
}

export default reducer