import React, {Component} from 'react'
import { connect } from 'react-redux'
import { signout } from '../redux/actions'
import { NavLink } from 'react-router-dom'
import './Header.css'

import gear from '../images/shield.svg'
import threeBars from '../images/threeBars.svg'

class Header extends Component {
	state = {
		bMenuOpen: false,
		mode: "mobile"
	}

	componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
	}
	
	updateDimensions = () => {
		if(window.innerWidth >= 740) {
			this.setState({
				mode: "desktop",
				bMenuOpen: true
			})
		}
		else {
			this.setState({
				mode: "mobile",				
				bMenuOpen: false
			})
		}
	}

	onHamburgerClick = () => {
		this.setState({
			bMenuOpen: !this.state.bMenuOpen
		})
	}

	onSignoutClick = () => {
		this.onNavItemClick()
		this.props.signout()
	}

	onNavItemClick = () => {
		if (this.state.mode === "mobile") {
			this.setState({
				bMenuOpen: false
			})
		}
	}
	oddEvent = (loc) => {
		console.log(loc)
	}
	render() {
		return (
			<header className="main-header">

				<div className="app-header">
					<img src={gear} className="app-logo" alt="fancy logo" />
					<h1 className="app-name">Authentication App</h1>
					<img onClick={this.onHamburgerClick} className="hamburger" src={threeBars} alt="navigation menu button" />

					{this.state.bMenuOpen &&
					<div className="signs">
						<span className="app-username">Welcome, {this.props.username}.</span>

						{!this.props.isAuthenticated &&
						<NavLink onClick={this.onNavItemClick} to="/signin" activeClassName="active"><span>SIGN IN</span></NavLink>}

						{this.props.isAuthenticated &&
						<a className="signout" onClick={this.onSignoutClick}><span>Sign Out</span></a>}

						{!this.props.isAuthenticated &&
						<NavLink onClick={this.onNavItemClick} to="/signup" activeClassName="active"><span>SIGN UP</span></NavLink>}
					</div>}
				</div>

				{this.state.bMenuOpen &&
				<nav className="main-nav">
					<NavLink onClick={this.onNavItemClick} exact to="/" activeClassName="active"><span>Home</span></NavLink>
					<NavLink onClick={this.onNavItemClick} to="/about" activeClassName="active"><span>About</span></NavLink>
					<NavLink onClick={this.onNavItemClick} to="/protected" activeClassName="active"><span>Protected URL</span></NavLink>
				</nav>}
			</header>
		)
	}
	componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
	}
}

const mapStateToProps = (state) => {
	return {
		router: state.router,
		isAuthenticated: state.auth.get('isAuthenticated')
	}
}

const mapDispatchToProps = {
  signout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)