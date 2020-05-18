import React from 'react'
import thunkMiddleware from 'redux-thunk'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import App from './App'
import rootReducer from './Redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'


const store = createStore(rootReducer, applyMiddleware (thunkMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <Router >
      {/* <App/> */}
      <Route path='/' component={App} />
  </Router>
  </Provider>,
  document.getElementById('root')
)