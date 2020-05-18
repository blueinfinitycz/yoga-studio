import {LOG_IN, LOG_OUT} from '../globalVariables'

const reducer = (state={isLogged:false}, action) => {
    switch (action.type) {
        // case LOG_IN :  return action.user.login === 'robertchytil@gmail.com' && action.user.pass === 'magician' ? {...state, isLogged: true } : {...state, isLogged: false}; break;
        default: return {...state}
    }
}

export default reducer