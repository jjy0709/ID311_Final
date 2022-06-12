import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
  } from 'firebase/auth'

  import app from '../firebase.js'

const signInGoogle= () => {
    signInWithPopup(
        getAuth(app),
        new GoogleAuthProvider().setCustomParameters({
            prompt: 'select_account',
        })
    )
  }

export default signInGoogle;