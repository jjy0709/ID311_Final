import React, { useEffect, useState } from 'react';
import './Floorplan.css';
import { Link } from 'react-router-dom'
import * as Three from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {ChromePicker} from 'react-color';
import { Floor, Wall } from './wall';
import Camera from './Camera';

function Floorplan() {
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
                <button onClick={()=>setShowColorPicker_wall(showColorPicker_wall=>!showColorPicker_wall)}>{showColorPicker_wall ? 'close color picker' : 'Pick a wall color'}</button>
                {
                    showColorPicker_wall && (<ChromePicker color_wall={color_wall} onChange={updatedColor => setColor_wall(updatedColor.hex)}/>)
                    
                }
                
                <button onClick={()=>setShowColorPicker_floor(showColorPicker_floor=>!showColorPicker_floor)}>{showColorPicker_floor ? 'close color picker' : 'Pick a floor color'}</button>
                {
                    showColorPicker_floor && (<ChromePicker color_floor={color_floor} onChange={updatedColor => setColor_floor(updatedColor.hex)}/>)
                    
                }
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

            <Link to="/room"style={{textDecoration:'none'}}><div className="selectBtn">SELECT</div></Link>
            
        </div>
    );
}

export default Floorplan;



