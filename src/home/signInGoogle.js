import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
  } from 'firebase/auth'

  import app from '../firebase.js'

function signInGoogle(changedlogedstate){
    signInWithPopup(
        getAuth(app),
        new GoogleAuthProvider().setCustomParameters({
            prompt: 'select_account',
        })
    )
    changedlogedstate(true);
  }

export default signInGoogle;