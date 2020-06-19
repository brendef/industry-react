import React from 'react'
import SignUpForm from './SignUpForm'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import './SignUpForm.css'

const SignUpPage = () => (
  <div className="container-fluid">
    <div className="row signuppage">
      <div className="col-lg-5 d-flex align-items-center left">
        <div className="container">
          <SignUpForm />
        </div>
      </div>
      <div className="col-7 d-none d-lg-block su-right"></div>
    </div>
  </div>
)

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

export { SignUpLink }
export default SignUpPage