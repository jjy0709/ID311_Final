import './Select_2.css';

import { Link } from 'react-router-dom'
import { useState } from 'react';

//유저 데이터가 있을 시 썸네일 사진으로 변경
import room_1 from './roomimg/1stroom.png';
import room_2 from './roomimg/2ndroom.png';
import room_3 from './roomimg/3rdroom.png';
import room_4 from './roomimg/4throom.png';
import nothing from './roomimg/New.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function screen(index) {
    
    let src;
    if(index==0){
        src=room_1;
    }
    else if(index==1){
        src=room_2;
    }
    else if(index==2){
        src=room_3;
    }
    else if(index==3){
        src=room_4;
    }
    else {
        src=nothing;
    }
    return src;
}

function Select_2() {
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
            <Link to='/'><div className='gobackBtn'><ArrowBackIosIcon/></div></Link>
            <div className="header">SELECT <br/> ROOM THEME</div>
            <div className="area">
                <div><img onClick={left} src={'/left.png'} className="btn"/></div>
                <div className="screen"> 
                    <img src={screen(index)} className="selectScreen"/>
                </div>
                <div><img onClick={right} src={'/right.png'} className="btn"/></div>
            </div>
            <Link to="/room"style={{textDecoration:'none'}}><div className="selectBtn">SELECT</div></Link>
        </div>
    )
}

export default Select_2