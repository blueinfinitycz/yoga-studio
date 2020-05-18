import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAILURE, LOGOUT_REQUEST_SUCCESS, LOGOUT_REQUEST_FAILURE} from '../globalVariables'

const reducer = (state={type:LOGIN_REQUEST, isLogged:null, data: {data:{user: ''}}}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST_SUCCESS  : return {...state, isLogged: action.payload.data.isLogged, data: action.payload, user: action.payload.data.user}; break;
        case LOGOUT_REQUEST_SUCCESS:  return {...state, isLogged: 0}; break;
        case LOGIN_REQUEST_FAILURE || LOGOUT_REQUEST_FAILURE:  return {...state, isLogged: 0}; break;
        default: return {...state}
    }
}

export default reducer