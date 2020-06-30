import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  }

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)

        this.auth = app.auth()
        // this.db = app.database()
        this.db = app.firestore()
        this.storage = app.storage()      

    }

    // *** Auth API *** //
    
    createUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

    signInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

    setDisplayName = (username) => this.auth.currentUser.updateProfile({ displayName : username })      

    setDefaultProfilePicture = () => {
        this.storage.ref(`Default_Profile_Pictures/${ Math.floor(Math.random() * (12 - 1 + 1)) + 1 }.png`).getDownloadURL()
        .then(url => {
            this.auth.currentUser.updateProfile({ photoURL : url })
        })
    }  

    signOut = () => this.auth.signOut()

    passwordReset = email => this.auth.sendPasswordResetEmail(email);
 
    passwordUpdate = password => this.auth.currentUser.updatePassword(password)

    // *** User API *** //

    user = uid => this.db.ref(`users/${uid}`)

    users = () => this.db.ref('users')

    userBio = () => this.db.ref(`users/${this.auth.currentUser.uid}`).child('bio')

    date_joined = () => this.db.ref(`users/${this.auth.currentUser.uid}`).child('date_joined')

    setProfilePicture = (uid) => {
        this.storage.ref(`Profile_Pictures/${uid}`).getDownloadURL()
        .then(url => {
            this.auth.currentUser.updateProfile({ photoURL : url })
            document.getElementById('profile-picture-modal').src = url
            document.getElementById('profile-picture-bio').src = url
        })
    }

    // *** Storage API *** //

    uploadProfilePicture = (uid, picture) => {
        const storageRef = this.storage.ref(`Profile_Pictures/${uid}`)
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
}

export default Firebase
