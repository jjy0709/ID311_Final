import {
    getAuth,
    signOut,
  } from 'firebase/auth'

  import app from '../firebase.js'

function signOutGoogle(changedlogedstate){
    signOut(getAuth(app)).then(()=>{
        console.log("logout completely");
        changedlogedstate(true);
    })
    .catch((error) => {
        console.log("error is occur");
    })
  }

export default signOutGoogle;