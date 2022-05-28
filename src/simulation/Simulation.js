import React, { useRef } from 'react';
import * as Three from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Cat from './cat';

import './Simulation.css';
import { Floor, Wall } from './Wall';

function Simulation() {
    const objLoader = new Three.ObjectLoader();
    const move = (e) => {
        
    }
    const axisHelper = new Three.AxesHelper(5);
    axisHelper.setColors(new Three.Color(0xff0000),new Three.Color(0x00ff00),new Three.Color(0x0000ff));
    return(
        <div>
            Simulation
            <Canvas onMouseMove={(e) => move(e)}>
                <primitive object={axisHelper} />
                <OrbitControls />
                <Floor />
                <Wall />
                <Cat />
            </Canvas>
        </div>
    );
}

export default Simulation;