import React, { useState } from 'react';
import {ChromePicker} from 'react-color';

import { fur_list } from "./furnitures";

import './Sidebar.css'


function Sidebar({option, addFurniture, select, changefloorcolor, changewallcolor}) {

    const [color_wall, setColor_wall] = useState('#fff');
    const [color_floor, setColor_floor] = useState('#fff');

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
        case 'color' :{

            const changeColor = (color) => {
                select.setColor(color);
            }

            return(
                <div className = 'color'>
                    <div className='colorpicker'>
                        <div className ='colorpicker_title'>Wall color</div>
                        <ChromePicker color={color_wall} onChange={updatedColor => {changewallcolor(updatedColor.hex)
                        setColor_wall(updatedColor.hex)}}/>
                    </div>
             
                    <div className='colorpicker'>
                        <div className ='colorpicker_title'>Floor color</div>
                        <ChromePicker color={color_floor} onChange={updatedColor => {changefloorcolor(updatedColor.hex)
                        setColor_floor(updatedColor.hex)}}/>
                    </div>
                    <div className='colorpicker'>
                        <div>
                            <div className ='colorpicker_title'>{select.id} color</div>
                            <ChromePicker color={'#fff'} onChange={updatedColor => changeColor(updatedColor.hex)}/>
                        </div>
                    </div>
                </div>
   
            )
        }
    }
}

export default Sidebar;