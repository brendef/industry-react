import React, { Component } from 'react'
import PasswordChangeForm from '../PasswordChange'
import { withAuthorisation, AuthUserContext } from '../Session'

// import './AccountsPage.css'
import ProfilePictureModal from './ProfilePictureModal'
import AccountBio from './AccountBio'
import BioModal from './BioModal'

class AccountPage extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      authUser : this.props.authUser
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


  render() {
    return (
      <AuthUserContext.Consumer>
        { authUser => 
          <div className="accountspage mt-5">
            <div className="container">

              {/* Modals */}
              <div className="profilePicture">
                <ProfilePictureModal authUser={authUser} firebase={this.props.firebase} /> 
              </div>

              <div className="profilePicture">
                <BioModal /> 
              </div>

              <AccountBio authUser={authUser} firebase={this.props.firebase} />

              <div className="accordion" id="accordionExample">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                       Active Orders / Services
                      </button>
                    </h2>
                  </div>

                  <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body">
                      All work with services will be shown here
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingTwo">
                    <h2 className="mb-0">
                      <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Edit Profile
                      </button>
                    </h2>
                  </div>
                  <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                    <div className="card-body">
                      <div className="d-flex flex-column">
                        <p className="editProfileButtons p-2" data-toggle="modal" data-target="#profilePictureModal">Change Profile Picture</p>
                        <p className="editProfileButtons p-2" data-toggle="modal" data-target="#BioModal">Edit Bio</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingThree">
                    <h2 className="mb-0">
                      <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Reset Password
                      </button>
                    </h2>
                  </div>
                  <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                    <div className="card-body">
                      <PasswordChangeForm />
                    </div>
                  </div>
                </div>
              </div>
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