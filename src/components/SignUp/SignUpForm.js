import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import * as ROUTES from '../../constants/routes'

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

class SignUpFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
     
        this.props.firebase
          .createUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
            this.setState({ ...INITIAL_STATE })
            this.props.history.push(ROUTES.HOME)
          })
          .catch(error => {
            this.setState({ error })
          })
     
        event.preventDefault();
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
          } = this.state

        // add email and password validation
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input name="username" value={username} onChange={this.onChange} type="text" placeholder="Full Name" />
                <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password" />
                <input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" />
                
                <button disabled={isInvalid} type="submit"> Sign Up </button>
        
                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase)

// const SignUpForm = withRouter(withFirebase(PasswordForgetFormBase))

export default SignUpForm