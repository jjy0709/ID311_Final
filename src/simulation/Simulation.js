import React, { useState } from 'react';
import * as Three from 'three';
import { Canvas } from '@react-three/fiber';

import { Floor, Wall } from '../floorplan/wall';
import * as Furniture from './furnitures/index.js'
import Sidebar from './sidebar/Sidebar';

import ChairIcon from '@mui/icons-material/Chair';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import './Simulation.css';

function Simulation() {
    const [select, setSelect] = useState({color:'#fff'});
    const [cameraPosition, setCameraPosition] = useState([100,60,100]);
    const [zoom, setZoom] = useState(10);
    const [option, setOption] = useState();
    
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

    return(
        <div className="Screen">
            <div className="sidebar">
                <ul>
                    <div className = "sidebartitle">
                        Menu
                    </div>
                    <li className="option" onClick={()=>selectOption('furniture')}><ChairIcon/>Add Furniture</li>
                    <li className="option" onClick={()=>selectOption('color')}><ColorLensIcon/>Change Color</li>
                    <li className="option" onClick={()=>setFurniture([])}><CameraswitchIcon/>Reset</li>
                </ul>
                <div className="content">
                    <Sidebar option={option} addFurniture={addFurniture} changeCameraPosition={changeCameraPosition} select={select}/>
                </div>
            </div>
            <Canvas orthographic camera={{position:cameraPosition, zoom:zoom}}>
                <pointLight position={[100, 60, 100]} castShadow/>
                <directionalLight position={[60,30,-20]} castShadow />
                <Floor select={select} setSelect={setSelect} />
                <Wall  select={select} setSelect={setSelect} />
                {furnitures.map((e, i) => {
                    if(e === 'desk') {
                        return <Furniture.Desk select={select} setSelect={setSelect} pos={new Three.Vector3(0,-13.5, 0)} id={i} key={i}/>;
                    } else if(e === 'bed') {
                        return <Furniture.Bed select={select} setSelect={setSelect} pos={new Three.Vector3(-5,-20, -20)} id={i} key={i}/>;
                    } else if(e === 'chair') {
                        return <Furniture.Chair select={select} setSelect={setSelect} pos={new Three.Vector3(0, -18, 0)} id={i} key={i}/>
                    } else if(e === 'drawer') {
                        return <Furniture.Drawer select={select} setSelect={setSelect} pos={new Three.Vector3(0, -15, 0)} id={i} key={i}/>;
                    } else if(e === 'refrigerator') {
                        return <Furniture.Refrigerator select={select} setSelect={setSelect} pos={new Three.Vector3(0, -13.5, 0)} id={i} key={i}/>
                    } else if(e === 'sofa') {
                        return <Furniture.Sofa select={select} setSelect={setSelect} pos={new Three.Vector3(0, -23, 0)} id={i} key={i}/>
                    } else if(e === 'table') {
                        return <Furniture.Table select={select} setSelect={setSelect} pos={new Three.Vector3(0, -13.5, 0)} id={i} key={i}/>
                    }
                })}
            </Canvas>
        </div>
    );
}

export default Simulation;