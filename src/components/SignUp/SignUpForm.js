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
            return this.props.firebase
              .user(authUser.user.uid)
              .set({
                username,
                email
              })
          })
          .then(() => {
            this.props.firebase.setDisplayName(username)
            this.props.firebase.setDefaultProfilePicture()
          })
          // .then(() => {
            
          // })
          .then(() => {
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
              <h1>SIGN UP</h1>
              <div className="form-group">
                <label htmlFor="InputFullName">Full Name</label>
                <input id="InputFullName" className="form-control mb-2"  name="username" value={username} onChange={this.onChange} type="text" placeholder="Full Name" />
                
                <label htmlFor="InputEmail">Email Address</label>
                <input id="InputEmail"  className="form-control mb-2" name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                
                <label htmlFor="InputPassword">Password</label>
                <input id="InputPassword" className="form-control mb-2" name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password" />
                
                <label htmlFor="InputConfirmPassword">Confirm Password</label>
                <input id="InputConfirmPassword" className="form-control mb-2" name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" />
                
                <div className="text-right">
                  <button className="btn btn-outline-dark" disabled={isInvalid} type="submit"> Sign Up </button>
                </div>
        
                {error && <p>{error.message}</p>}
              </div>
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