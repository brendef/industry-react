import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import * as ROUTES from '../../constants/routes'

import './SignInForm.css'

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
                <h1>SIGN IN</h1>
                <div className="form-group">
                    <label htmlFor="InputEmail">Email address</label>
                    <input id="InputEmail" className="form-control mb-2" name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                    <label htmlFor="InputPassword">Password</label>
                    <input id="InputPassword" className="form-control mb-2" name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
                    <div className="text-right">
                        <button className="btn btn-outline-dark" disabled={isInvalid} type="submit"> Sign In </button>
                    </div>
            
                    {error && <p>{error.message}</p>}
                </div>
            </form>
        )

        // return (
        //     <form className="signinform" onSubmit={this.onSubmit}>
        //         <div className="inputs">
        //             <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
        //             <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
        //         </div>
        //         <button className="signin-button" disabled={isInvalid} type="submit"> Sign In </button>
        
        //         {error && <p>{error.message}</p>}
        //     </form>
        // )
    }

}

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase)

export default SignInForm