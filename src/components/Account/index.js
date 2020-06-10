import React from 'react'
import PasswordForgetForm from '../PasswordForget/PasswordForgetForm'
import PasswordChangeForm from '../PasswordChange'

const Admin = () => (
  <div>
      <h1> Accounts Page </h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
  </div>
)
 
export default Admin;