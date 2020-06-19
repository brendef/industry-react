import React from 'react'
import { Link } from 'react-router-dom'
import PasswordForgetForm from './PasswordForgetForm'
import * as ROUTES from '../../constants/routes'

import './PasswordForgetForm.css'

const PasswordForgetPage = () => (
  <div className="container-fluid">
    <div className="row signinpage">
      <div className="col-lg-5 d-flex align-items-center">
        <div className="container">
          <h1>RESET PASSWORD</h1>
          <PasswordForgetForm />
        </div>
      </div>
      <div className="col-7 d-none d-lg-block pwf-right"></div>
    </div>
  </div>
)

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

export { PasswordForgetLink }
export default PasswordForgetPage