import React, { useState } from 'react';
import * as Three from 'three';
import { Canvas } from '@react-three/fiber';

import { Floor, Wall } from './furnitures/wall';
import * as Furniture from './furnitures/index.js'
import Sidebar from './sidebar/Sidebar';

import ChairIcon from '@mui/icons-material/Chair';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import './Simulation.css';
import Camera from './Camera';

function Simulation() {
    const [select, setSelect] = useState({color:'#fff'});
    const [renderer, setRenderer] = useState();
    const [option, setOption] = useState();
    
    const [furnitures, setFurniture] = useState([]);

    const [color_wall, setColor_wall] = useState('#fff');
    const [color_floor, setColor_floor] = useState('#fff');

    const addFurniture = (id) => {
        setFurniture([...furnitures, id]);
    }

    const selectOption = (op) => {
        setOption(op);
    }

    const canvasRenderer = (canvas) => {
        setRenderer(new Three.WebGLRenderer({canvas, preserveDrawingBuffer: true}));
    }

    const changewallcolor = (wallcolor)=>{
        setColor_wall(wallcolor);
    }

    const changefloorcolor = (floorcolor)=>{
        setColor_floor(floorcolor);
    }

    const screenShot = () => {
        const image = renderer.domElement.toDataURL('image/png');
        const a = document.createElement("a");
        a.href = image.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        a.download="image.png"
        a.click();
    }

    const delete_ = () => {
        if(select && select.key > -1) {
            const newFur = [...furnitures];
            newFur.splice(select.key, 1);
            setFurniture(newFur);
        }
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
                    <li className="option" onClick={()=>screenShot()}><CameraswitchIcon/>ScreenShot</li>
                    <li className="option" onClick={()=>delete_()}><CameraswitchIcon/>Delete</li>
                </ul>
                <div className="content">
                    <Sidebar option={option} addFurniture={addFurniture} select={select} changewallcolor={changewallcolor} changefloorcolor={changefloorcolor}/>
                </div>
            </div>
            <Canvas gl={canvas => canvasRenderer(canvas)} orthographic camera={{position:[100,60,100], zoom:10}} >
                <Camera />
                <pointLight position={[100, 60, 100]} castShadow/>
                <directionalLight position={[60,30,-20]} castShadow />
                <Floor select={select} setSelect={setSelect} floor_color={color_floor} />
                <Wall  select={select} setSelect={setSelect} wall_color={color_wall}/>
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