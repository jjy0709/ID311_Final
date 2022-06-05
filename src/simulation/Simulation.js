import React, { useRef, useState } from 'react';
import * as Three from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, useScroll } from '@react-three/drei';
import Cat from './cat';

import './Simulation.css';
import { Floor, Wall } from './Wall';
import Camera from './Camera';
import Bed from './bed';
import Desk from './desk';
import Sidebar from './sidebar/Sidebar';

function Simulation() {
    const [select, setSelect] = useState({id:-1});
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

    // document.onkeydown = function(e) {
    //     if(e.key == 'ArrowUp') {
    //         if(select.keyup) {
    //             // console.log("BB");
    //             select.keyup();
    //         }
    //     }
    // }

    return(
        <div className="Screen">
            <div className="sidebar">
                <ul>
                    <li className="option" onClick={()=>selectOption('furniture')} >Add Furniture</li>
                    <li className="option" onClick={()=>selectOption('view')}>Another View</li>
                    <li className="option" onClick={()=>selectOption('color')}>Change Color</li>
                </ul>
                <div className="content">
                    <Sidebar option={option} addFurniture={addFurniture} select={select}/>
                </div>
            </div>
            <Canvas orthographic camera={{position:cameraPosition, zoom:zoom}}>
                {/* <OrbitControls /> */}
                <Camera />
                {/* <ambientLight castShadow/> */}
                <pointLight position={[0,0, 100]} castShadow/>
                <directionalLight position={[20,20,20]} castShadow />
                <Floor select={select} setSelect={setSelect} />
                <Wall left={true} select={select} setSelect={setSelect}/>
                <Wall left={false} select={select} setSelect={setSelect}/>
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