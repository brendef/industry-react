import React, { Component } from 'react'
import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props)
 
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { passwordOne } = this.state
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })
 
    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name] : event.target.value })
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state
    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''
    
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="InputPassword">Password</label>
          <input id="InputPassword" className="form-control mb-2" name="passwordOne" value={ passwordOne } onChange={ this.onChange } type="password" placeholder="New Password" />
          <label htmlFor="InputConfirmPassword">Confirm Password</label>
          <input id="InputConfirmPassword" className="form-control mb-2" name="passwordTwo" value={ passwordTwo } onChange={ this.onChange } type="password" placeholder="Confirm New Password" />
          <div className="text-right">
            <button className="btn btn-outline-dark" disabled={isInvalid} type="submit"> Change My Password </button>
          </div>
          { error && <p>{error.message}</p> }
        </div>
      </form>
    )
  }
}

export default withFirebase(PasswordChangeForm)