import {
    getAuth,
    signOut,
  } from 'firebase/auth'

  import app from '../firebase.js'

const signOutGoogle= () => {
    signOut(getAuth(app)).then(()=>{
        console.log("logout completely");
    })
    .catch((error) => {
        console.log("error is occur");
    })
  }

export default signOutGoogle;