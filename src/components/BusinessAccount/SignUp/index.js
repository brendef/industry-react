import React from 'react'
import SignUpForm from './SignUpForm'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

import './BusinessSignUpForm.css'

const BusinessSignUpPage = () => (
  <div className="container-fluid">
    <div className="row signuppage">
    <div className="col-5 d-none d-lg-block bsu-left"></div>
      <div className="col-lg-7 d-flex align-items-center">
        <div className="container">
          <SignUpForm />
        </div>
      </div>
    </div>
  </div>
)

const SignUpLink = () => (
  <p> Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link> </p>
)

export { SignUpLink }
export default BusinessSignUpPage


