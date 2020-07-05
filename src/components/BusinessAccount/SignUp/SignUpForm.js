import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../../Firebase'
import { compose } from 'recompose'

import getMonthName from '../../appFunctions'

import * as ROUTES from '../../../constants/routes'


const INITIAL_STATE = {
    fullname: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    companyName : '',
    profession : 'Select a profession'
}

class BusinessSignUpFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        const { fullname, email, passwordOne, profession } = this.state;
        const date = new Date()
        this.props.firebase
          .createUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
            return this.props.firebase
              .user(authUser.user.uid)
              .set({
                email,
                fullname,
                bio: `Hi there! My name is ${fullname} and I am a ${profession} and you can hire me right from here, the best app in the world!`,
                date_joined: {
                  month: getMonthName(date.getMonth()),
                  year: date.getFullYear()
                },
                is_business_account: true,
                profession
              })
          })
          .then(() => {
            this.props.firebase.setDisplayName(fullname)
            this.props.firebase.setDefaultProfilePicture()
          })
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

        let {
            fullname,
            email,
            companyName,
            passwordOne,
            passwordTwo,
            error,
            profession
          } = this.state

          const onSelect = (event) => {
            event.preventDefault()
            profession = event.target.name
            this.setState({profession})
          }
 
        // add email and password validation
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || fullname === '' || companyName === '' || profession === 'Select a profession'

        return (
            <form onSubmit={this.onSubmit}>
              <h1>SIGN UP</h1>
              <h3>As a Professional or Business</h3>
              <div className="form-group">
                <label htmlFor="InputFullName">Full Name</label>
                <input id="InputFullName" className="form-control mb-2"  name="fullname" value={fullname} onChange={this.onChange} type="text" placeholder="Full Name" />
                
                <label htmlFor="CompanyName">Company Name</label>
                <input id="InputEmail" className="form-control mb-2" name="companyName" value={companyName} onChange={this.onChange} type="text" placeholder="Company Name" />

                <label htmlFor="InputEmail">Email Address</label>
                <input id="InputEmail" className="form-control mb-2" name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />

                <label htmlFor="professionDropdown">Profession</label>
                <div className="dropdown mb-2">
                    <button className="btn btn-outline-dark dropdown-toggle" value={profession} name="profession" type="button" id="professionDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {profession}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="professionDropdown">
                        <h6 class="dropdown-header">Select a profession</h6>
                        <button  className="dropdown-item" name="Make Up Artist" onClick={onSelect}>Make Up Artist</button>
                        <button className="dropdown-item" name="Musician" onClick={onSelect}>Musician</button>
                        <button className="dropdown-item" name="Photographer" onClick={onSelect}>Photographer</button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" name="other" onClick={onSelect}>Other</button>
                    </div>
                </div>

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

const BusinessSignUpForm = compose(
  withRouter,
  withFirebase,
)(BusinessSignUpFormBase)

// const SignUpForm = withRouter(withFirebase(PasswordForgetFormBase))

export default BusinessSignUpForm