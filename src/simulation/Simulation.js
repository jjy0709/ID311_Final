import React, { useState } from 'react';
import * as Three from 'three';
import { Canvas } from '@react-three/fiber';
import { cam_list } from './sidebarresource';

import { Floor, Wall } from '../floorplan/wall';
import * as Furniture from './furnitures/index.js'
import Sidebar from './sidebar/Sidebar';

import ChairIcon from '@mui/icons-material/Chair';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DeleteIcon from '@mui/icons-material/Delete';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';

import './Simulation.css';
import ReactTooltip from 'react-tooltip';

function Simulation() {
    const [color_wall, setColor_wall] = useState('#fff');
    const [color_floor, setColor_floor] = useState('#fff');
    const [select, setSelect] = useState({color:'#fff'});
    const [cameraPosition, setCameraPosition] = useState([0,60,100]);
    const [zoom, setZoom] = useState(10);
    const [option, setOption] = useState();
    const [menu, setMenu] = useState([0,0,0]);
    const [cameratoggle, setCameraToggle] = useState(false);
    
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

    const togglecameraMenu = ()=>{
        setCameraToggle(cameratoggle=>!cameratoggle)
    }

    console.log(select.color);
    return(
        <div className="Screen">
            <div className="sidebar">
                <div className = "sidebartitle">
                    Menu
                </div>
                <ul className='furnitureli'>
                    <li className={menu[0] ? 'activate' : 'option'} onClick={()=>{selectOption('furniture')
                        setMenu([1,0,0])}}><ChairIcon /></li>
                    <li className={menu[1] ? 'activate' : 'option'} onClick={()=>{selectOption('color')
                        setMenu([0,1,0])}}><ColorLensIcon /></li>
                    <li className={menu[2] ? 'activate' : 'option'} onClick={()=>{selectOption('light')
                        setMenu([0,0,1])}}><LightbulbIcon /></li>
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
                <li className='screenoption'><a data-tip="Screenshot"><AddAPhotoIcon className='screenoptionicon'/></a><ReactTooltip place="left" type="light" effect="solid"/></li>
                <li className='screenoption'><a data-tip="Reset"><DeleteIcon className='screenoptionicon'/></a><ReactTooltip place="left" type="light" effect="solid"/></li>
                <li className='screenoption' onClick={()=>togglecameraMenu()}><a data-tip="Camera angle"><FlipCameraIosIcon className='screenoptionicon'/></a><ReactTooltip place="left" type="light" effect='solid'/></li>
                    <div className={cameratoggle ? "optiontoggled" : "optionnottoggled"}>
                        {cam_list.map((e,i) => {
                            return (<img className={cameratoggle ? "toggled" : "nottoggled"} src={e.img} onClick={cameratoggle ? "rotatecamera" : ''} key={i}/>);
                        })}
                    </div>
            </ul>
            
        </div>
    );
}

export default Simulation;