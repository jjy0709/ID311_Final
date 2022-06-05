import './Select.css';

import { Link } from 'react-router-dom'
import { useState } from 'react';

function Select() {
    const [index, setIndex] = useState(0);
    const left = () => {
        if(index == 0) setIndex(4);
        else setIndex(index-1);
    }
    const right = () => {
        if(index == 4) setIndex(0);
        else setIndex(index+1);
    }
    
    return(
        <div className="select">
            <div className="header">SELECT <br/> ROOM THEME</div>
            <div className="area">
                <div><img onClick={left} src={'/left.png'} className="btn"/></div>
                <div className="screen"> 
                    <img src={'/logo.png'} className="selectScreen"/>
                </div>
                <div><img onCanPlay={right} src={'/right.png'} className="btn"/></div>
            </div>
            <Link to="/room"style={{textDecoration:'none'}}><div className="selectBtn">SELECT</div></Link>
        </div>
    )
}

export default Select
