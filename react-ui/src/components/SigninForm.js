import React, {Component} from 'react'
import './SigninForm.css'

class SigninForm extends Component {
	state = {
		email: '',
		password: ''
	}
	handleChange = (e) => {
		let inputName = e.target.name
		let value = e.target.value
		this.setState({
			[inputName]: value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state.email, this.state.password)
	}

	render() {
		return (
			<form className="signin-form" onSubmit={this.handleSubmit}>

				<div>
						<label>Email:</label>
						<input type="text" name="email" value={this.state.value} onChange={this.handleChange}/>
				</div>
				<div>
						<label>Password:</label>
						<input type="password" name="password" value={this.state.value} onChange={this.handleChange}/>
				</div>
				<div>
						<input type="submit" value="Submit"/>
				</div>
			</form>
		)
	}
}

export default SigninForm