import React, { useState } from 'react';
import {ChromePicker} from 'react-color';

import { fur_list } from "./furnitures";

import './Sidebar.css'

import faceside from './cameraposition/faceside.png';
import leftside from './cameraposition/leftside.png';
import rightside from './cameraposition/rightside.png';
import upside from './cameraposition/upside.png';


function Sidebar({option, addFurniture, changeCameraPosition, select}) {
    const camera_position = [
        {name : "face", position:[0,60,100], img : faceside},
        {name : "right", position:[90,60,100], img : leftside},
        {name : "left", position:[-90,60,100], img : rightside},
        {name : "up", position:[0,900,100], img : upside}
    ]

    const [cameraPosition, setCameraPosition] = useState([0,60,100]);

    switch (option) {
        case 'furniture': {
            return(
                <div className='furniture'>
                    {fur_list.map((e,i) => {
                        return (<img className='furImg' src={e.img} onClick={()=>addFurniture(e.id)} key={i}/>);
                    })}
                </div>
            ) 
        }
        case 'view':{
            return(
                <div className='view'>
                    <div>
                        {camera_position.map((e,i) => {
                            return (<img className='positionlist' src={e.img} onClick={()=>{changeCameraPosition(e.position)
                            setCameraPosition(e.position)
                        console.log(e.position, cameraPosition)}} key={i}/>);
                        })}
                        {/* <div className = 'positionlist'>Face Side</div>
                        <img className = 'positionimg' src={faceside} onClick={()=>{changeCameraPosition(camera_position[0].position)
                        setCameraPosition(camera_position[0].position)
                        console.log(camera_position[0].position, CameraPosition)}} />
                        <div className = 'positionlist'>Left Side</div>
                        <img className = 'positionimg' src={leftside} onClick={()=>{changeCameraPosition(camera_position[1].position)
                        setCameraPosition(camera_position[1].position)
                        console.log(camera_position[1].position, CameraPosition)}} />
                        <div className = 'positionlist'>Right Side</div>
                        <img className = 'positionimg' src={rightside} onClick={()=>{changeCameraPosition(camera_position[2].position)
                        setCameraPosition(camera_position[2].position)
                        console.log(camera_position[2].position, CameraPosition)}} />
                        <div className = 'positionlist'>Up Side</div>
                        <img className = 'positionimg' src={upside} onClick={()=>{changeCameraPosition(camera_position[3].position)
                        setCameraPosition(camera_position[3].position)
                        console.log(camera_position[3].position, CameraPosition)}} /> */}
                    </div>
                </div>
            )
        }
        case 'color' :{
            const changeColor = (color) => {
                select.setColor(color);
            }
            return(
                <div className='color'>
                    <div>
                        <div className ='colorpicker_title'>{select.id} color</div>
                        <ChromePicker color={'#fff'} onChange={updatedColor => changeColor(updatedColor.hex)}/>
                    </div>
                </div>
            )
        }
    }
}

export default Sidebar;