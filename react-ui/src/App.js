import React, { Component } from 'react'
import './App.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './redux/actions'

import {
	Switch,
	Route
} from 'react-router-dom'

import { PrivateRoute } from './components/auth/PrivateRoute'

import Home from './containers/Home'
import About from './containers/About'
import Protected from './containers/Secret'
import NotFound from './containers/NotFound'

import Header from './components/Header'
import SigninForm from './components/SigninForm'
import SignupForm from './components/SignupForm'

import diamondPattern from './images/diamondPattern.svg'

class App extends Component {

	componentWillMount() {
		const token = localStorage.getItem('SagaToken')
		if (token) {
			this.props.getAuthenticatedUser()
		}		
	}

	handleSignupSubmit = (email, username, password) => {
		this.props.attemptSignup(email, username, password).then(this.goToProtected)
	}
	goToProtected = () => {
		this.props.history.push('/protected')
	}
  render() {
		let backgroundStyle = {
			backgroundImage: `url(${diamondPattern})`
		}

    return (
				<div className="app" style={backgroundStyle}>
					<Header username={this.props.username}/>
					<div className="content">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/about" component={About} />

							<PrivateRoute path="/protected" component={Protected} />

							<Route path="/signup" render={()=>
								<SignupForm onSubmit={this.handleSignupSubmit} />} />

							<Route path="/signin" render={()=>
								<SigninForm />} />

							<Route component={NotFound} />
						</Switch>
					</div>
				</div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		router: state.router,
		username: state.auth.get('username')
	}
}

function mapDispatchToProps(dispatch, ownProps) {
	return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)