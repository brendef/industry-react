import React from 'react'
import SignInForm from './SignInForm'
import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'

const SignInPage = () => (
  <div className="container-fluid">
    <div className="row signinpage">
      <div className="col-lg-5 d-flex align-items-center">
        <div className="container">
          <SignInForm />
          <PasswordForgetLink />
          <SignUpLink />
        </div>
      </div>
      <div className="col-7 d-none d-lg-block si-right"></div>
    </div>
  </div>
)

export default SignInPage

// const SignInPage = () => (

//   <div className="signinpage">

//     <div className="left">
//       <div></div>
//       <div className="container">
//         <h1>LOGIN</h1>
//         <SignInForm />
//         <div className="links">
//           <SignUpLink />
//         </div>
//       </div>
//       <div style={{ float:"right" }}> 
//         <PasswordForgetLink />
//       </div>
//     </div>

//     <div className="right"></div>
//   </div>
// )

// export default SignInPage;