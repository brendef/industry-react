import React from 'react'
import SignUpForm from './SignUpForm'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
)

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

export { SignUpLink }
export default SignUpPage