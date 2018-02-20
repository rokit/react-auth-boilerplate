import axios from 'axios'
import { push } from 'react-router-redux'
// import qs from 'qs'	

export const REQUEST_SIGNIN = 'REQUEST_SIGNIN'
function requestSignin() {
  return {
    type: REQUEST_SIGNIN
  }
}

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP'
function requestSignup() {
  return {
    type: REQUEST_SIGNUP
  }
}

export const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
export const setAuthenticated = (value, username, id) => {
  return {
    type: SET_AUTHENTICATED,
		payload: {
			bAuthenticated: value,
			username: username,
			id: id,
		}
  }
}

export const SET_AUTHENTICATION_ERROR = 'SET_AUTHENTICATION_ERROR'
export const setAuthenticationError = (error) => {
  return {
    type: SET_AUTHENTICATION_ERROR,
		payload: {
			bAuthenticated: false,
			error: error
		}
  }
}

// https://github.com/axios/axios/issues/587 - withCredentials
export const attemptSignin = (email, password) => dispatch => {
	dispatch(requestSignin())
	return axios.post(`/signin`, {
		email: email,
		password: password
	},
	{ withCredentials: true })
	.then(
		response => {
			localStorage.setItem('SagaToken', response.data.token)			
			dispatch(setAuthenticated(true, response.data.name, response.data.id))
			dispatch(push('/protected'))
		},
		error => {
			console.log('Authorization Error.', error.response)
			dispatch(setAuthenticationError(error.response.data))			
		}
	)
}

export const attemptSignup = (email, username, password) => dispatch => {
	dispatch(requestSignup())
	return axios.post(`/signup`, {
		email: email,
		username: username,
		password: password,
		passwordConfirmation: password
	},
	{ withCredentials: true })
	.then(
		response => {
			// console.log('authA signup', response)
			localStorage.setItem('SagaToken', response.data.token)
			dispatch(setAuthenticated(true, response.data.name, response.data.id))
		},
		error => {
			console.log('Auth error.', error.response.data.error)
			dispatch(setAuthenticationError(error.response.data.error))			
		}
	)
}

export const signout = () => dispatch => {
	localStorage.removeItem('SagaToken')
	dispatch(setAuthenticated(false, "Guest", null))
}

export const getAuthenticatedUser = () => dispatch => {
	axios.get('/get-user', {
		headers: {token: localStorage.getItem('SagaToken')}
	})
	.then(
		response => {
			dispatch(setAuthenticated(true, response.data.username, response.data.id));
		},
		error => {
			console.log('Auth error.', error.response.data.error)
		}
	)
}