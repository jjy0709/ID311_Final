import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Simulation from './simulation/Simulation';
import Home from './home/Home';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOxQsidqCtO-1yQb5bx9OBATfENqkx4Uc",
  authDomain: "id-311-final-team3.firebaseapp.com",
  projectId: "id-311-final-team3",
  storageBucket: "id-311-final-team3.appspot.com",
  messagingSenderId: "999920232222",
  appId: "1:999920232222:web:0b99c18f208c63ecb94b0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Simulation />} />
      </Routes>
    </Router>
  );
}

export default App;
