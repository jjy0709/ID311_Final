import React, { useRef, useState, useEffect } from 'react';
import * as Three from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, OrthographicCamera,useScroll, TransformControls } from '@react-three/drei';
import Cat from './cat';
import ReactDom from "react-dom";

import './Simulation.css';
import { Floor, Wall } from '../floorplan/wall';
import Camera from './Camera';
import Bed from './bed';
import Desk from './desk';
import Sidebar from './sidebar/Sidebar';

import ChairIcon from '@mui/icons-material/Chair';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import ColorLensIcon from '@mui/icons-material/ColorLens';

function Simulation() {
    const [select, setSelect] = useState({id:-1});
    const [cameraPosition, setCameraPosition] = useState([0,60,100]);
    const [zoom, setZoom] = useState(10);
    const [option, setOption] = useState();
    const [color_wall, setColor_wall] = useState('#fff');
    const [color_floor, setColor_floor] = useState('#fff');
    
    const [furnitures, setFurniture] = useState([]);
    const addFurniture = (id) => {
        setFurniture([...furnitures, id]);
    }


    const selectOption = (op) => {
        setOption(op);
    }

    const changeCameraPosition = (position)=>{
        setCameraPosition(position);
    }

    const changewallcolor = (wallcolor)=>{
        setColor_wall(wallcolor);
    }

    const changefloorcolor = (floorcolor)=>{
        setColor_floor(floorcolor);
    }

    return(
        <div className="Screen">
            <div className="sidebar">
                <ul>
                    <div className = "sidebartitle">
                        Menu
                    </div>
                    <li className="option" onClick={()=>selectOption('furniture')}><ChairIcon/>Add Furniture</li>
                    <li className="option" onClick={()=>selectOption('view')}><CameraswitchIcon/>Another View</li>
                    <li className="option" onClick={()=>selectOption('color')}><ColorLensIcon/>Change Color</li>
                </ul>
                <div className="content">
                    <Sidebar option={option} addFurniture={addFurniture} changeCameraPosition={changeCameraPosition} changewallcolor={changewallcolor} changefloorcolor={changefloorcolor} select={select}/>
                </div>
            </div>
            <Canvas   orthographic camera={{position:cameraPosition, zoom:zoom}}>
                {/* <OrthographicCamera position = {cameraPosition} zoom = {zoom}/> */}
                <pointLight position={[0,0, 100]} castShadow/>
                <directionalLight position={[20,20,20]} castShadow />
                <Floor select={select} setSelect={setSelect} floor_color={color_floor}/>
                <Wall left={true} select={select} setSelect={setSelect} wall_color = {color_wall}/>
                <Wall left={false} select={select} setSelect={setSelect} wall_color = {color_wall}/>
                {furnitures.map((e, i) => {
                    let now = false;
                    if(i == select.id) now = true;
                    if(e == 'desk') {
                        return <Desk now={now} select={select} setSelect={setSelect} pos={new Three.Vector3(-22,-14,-3)} id={furnitures.length} key={furnitures.length}/>;
                    } else if(e == 'bed') {
                        return <Bed now={now} select={select} setSelect={setSelect} id={furnitures.length} key={furnitures.length}/>;
                    }
                })}



            </Canvas>
        </div>
    );
}

export default Simulation;