import React, { Component } from 'react'

class AccountBio extends Component {
    componentDidMount() {
        this.props.firebase.setBio()
    }

    render() {
        return (
            <div>
                <div className="container mt-2 mb-2">
                    <div className="row">
                        <div className="">
                            <img id="profile-picture-bio" className="img-thumbnail md-margin-bottom-10" src={this.props.authUser.photoURL} width="200" height="200" alt="" />
                        </div>
                        <div className="col-md-8">
                            <h2>{this.props.authUser.displayName}</h2>
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
        )
    }
}                                  

export default AccountBio