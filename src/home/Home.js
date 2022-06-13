import './Home.css';

import { Link, useNavigate } from 'react-router-dom'

import app from '../firebase.js'

import {
    getAuth,
    onAuthStateChanged,
  } from 'firebase/auth'

import {ref, child, get, set, getDatabase, onValue, once} from 'firebase/database' 
import signInGoogle from './signInGoogle.js'

import signOutGoogle from './signOutGoogle.js'
import Modal from './Popup.js';
import React, {useState} from 'react'

const db = getDatabase(app);
let title;
let message;
let callback = false;


function Home() {
    const [Loged, setLoged] = useState(false);
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
        if (callback == 1) {
            navigate("/select_2");
        }
        if (callback == 2) {
            navigate("/select");
        }
      };

    const changedlogedstate = (Loged)=>{
        if(Loged){
            setLoged(false)
        }
        else{
            setLoged(true)
        }
    }

    onAuthStateChanged(getAuth(app), (user) => {
        console.log(user.displayName);
        if (user) {
            console.log('user : ', Loged)
            let data;
            const userRef = ref(db, user.displayName);
            onValue(userRef, (snapshot) => {
                data = snapshot.val();
            })
            // previous data is exist
            if (data) {
                // pop-up image select screen
                title = "PREVIOUS DATA EXIST";
                message = "GO TO SELECT PAGE";
                callback = 1; // go to select2
            }
            else {
                // no data is exist
                title = "CANNOT FIND ANY DATA";
                message = "LET'S START MAKING YOUR ROOM";
                callback = 2; // go to select
                
                set(ref(db, user.displayName+'/Theme'), {
                    Name: '',
                    Furnitures: {},
                  });
                  
            }
            
        } else {
            console.log('user : ', Loged)

            // before load data, please log in your google account
            title = "CANNOT FIND USER INFORMATION";
            message = "PLEASE LOGIN YOUR GOOGLE ACCOUNT";
        }
      })
    return(
        <div className="home">
            <img src={'/logo.png'} className="logo" />
            {/* <div className="login" onClick={signInGoogle}>LOGIN</div>
            <div className="logout" onClick={signOutGoogle}>LOGOUT</div> */}
            <React.Fragment>
                <div className='loginoutbutton' style={{textDecoration:'none'}} onClick={Loged ? signOutGoogle : signInGoogle}>{Loged ? 'LOGOUT' : 'LOGIN'}</div>
                <Link to={Loged ? '/select_2' : '/select'} style={{textDecoration:'none'}}><div className='selectbutton' onClick={openModal} href={Loged ? '/select_2' : '/select'}>{Loged ? 'SELECT ROOM' : 'ANONYMOUS'}</div></Link>
                {/* <div className="load" onClick={openModal}>LOAD DATA</div> */}
                <Modal open={modalOpen} close={closeModal} header={title}>
                    {message}
                </Modal>
            </React.Fragment>
            
            {/* <Link to="/select" style={{textDecoration:'none'}}><div className="start" href="/select" > START </div></Link> */}
        </div>
    )
}

export default Home