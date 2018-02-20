import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import authR from './authR'

export default combineReducers({
	auth: authR,
	router: routerReducer
})