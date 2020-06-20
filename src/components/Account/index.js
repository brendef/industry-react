import React, { Component } from 'react'
import PasswordChangeForm from '../PasswordChange'
import { withAuthorisation, AuthUserContext } from '../Session'

import './AccountsPage.css'

class AccountPage extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      authUser : this.props.authUser,
      selectedFile : null,
      error : null
    }
  }

  /* 
        -   If code breaks disable the comments below and remove the "uploadProfilePicture" function from firebase.js
  */

    // This should actually be in the firebase.js file
    // uploadProfilePicture = picture => {

    //   const storageRef = this.props.firebase.storage.ref(`Profile_Pictures/${picture.name}`)
    //   const task = storageRef.put(picture)
      
    //   task.on('state_changed',
    //       function process(snapshot) {
    //           let percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100
    //           const progressbar = document.getElementById('progressbar')
    //           progressbar.value = percentage
    //       },
  
    //       function error(error) {
    //           console.log(error)
    //       },
          
    //       function complete() {
    //           console.log("drucks")
    //       }
    //   )
    // }

  selectFileHandler = event => {
    this.setState({
    selectedFile : event.target.files[0]
    })  
  }

  uploadFileHandler = () => {
    if(this.state.selectedFile === null) {
      this.setState({ 
        error : "Please select a photo"
      })
    } else {
      // this.uploadProfilePicture(this.state.selectedFile)
      this.props.firebase.uploadProfilePicture(this.state.selectedFile)
    }
  } 

  render() {
    return (
      <AuthUserContext.Consumer>
        { authUser => 
          <div className="accountspage">
            <div className="container">

              <div className="profilePicture">
              <img className="profile-picture" src={authUser.photoURL} alt="" /> 

              {/* Modal Starts Here */}

              <div id="profilePictureModal" className="modal fade" aria-hidden="true">
                {/* decide whether vertically centered or not */}
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5>Upload Profile Picture</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div className="modal-body d-flex flex-column">
                      <div className="row align-items-center">
                        <div className="col-md-4 mt-3 mb-3">
                          <img className="profile-picture" src={authUser.photoURL} alt="" /> 
                        </div>
                        <div className="col-md-8 mt-3 mb-3">
                        { 
                          this.state.error ? 
                          <input className="text-danger" type="file" onChange={ this.selectFileHandler } />
                          : 
                          <input className="" type="file" onChange={ this.selectFileHandler } />
                        }
                        </div>
                      </div>
                      {this.state.error && <p className="text-danger">{ this.state.error }</p>}

                      <progress id="progressbar" style={{width:"100%"}} value="0" max-value="100"></progress>

                      <button className="btn btn-outline-dark mt-3 mb-3" onClick={ this.uploadFileHandler }> Upload </button>

                      <p id="upload-complete-text" className="text-successful"></p>

                    </div>

                    {/* <div className="modal-footer">
                      <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-outline-dark" onClick={ this.uploadFileHandler }>Upload</button>
                    </div> */}
                    
                  </div>
                </div>
              </div>

              {/* Modal Ends Here */}


                <button className="btn btn-outline-dark" type="button" data-toggle="modal" data-target="#profilePictureModal">Change Profile Picture</button>
              </div>


              <h2> {authUser.displayName} </h2>
              <h3>RESET PASSWORD</h3>
              <PasswordChangeForm />
            </div>
          </div> 
          }
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