import { fromJS } from 'immutable'

import {
	REQUEST_SIGNIN,
	SET_AUTHENTICATED,
	SET_AUTHENTICATION_ERROR
} from '../actions/authA'

var initialState = {
	requesting: false,
	username: 'Guest',
	id: null,
	error: null,
	isAuthenticated: false
}

var immutableState = fromJS(initialState)

const authR = (state = immutableState, action) => {
	switch(action.type) {
		case REQUEST_SIGNIN: {
			return state.set('requesting', true)
		}
		case SET_AUTHENTICATED: {
			// state = state.set('username', action.payload)
			// state = state.set('requesting', false)
			state = state.set('isAuthenticated', action.payload.bAuthenticated)
			state = state.set('username', action.payload.username)
			state = state.set('id', action.payload.id)
			return state
		}
		case SET_AUTHENTICATION_ERROR: {
			state = state.set('isAuthenticated', action.payload.bAuthenticated)
			state = state.set('error', action.payload.error)
			return state
		}
		default: {
			return state
		}
	}
}

export default authR