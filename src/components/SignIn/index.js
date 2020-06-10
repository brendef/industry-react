import React from 'react'
import SignInForm from './SignInForm'
import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
const SignInPage = () => (
  <div> 
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
  </div>
)

export default SignInPage;