import * as Three from 'three';
 import { useThree } from "@react-three/fiber";
 import { useState } from "react";
 import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei';

 function Camera({pos}) {
    const { camera } = useThree();

    function changePosition(e) {
        if(e.key === 'ArrowUp') {
            camera.position.x = 100;
            camera.position.y = 0;
            camera.position.z = 0;
            camera.lookAt(0,0,0);
        } else if (e.key === 'ArrowDown') {
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 100;
            camera.lookAt(0,0,0);
        } else if (e.key === 'ArrowLeft') {
            camera.position.x = 100;
            camera.position.y = 0;
            camera.position.z = 100;
            camera.lookAt(0,0,0);
        }
    }

    document.addEventListener('keydown', changePosition);
    
     return (
         <>
         </>
     )
 }

 export default Camera;