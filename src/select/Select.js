import './Select.css';

import { Link } from 'react-router-dom'
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// For save
import app from '../firebase.js'
import {ref, child, get, set, getDatabase, onValue, once} from 'firebase/database' 
import {
    getAuth,
    onAuthStateChanged,
  } from 'firebase/auth'

const db = getDatabase(app);  

function Select() {
    const [title, setTitle] = useState("");
    const [index, setIndex] = useState(0);
    const left = () => {
        if(index == 0) setIndex(4);
        else setIndex(index-1);
    }
    const right = () => {
        if(index == 4) setIndex(0);
        else setIndex(index+1);
    }
    onAuthStateChanged(getAuth(app), (user) => {
        set(ref(db, user.displayName+'/Theme'), {
            Name: title,
          });
    })
    // 룸 프리셋을 주지 않으니까 이름을 설정하는 페이지로 쓰는 게 어떨지
    return(
        <div className="select">
            <Link to='/'><div className='gobackBtn'><ArrowBackIosIcon/></div></Link>
            <div className="header">WRITE <br/> YOUR ROOM NAME</div>
            <div className="area">
                <div className="screen"> 
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
            </div>
            <Link to="/room"style={{textDecoration:'none'}}><div className="selectBtn">CREATE</div></Link>
        </div>
    )
}

export default Select
