import {combineReducers} from 'redux'
import LoginReducer from './loginReducer'
import AppReducer from './appReducer'
import DashboardReducer from './dashboard' 
import MainMenuReducer from './menuReducer'
import EventsReducer from './eventsReducer'
import PrashadReducer from './prashadReducer'
import ContactsReducer from './contactsReducer'


const rootReducer = combineReducers({LoginReducer, AppReducer, MainMenuReducer, DashboardReducer, EventsReducer,PrashadReducer,ContactsReducer})
export default rootReducer