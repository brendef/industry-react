import React, { Component } from 'react'
import PasswordChangeForm from '../PasswordChange'
import { withAuthorisation, AuthUserContext } from '../Session'
import BioModal from "./BioModal";
import ProfilePictureModal from './ProfilePictureModal';

import './AccountPage.css'

class AccountPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bio: null,
            photoURL: null,
            dateJoined: {
                month: null ,
                year: null
            }
        }
        
    } 

    componentDidMount() {
        this.props.firebase.currentUser().onSnapshot(doc => {
            this.setState(prevState => { return { ...prevState, bio: doc.data().bio } })
        })
        this.props.firebase.currentUser().onSnapshot(doc => {
            this.setState(prevState => { return { ...prevState, photoURL: doc.data().photoURL } })
        })
        this.props.firebase.currentUser().onSnapshot(doc => {
            this.setState(prevState => { 
                return { 
                    ...prevState, 
                    dateJoined: {
                        month: doc.data().date_joined.month,
                        year: doc.data().date_joined.year
                    }
                }})
        })
    }

    componentWillUnmount() {
        this.setState({ })
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    <div className="accountspage">

                        {/* Profile Picture Upload Modal */}
                       <ProfilePictureModal firebase={this.props.firebase} />
                        {/* Profile Picture Upload Modal */}

                        {/* Bio Modal */}
                        <BioModal firebase={this.props.firebase}/>
                        {/* Bio Modal */}

                        <div className="container">

                            {/* Account Top part / user infromation */}
                            <div>
                                <div className="container mt-2 mb-3">
                                    <div className="row">
                                        <div className="">
                                            <img id="profile-picture-bio" className="img-thumbnail md-margin-bottom-10" src={this.state.photoURL} width="200" height="200" alt="" />
                                        </div>
                                        <div className="col-md-8">
                                            <h2>{authUser.displayName}</h2>
                                            <div>
                                                <strong>City:</strong> Cape Town
                                            </div>
                                            <span>
                                                <strong>Date Joined:</strong>
                                                <span> { this.state.dateJoined.month } </span>
                                                <span> { this.state.dateJoined.year } </span>
                                            </span>
                                            <hr />
                                            <span><strong>Bio:</strong></span>
                                            <p id="user-bio" className="user-bio" > { this.state.bio } </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* END Account Top part / user infromation */}


                            {/* Rest of page / setting part / bottom part */}


                            <div className="accordion" id="settingsList">

                                <div className="card">
                                    <div className="card-header" id="ActiveOrders">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseActiveOrders" aria-expanded="false" aria-controls="collapseActiveOrders">
                                                Active Orders / Services 
                                            </button>
                                        </h2>
                                    </div>

                                    <div id="collapseActiveOrders" className="collapse" aria-labelledby="ActiveOrders" data-parent="#settingsList">
                                        <div className="card-body">
                                            All work with services will be shown here
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="reviews">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseReviews" aria-expanded="false" aria-controls="collapseReviews">
                                                Reviews / Ratings 
                                            </button>
                                        </h2>
                                    </div>

                                    <div id="collapseReviews" className="collapse" aria-labelledby="reviews" data-parent="#settingsList">
                                        <div className="card-body">
                                            All your reviews and ratings will be shown here
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="EditProfile">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseEditProfile" aria-expanded="false" aria-controls="collapseEditProfile">
                                                Edit Profile
                                             </button>
                                        </h2>
                                    </div>
                                    <div id="collapseEditProfile" className="collapse" aria-labelledby="EditProfile" data-parent="#settingsList">
                                        <div className="card-body">
                                            <div className="profileEditModals">
                                                <div>
                                                    <button className="editProfileButtons p-2" data-toggle="modal" data-target="#profilePictureModal">Change Profile Picture</button>
                                                </div>
                                                <div>
                                                    <button className="editProfileButtons p-2" data-toggle="modal" data-target="#BioModal">Edit Bio</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="resetPassword">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseResetPassword" aria-expanded="false" aria-controls="collapseResetPassword">
                                                Reset Password
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseResetPassword" className="collapse" aria-labelledby="resetPassword" data-parent="#settingsList">
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

const condition = authUser => !!authUser

export default withAuthorisation(condition)(AccountPage)


// import React, { useState, useEffect } from 'react'
// import PasswordChangeForm from '../PasswordChange'
// import { withAuthorisation, AuthUserContext } from '../Session'
// import BioModal from "./BioModal";
// import ProfilePictureModal from './ProfilePictureModal';

// import './AccountPage.css'

// const AccountPage = (props) => {
//     const [state, setState] = useState({
//             bio: null,
//             photoURL: null,
//             dateJoined: {
//                 month: null ,
//                 year: null
//             }
//      })

//     useEffect(() => {
//         props.firebase.user(props.firebase.auth.uid).onSnapshot(doc => {
//             setState(prevState => { return { ...prevState, bio: doc.data().bio } })
//         })
//         props.firebase.user(props.firebase.auth.uid).onSnapshot(doc => {
//             setState(prevState => { return { ...prevState, photoURL: doc.data().photoURL } })
//         })
//         props.firebase.user(props.firebase.auth.uid).onSnapshot(doc => {
//             setState(prevState => { 
//                 return { 
//                     ...prevState, 
//                     dateJoined: {
//                         month: doc.data().date_joined.month,
//                         year: doc.data().date_joined.year
//                     }
//                 }})
//         })
//     }, [state.bio, state.photoURL, state.dateJoined, props.firebase])

    

//         return (
//             <AuthUserContext.Consumer>
//                 {authUser =>
//                     <div className="accountspage">
//                         {/* Profile Picture Upload Modal */}
//                        <ProfilePictureModal firebase={props.firebase} />
//                         {/* Profile Picture Upload Modal */}

//                         {/* Bio Modal */}
//                         <BioModal firebase={props.firebase}/>
//                         {/* Bio Modal */}

//                         <div className="container">
//                             {/* Account Top part / user infromation */}
//                             <div>
//                                 <div className="container mt-2 mb-3">
//                                     <div className="row">
//                                         <div className="">
//                                             <img id="profile-picture-bio" className="img-thumbnail md-margin-bottom-10" src={state.photoURL} width="200" height="200" alt="" />
//                                         </div>
//                                         <div className="col-md-8">
//                                             <h2>{authUser.displayName}</h2>
//                                             <div>
//                                                 <strong>City:</strong> Cape Town
//                                             </div>
//                                             <span>
//                                                 <strong>Date Joined:</strong>
//                                                 <span> { state.dateJoined.month } </span>
//                                                 <span> { state.dateJoined.year } </span>
//                                             </span>
//                                             <hr />
//                                             <span><strong>Bio:</strong></span>
//                                             <p id="user-bio" className="user-bio" > { state.bio } </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* END Account Top part / user infromation */}


//                             {/* Rest of page / setting part / bottom part */}


//                             <div className="accordion" id="settingsList">

//                                 <div className="card">
//                                     <div className="card-header" id="ActiveOrders">
//                                         <h2 className="mb-0">
//                                             <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseActiveOrders" aria-expanded="false" aria-controls="collapseActiveOrders">
//                                                 Active Orders / Services 
//                                             </button>
//                                         </h2>
//                                     </div>

//                                     <div id="collapseActiveOrders" className="collapse" aria-labelledby="ActiveOrders" data-parent="#settingsList">
//                                         <div className="card-body">
//                                             All work with services will be shown here
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="card">
//                                     <div className="card-header" id="reviews">
//                                         <h2 className="mb-0">
//                                             <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseReviews" aria-expanded="false" aria-controls="collapseReviews">
//                                                 Reviews / Ratings 
//                                             </button>
//                                         </h2>
//                                     </div>

//                                     <div id="collapseReviews" className="collapse" aria-labelledby="reviews" data-parent="#settingsList">
//                                         <div className="card-body">
//                                             All your reviews and ratings will be shown here
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="card">
//                                     <div className="card-header" id="EditProfile">
//                                         <h2 className="mb-0">
//                                             <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseEditProfile" aria-expanded="false" aria-controls="collapseEditProfile">
//                                                 Edit Profile
//                                              </button>
//                                         </h2>
//                                     </div>
//                                     <div id="collapseEditProfile" className="collapse" aria-labelledby="EditProfile" data-parent="#settingsList">
//                                         <div className="card-body">
//                                             <div className="profileEditModals">
//                                                 <div>
//                                                     <button className="editProfileButtons p-2" data-toggle="modal" data-target="#profilePictureModal">Change Profile Picture</button>
//                                                 </div>
//                                                 <div>
//                                                     <button className="editProfileButtons p-2" data-toggle="modal" data-target="#BioModal">Edit Bio</button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="card">
//                                     <div className="card-header" id="resetPassword">
//                                         <h2 className="mb-0">
//                                             <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseResetPassword" aria-expanded="false" aria-controls="collapseResetPassword">
//                                                 Reset Password
//                                             </button>
//                                         </h2>
//                                     </div>
//                                     <div id="collapseResetPassword" className="collapse" aria-labelledby="resetPassword" data-parent="#settingsList">
//                                         <div className="card-body">
//                                             <PasswordChangeForm />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 }
//             </AuthUserContext.Consumer>
//         )
//     }

// const condition = authUser => !!authUser

// export default withAuthorisation(condition)(AccountPage)