// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAiST1Jmvcb451aXjTQiuHIMjQaWTI0PA",
  authDomain: "roomtris-c91e0.firebaseapp.com",
  projectId: "roomtris-c91e0",
  storageBucket: "roomtris-c91e0.appspot.com",
  messagingSenderId: "1054915183358",
  appId: "1:1054915183358:web:123a2744957b6902ee1baf",
  databaseURL: "https://roomtris-c91e0-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);



export default app;

