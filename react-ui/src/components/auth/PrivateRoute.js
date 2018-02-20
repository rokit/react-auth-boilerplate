import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

import SignInForm from '../SigninForm'
export const PrivateRoute = ({component: ComposedComponent, ...rest}) => {

  class Authentication extends Component {

		// return signinform if not authenticated; otherwise, return the component imputted into <PrivateRoute />
    handleRender = (props) => {
      if (!this.props.isAuthenticated) {
        return <SignInForm />
      } else {
        return <ComposedComponent {...props}/>
      }
    }

    render() {
      return (
        <Route {...rest} render={this.handleRender}/>
      )
    }
  }

  function mapStateToProps(state) {
    return {isAuthenticated: state.auth.get('isAuthenticated')};
  }

  const AuthenticationContainer = connect(mapStateToProps)(Authentication)
  return <AuthenticationContainer/>
}