import React, { useState } from 'react';
import * as Three from 'three';
import { Canvas } from '@react-three/fiber';
import { cam_list } from './sidebarresource';

import { Floor, Wall } from './furnitures/wall';
import * as Furniture from './furnitures/index.js'
import Sidebar from './sidebar/Sidebar';
import ReactTooltip from 'react-tooltip';

import ChairIcon from '@mui/icons-material/Chair';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DeleteIcon from '@mui/icons-material/Delete';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';

import './Simulation.css';
import Camera from './Camera';

function Simulation() {
    const [select, setSelect] = useState({color:'#fff'});
    const [renderer, setRenderer] = useState();
    const [option, setOption] = useState();
    
    const [furnitures, setFurniture] = useState([]);

    const [color_wall, setColor_wall] = useState('#fff');
    const [color_floor, setColor_floor] = useState('#fff');

    const [menu, setMenu] = useState([0,0,0]);
    const [cameratoggle, setCameraToggle] = useState(false);

    const [camera, setCamera] = useState(3);

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

    const togglecameraMenu = ()=>{
        setCameraToggle(cameratoggle=>!cameratoggle)
    }


    const screenShot = () => {
        const image = renderer.domElement.toDataURL('image/png');
        const a = document.createElement("a");
        a.href = image.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        a.download="image.png"
        a.click();
    }

    const delete_ = (e) => {
        if(e.key === 'd') {
            if(select && select.key > -1) {
                select.setRemoved(true);
            }
        }
    }

    document.onkeyup = delete_;
    
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
                </ul>
                <div className="content">
                    <Sidebar option={option} addFurniture={addFurniture} select={select} changewallcolor={changewallcolor} changefloorcolor={changefloorcolor}/>
                </div>
            </div>
            <Canvas gl={canvas => canvasRenderer(canvas)} orthographic camera={{position:[100,60,100], zoom:10}} >
                <Camera pos={camera}/>
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
            <ul className='screenli'>
                <li className='screenoption' onClick={()=>screenShot()}><a data-tip="Screenshot"><AddAPhotoIcon className='screenoptionicon'/></a><ReactTooltip place="left" type="light" effect="solid"/></li>
                <li className='screenoption' onClick={()=>setFurniture([])}><a data-tip="Delete All"><DeleteIcon className='screenoptionicon'/></a><ReactTooltip place="left" type="light" effect="solid"/></li>
                <li className='screenoption' onClick={()=>togglecameraMenu()}><a data-tip="Camera angle"><FlipCameraIosIcon className='screenoptionicon'/></a><ReactTooltip place="left" type="light" effect='solid'/></li>
                    <div className={cameratoggle ? "optiontoggled" : "optionnottoggled"}>
                        {cam_list.map((e,i) => {
                            return (<img className={cameratoggle ? "toggled" : "nottoggled"} src={cameratoggle ? e.img : ''} onClick={() => setCamera(i)} key={i}/>);
                        })}
                    </div>
            </ul>
        </div>
    );
}

export default Simulation;