import React, { useEffect, useState } from 'react';
import './Floorplan.css';
import { Link } from 'react-router-dom'
import * as Three from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {ChromePicker} from 'react-color';
import { Floor, Wall } from './wall';
import Camera from './Camera';

function Floorplan(setwall_color, setfloor_color) {
    const [select, setSelect] = useState({id:-1});
    const [cameraPosition, setCameraPosition] = useState([0,60,100]);
    const [zoom, setZoom] = useState(10);

    const [color_wall, setColor_wall] = useState('#fff');
    const [color_floor, setColor_floor] = useState('#fff');
    const [showColorPicker_wall, setShowColorPicker_wall] = useState(false)
    const [showColorPicker_floor, setShowColorPicker_floor] = useState(false)



    return(
        <div className="floorplan">
            <div className="header">MAKE ROOM</div>
            <div className="sidebar">
                <div>
                    <button onClick={()=>setShowColorPicker_wall(showColorPicker_wall=>!showColorPicker_wall)} className = "wall_picker">{showColorPicker_wall ? 'close wall color picker' : 'Pick a wall color'}</button>
                    {
                        showColorPicker_wall && (<ChromePicker color={color_wall} onChange={updatedColor => setColor_wall(updatedColor.hex)}/>)
                    }
                </div>
             
                <div>
                    <button onClick={()=>setShowColorPicker_floor(showColorPicker_floor=>!showColorPicker_floor)} className = "floor_picker">{showColorPicker_floor ? 'close floor color picker' : 'Pick a floor color'}</button>
                    {
                        showColorPicker_floor && (<ChromePicker color={color_floor} onChange={updatedColor => setColor_floor(updatedColor.hex)}/>)
                    }
                </div>

            </div>
            
            <div className="Screen">
                
                <Canvas orthographic camera={{position:cameraPosition, zoom:zoom}}>
                    {/* <OrbitControls /> */}
                    <Camera />
                    {/* <ambientLight castShadow/> */}
                    <pointLight position={[0,0, 100]} castShadow/>
                    <directionalLight position={[20,20,20]} castShadow />
                    <Floor select={select} setSelect={setSelect} floor_color={color_floor}/>
                    <Wall left={true} select={select} setSelect={setSelect} wall_color={color_wall}/>
                    <Wall left={false} select={select} setSelect={setSelect} wall_color={color_wall}/>
                </Canvas>
            </div>
            <div>
                <Link to="/room"style={{textDecoration:'none'}}><div className="selectBtn">START</div></Link>
            </div>
            
            
        </div>
    );
}

export default Floorplan;



