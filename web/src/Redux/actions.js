import {
    REQUEST_START,
    REQUEST_SUCCESS,
    REQUEST_ERROR,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILURE,
    LOGOUT_REQUEST_FAILURE,
    DASHBOARD,
    MAIN_MENU,
    EVENTS,
    PRASHAD,
    CONTACTS
} from  '../globalVariables'

import axios from 'axios'


export const loginAct = (data) => {
    console.log('LOGN:', data)
    return dispatch => {
        dispatch(requestStart())
        axios.post('/login',{
            login: data.login,
            pass: data.pass
        })
        .then(res =>{console.log('LOGIN RES: ',res); dispatch(requestSuccess(res)); dispatch(loginRequestSuccess(res))})
        .catch(error => {dispatch(requestError()); dispatch(loginRequestFailure(error))})
    }
}

export const logoutAct = () => {
    return dispatch => {
        dispatch(requestStart())
        axios.post('/logout')
        .then(res => {dispatch(requestSuccess(res));dispatch(logoutRequestSuccess(res))})
        .catch(error => {dispatch(requestError()); dispatch(logoutRequestFailure(error))})
    }
}

export const getData = (url) => {
    return dispatch => {
        dispatch(requestStart())
        axios.post(url)
        .then(res => {
            dispatch(requestSuccess(res));
            switch(url){
                case '/getMainMenuData' : dispatch(mainMenuReq(res.data)); break;
                case '/getDashboardData' : dispatch(dashboardReq(res.data)); break;
                case '/getEventsData' : dispatch(eventsReq(res.data)); break;
                case  '/getPrashadData' : dispatch(prashadReq(res.data)); break;
                case  '/getContactsData' : dispatch(contactsReq(res.data)); break;
            }
        })
        .catch(error =>{dispatch(requestError(error))})
    }
}

export const crudOperation = (url,urlAllData,data) => {
    return dispatch => {
        dispatch(requestStart())
        axios.post(url,{data: JSON.stringify(data)})
        .then(res => dispatch(getData(urlAllData)))
        .catch(error =>{dispatch(requestError(error))})
    }
}

export const loadFile = (url,urlAllData,data) => {
    return dispatch => {
        dispatch(requestStart())
        axios.post(url,{data: JSON.stringify(data)})
        .then(res => dispatch(getData(urlAllData)))
        .catch(error =>{dispatch(requestError(error))})
    }
}


const requestStart = (data) => ({type: REQUEST_START, ...data})
const requestSuccess = (data) => ({type: REQUEST_SUCCESS, ...data})
const requestError = (data) => ({type: REQUEST_ERROR, ...data})

const loginRequestSuccess = (data) =>({type: LOGIN_REQUEST_SUCCESS, payload: data})
const logoutRequestSuccess = (data) =>({type: LOGOUT_REQUEST_SUCCESS, payload: data})
const loginRequestFailure = (error) => ({type: LOGIN_REQUEST_FAILURE, payload: error})
const logoutRequestFailure = (error) => ({type: LOGOUT_REQUEST_FAILURE, payload: error})

const mainMenuReq = data => ({type:MAIN_MENU, payload: data})
const dashboardReq = data => ({type: DASHBOARD, payload: data})
const eventsReq = data => ({type:EVENTS, payload: data})
const prashadReq = data => ({type:PRASHAD, payload: data})
const contactsReq = data => ({type:CONTACTS, payload:data})