import React, { Component } from 'react'
import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
    email: '',
    error: null,
  }
   
class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        const { email } = this.state;
     
        this.props.firebase.passwordReset(email)
            .then(() => { this.setState({ ...INITIAL_STATE }); })
            .catch(error => {
                this.setState({ error });
            })
     
        event.preventDefault();
      }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const { email, error } = this.state
     
        // Add email validation
        const isInvalid = email === ''
     
        return (
          <form onSubmit = { this.onSubmit }>
            <div className="form-group">
              <label htmlFor="InputEmail">Email address</label>
              <input id="InputEmail" className="form-control mb-2" name="email" value={ this.state.email } onChange={ this.onChange } type="text" placeholder="Email Address" />
              <div className="text-right">
                <button className="btn btn-outline-dark" disabled={isInvalid} type="submit"> Reset My Password </button>
              </div>
      
              { error && <p> { error.message } </p> }
            </div>
          </form>
        )
    }
}

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)
export default PasswordForgetForm