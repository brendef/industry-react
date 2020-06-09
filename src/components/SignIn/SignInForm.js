import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import * as ROUTES from '../../constants/routes'

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

class SignInFormBase extends Component {
    constructor(props) {
      super(props);
   
      this.state = { ...INITIAL_STATE };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        const { email, password } = this.state
        
        this.props.firebase
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push(ROUTES.HOME)
            })
            .catch( error => {
                this.setState({ error })
            })
        event.preventDefault()
    }

    render() {
        const { email, password, error } = this.state
        // check for email
        const isInvalid = password === '' || email === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
                <button disabled={isInvalid} type="submit"> Sign In </button>
        
                {error && <p>{error.message}</p>}
            </form>
        )
    }

}

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase)

export default SignInForm