import React, { useRef, useState } from 'react';
import { fur_list } from "./furnitures";
import './Sidebar.css'


function Sidebar({option, addFurniture}) {
    switch (option) {
        case 'furniture': {
            return(
                <div className='furniture'>
                    {fur_list.map((e,i) => {
                        return (<img className='furImg' src={e.img} onClick={()=>addFurniture(e.id)} key={i}/>);
                    })}
                </div>
            ) 
            break;
        }

        case 'view':{
            return(
                <div className='view'>
                    <ul>
                    <li className="option_face">face</li>
                    <li className="option_right">right</li>
                    <li className="option_left">left</li>
                    <li className="option_up">up</li>
                </ul>
                </div>
            )
        }

        case 'color' :{
            return(
                <div className='color'>
                    Not Yet
                </div>
            )
        }
    }
}

export default Sidebar;