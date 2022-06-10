import React, { useRef, useState, useEffect } from 'react';
import { Camera } from 'three';
import { fur_list } from "./furnitures";
import './Sidebar.css'

import faceside from './cameraposition/faceside.png';
import leftside from './cameraposition/leftside.png';
import rightside from './cameraposition/rightside.png';
import upside from './cameraposition/upside.png';


function Sidebar({option, addFurniture, changeCameraPosition}) {
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
            const camera_position = [
                {name : "face", position:[0,60,100], img : faceside},
                {name : "right", position:[90,60,100], img : leftside},
                {name : "left", position:[-90,60,100], img : rightside},
                {name : "up", position:[0,900,100], img : upside}
            ]
            console.log(camera_position[1].position);
            return(
                <div className='view'>
                    {camera_position.map((e, i)=>{
                        return(<img className='positionlist' src={e.img} onClick={()=>changeCameraPosition(e.position)} key={i}/>);
                    })}
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