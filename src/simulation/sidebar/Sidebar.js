import React from 'react';
import {ChromePicker} from 'react-color';

import { fur_list } from "./furnitures";

import './Sidebar.css'

function Sidebar({option, addFurniture, select}) {
    switch (option) {
        case 'furniture': {
            const ref = React.createRef();
            const ClickAdd = (id) => {
                addFurniture({id, pos:null, rot: null, col:null, ref})
            }
            return(
                <div className='furniture'>
                    {fur_list.map((e,i) => {
                        return (<img className='furImg' src={e.img} onClick={()=>ClickAdd(e.id)} key={i}/>);
                    })}
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