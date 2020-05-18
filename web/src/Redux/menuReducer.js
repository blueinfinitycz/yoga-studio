import {MAIN_MENU} from '../globalVariables'

const reducer = (state, action) => {
    if(action.type === MAIN_MENU){
        return {...state, data: action.payload}
    }

    return {...state}
}

export default reducer