import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getAuthenticatedUser } from '../redux/actions'

class Protected extends Component {

	render() {
		let id = this.props.id
		return (
			<div>
				<h1>Protected</h1>
				<p>Hello, {this.props.username}. Your ID is: {id ? id : "Sign in to see your ID."}</p>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	// the name "counterReducer" comes from the name of our reducer in 'reducers/index.js'
	return {
		username: state.auth.get('username'),
		id: state.auth.get('id')
	}
}

const mapDispatchToProps = {
	getAuthenticatedUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Protected)