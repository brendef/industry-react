import React, { useState, useEffect } from 'react'
import PasswordChangeForm from '../PasswordChange'
import { withAuthorisation, AuthUserContext } from '../Session'
import BioModal from "./BioModal";
import ProfilePictureModal from './ProfilePictureModal';

import './AddBusinessInformation.css'

const AddBusinessInformation = (props) => {
    const [state, setState] = useState({
            bio: null,
            photoURL: null,
            dateJoined: {
                month: null ,
                year: null
            }
     })

    useEffect(() => {
        props.firebase.user(props.firebase.auth.uid).onSnapshot(doc => {
            setState(prevState => { return { ...prevState, bio: doc.data().bio } })
        })
        props.firebase.user(props.firebase.auth.uid).onSnapshot(doc => {
            setState(prevState => { return { ...prevState, photoURL: doc.data().photoURL } })
        })
        props.firebase.user(props.firebase.auth.uid).onSnapshot(doc => {
            setState(prevState => { 
                return { 
                    ...prevState, 
                    dateJoined: {
                        month: doc.data().date_joined.month,
                        year: doc.data().date_joined.year
                    }
                }})
        })
    }, [state.bio, state.photoURL, state.dateJoined, props.firebase])

    

        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    <div className="AddBusinessInformation">
                        <div className="container">
                            
                        </div>
                    </div>
                }
            </AuthUserContext.Consumer>
        )
    }

const condition = authUser => !!authUser

export default withAuthorisation(condition)(AddBusinessInformation)