import React, { Component } from 'react'
import PasswordForgetForm from '../PasswordForget/PasswordForgetForm'
import PasswordChangeForm from '../PasswordChange'
import { withAuthorisation, AuthUserContext } from '../Session'

import './AccountsPage.css'

class AccountPage extends Component {
  // constructor() {
  //   super()

  //   this.state = {
  //     selectedFile: null
  //   }

  // }

  // selectFileHandler = event => {
  //   this.setState({
  //     selectedFile : event.target.files[0]
  //   }) 
  // }

  // uploadFileHandler = () => {
  //   this.props.firebase.uploadProfilePicture(this.state.selectedFile)
  // }

  render() {
    return (
      <AuthUserContext.Consumer>
        { authUser => 
          <div className="accountspage">
            <div className="container">
              <div className="profilePicture">
              <img className="profile-picture" src={authUser.photoURL} alt="" /> 
                {/* <input type="file" onChange={ this.selectFileHandler } /> */}
                {/* <button onClick={ this.uploadFileHandler }> Upload </button> */}
              </div>
              <h2> {authUser.displayName} </h2>
              <p> {authUser.photoURL} </p>
              <br></br>
              <h3>CHANGE PASSWORD</h3>
              <PasswordForgetForm />
              <h3>RESET PASSWORD</h3>
              <PasswordChangeForm />
            </div>
          </div> }
      </AuthUserContext.Consumer>
    )
  }
}
 
const condition = authUser => !!authUser;
 
export default withAuthorisation(condition)(AccountPage)

// const selectFileHandler = event => {
//   console.log(event)
// }

// const AccountPage = () => (
//   <AuthUserContext.Consumer>
//     { authUser => 
//     <div className="accountspage">
//       <div className="container">
//         <div className="profilePicture">
//           <input type="file" onChange={ this.selectFileHandler } />
//         </div>
//         <h2> {authUser.displayName} </h2>
//         <br></br>
//         <h3>CHANGE PASSWORD</h3>
//         <PasswordForgetForm />
//         <h3>RESET PASSWORD</h3>
//         <PasswordChangeForm />
//       </div>
//     </div> 
//     }
//   </AuthUserContext.Consumer>
// )
 
// const condition = authUser => !!authUser;
 
// export default withAuthorisation(condition)(AccountPage)