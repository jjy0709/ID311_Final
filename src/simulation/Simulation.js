import React, { useState } from 'react';
import * as Three from 'three';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom'

import { Floor, Wall } from '../floorplan/wall';
import * as Furniture from './furnitures/index.js'
import Sidebar from './sidebar/Sidebar';

import ChairIcon from '@mui/icons-material/Chair';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HelpIcon from '@mui/icons-material/Help';
// import SaveIcon from '@mui/icons-material/Save';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import './Simulation.css';

function Simulation() {
    const [color_wall, setColor_wall] = useState('#fff');
    const [color_floor, setColor_floor] = useState('#fff');
    const [select, setSelect] = useState({color:'#fff'});
    const [cameraPosition, setCameraPosition] = useState([0,60,100]);
    const [zoom, setZoom] = useState(10);
    const [option, setOption] = useState();
    
    const [furnitures, setFurniture] = useState([]);
    const addFurniture = (id) => {
        setFurniture([...furnitures, id]);
    }

    const selectOption = (op) => {
        setOption(op);
    }

    const changewallcolor = (wallcolor)=>{
        setColor_wall(wallcolor);
    }

    const changefloorcolor = (floorcolor)=>{
        setColor_floor(floorcolor);
    }

    console.log(select.color);
    return(
        <div className="Screen">
            <Link to='/'><div className='gobackBtn'><ArrowBackIosIcon/></div></Link>
            <div className="sidebar">
                <div className = "sidebartitle">
                    Menu
                </div>
                <ul className='furnitureli'>
                    <li className="option" onClick={()=>selectOption('furniture')}><ChairIcon/></li>
                    <li className="option" onClick={()=>selectOption('color')}><ColorLensIcon/></li>
                    <li className="option" onClick={()=>setFurniture([])}><LightbulbIcon/></li>
                </ul>
                <div className="content">
                    <Sidebar option={option} addFurniture={addFurniture} select={select} changewallcolor={changewallcolor} changefloorcolor={changefloorcolor}/>
                </div>
            </div>
            <Canvas orthographic camera={{position:cameraPosition, zoom:zoom}}>
                <pointLight position={[0, 0, 100]} castShadow/>
                <directionalLight position={[20,20,20]} castShadow />
                <Floor select={select} setSelect={setSelect} floor_color={color_floor}/>
                <Wall left={true} select={select} setSelect={setSelect} wall_color = {color_wall}/>
                <Wall left={false} select={select} setSelect={setSelect} wall_color = {color_wall}/>
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
            <ul className='screenli'>
                {/* <li className='screenoption'><SaveIcon/></li>
                <li className='screenoption'><CloudUploadIcon/></li> */}
                <li className='screenoption'><HelpIcon/></li>
                <li className='screenoption'><AddAPhotoIcon/></li>
                <li className='screenoption'><DeleteIcon/></li>
            </ul>
        </div>
    );
}

export default Simulation;