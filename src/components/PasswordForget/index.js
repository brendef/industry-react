import React from 'react'
import { Link } from 'react-router-dom'
import PasswordForgetForm from './PasswordForgetForm'
import * as ROUTES from '../../constants/routes'
 
const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
)

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

export { PasswordForgetLink }
export default PasswordForgetPage