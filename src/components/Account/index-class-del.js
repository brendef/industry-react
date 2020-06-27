import React, { Component } from 'react'
import PasswordChangeForm from '../PasswordChange'
import { withAuthorisation, AuthUserContext } from '../Session'

import './AccountPage.css'

class AccountPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null,
            error: null
        }
    }

    uploadProfilePicture = (uid, picture) => {
        const storageRef = this.props.firebase.storage.ref(`Profile_Pictures/${uid}`)
        const task = storageRef.put(picture)
        const callSetProfilePicture = () => this.setProfilePicture(uid)

        task.on('state_changed',
            function process(snapshot) {
                let percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100
                const progressbar = document.getElementById('progressbar')
                progressbar.value = percentage
            },
    
            function error(error) {
                console.log(error)
            },
            
            function complete() {
                const uploadCompleteText = document.getElementById('upload-complete-text')
                uploadCompleteText.innerHTML = "Upload Complete"
                callSetProfilePicture()
            }
        )
    }

    setBio = () => {

        this.props.firebase.db.ref(`users/${this.props.firebase.auth.currentUser.uid}/bio`).on('value', snapshot => {
            document.getElementById('user-bio').innerHTML = snapshot.val()
        }) 
    }

    setProfilePicture = (uid) => {
        this.props.firebase.storage.ref(`Profile_Pictures/${uid}`).getDownloadURL()
        .then(url => {
            this.props.firebase.auth.currentUser.updateProfile({ photoURL : url })
            document.getElementById('profile-picture-modal').src = url
            document.getElementById('profile-picture-bio').src = url
        })
    }

    clearModal = () => {
        this.setState({
            selectedFile: null,
            error: null
        })

        // for profile picture
        document.getElementById('uploadInput').value = ''
        document.getElementById('progressbar').value = 0
        document.getElementById('upload-complete-text').innerHTML = ''

        // for bio
        document.getElementById('bio-text-area').value = ''

    }

    selectFileHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    uploadFileHandler = () => {
        if (this.state.selectedFile === null) {
            this.setState({
                error: "Please select a photo"
            })
        } else {
            this.uploadProfilePicture(this.props.firebase.auth.currentUser.uid, this.state.selectedFile)
        }
    }

    componentDidMount() {
        this.setBio()
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    <div className="accountspage">

                        {/* Profile Picture Upload Modal */}
                        <div id="profilePictureModal" className="modal fade container-fluid" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5>Upload Profile Picture</h5>
                                        <button onClick={this.clearModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div className="modal-body d-flex flex-column">
                                        <div className="row align-items-center">
                                            <div className="col-md-4 mt-3 mb-3">
                                                <img id="profile-picture-modal" className="profile-picture" src={authUser.photoURL} width="150" height="150" alt="" />
                                            </div>
                                            <div className="col-md-8 mt-3 mb-3">
                                                {
                                                    this.state.error ?
                                                        <input id="uploadInput" className="text-danger" type="file" onChange={this.selectFileHandler} />
                                                        :
                                                        <input id="uploadInput" className="" type="file" onChange={this.selectFileHandler} />
                                                }
                                            </div>
                                        </div>
                                        {this.state.error && <p className="text-danger">{this.state.error}</p>}

                                        <progress id="progressbar" style={{ width: "100%" }} value="0" max-value="100"></progress>

                                        <button className="btn btn-outline-dark mt-3 mb-3" onClick={this.uploadFileHandler}> Upload </button>

                                        <p id="upload-complete-text" className="text-successful"></p>

                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* Profile Picture Upload Modal */}

                        {/* Bio Modal */}
                        <div id="BioModal" className="modal fade container-fluid" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5>Edit Bio</h5>
                                        <button onClick={this.clearModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <textarea id="bio-text-area">

                                    </textarea>

                                    <div className="modal-footer">
                                        <button onClick={this.clearModal} type="button" className="btn btn-outline-danger" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-outline-dark" onClick={this.uploadFileHandler}>Update</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* Bio Modal */}




                        <div className="container">

                            {/* Account Top part / user infromation */}
                            <div>
                                <div className="container mt-2 mb-2">
                                    <div className="row">
                                        <div className="">
                                            <img id="profile-picture-bio" className="img-thumbnail md-margin-bottom-10" src={authUser.photoURL} width="200" height="200" alt="" />
                                        </div>
                                        <div className="col-md-8">
                                            <h2>{authUser.displayName}</h2>
                                            <div>
                                                <strong>City:</strong> Cape Town
                                            </div>
                                            <span><strong>Date Joined:</strong> March 2020</span>
                                            <hr />
                                            <span><strong>Bio:</strong></span>
                                            <p id="user-bio" className="user-bio"> </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* END Account Top part / user infromation */}


                            {/* Rest of page / setting part / bottom part */}


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