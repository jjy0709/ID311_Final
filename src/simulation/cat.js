import React from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import catUrl from './objects/cat.obj'
import { useMemo, useState } from 'react'

function Cat() {
    const [position, setPosition] = useState(new THREE.Vector3(0,0.5,0));
    const [prevClick, setClick] = useState(new THREE.Vector3(0,0,0));
    
    const [drag, setDrag] = useState(false);
    const BasicMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(0x0000ff)});
    
    const obj = useLoader(OBJLoader, catUrl);
    const model = useMemo(() => obj.clone(true), []);
    const [box, setBox] = useState(new THREE.Box3().setFromObject(model));
    const { camera } = useThree();
    const cameraLookAt = new THREE.Vector3();
    camera.getWorldDirection(cameraLookAt);
    const scene = new THREE.Plane(cameraLookAt, 0);
    const down = (e) => {
        const center = new THREE.Vector3();
        box.getCenter(center);
        const proj = new THREE.Vector3();
        scene.projectPoint(new THREE.Vector3(e.point.x,e.point.y,e.point.z), proj);
        // setPosition(new THREE.Vector3(proj.x,0.5,proj.z));        
        setPosition(new THREE.Vector3(e.point.x, 0.5, e.point.z - 3));        
        setDrag(true);
    }

    const over = (e) => {
        if(drag) {
            const center = new THREE.Vector3();
            box.getCenter(center);
            const proj = new THREE.Vector3();
            scene.projectPoint(new THREE.Vector3(e.point.x,e.point.y,e.point.z), proj);
            // setPosition(new THREE.Vector3(proj.x,0.5,proj.z));   
        setPosition(new THREE.Vector3(e.point.x, 0, e.point.z - 3));        

        }
    }
    
    const up = (e) => {
        const center = new THREE.Vector3();
        box.getCenter(center);
        const proj = new THREE.Vector3();
        scene.projectPoint(new THREE.Vector3(e.point.x,e.point.y,e.point.z), proj);
        // setPosition(new THREE.Vector3(proj.x,0.5,proj.z)); 
        setPosition(new THREE.Vector3(e.point.x, 0, e.point.z - 3));        

        setDrag(false);
    }

    model.children.forEach((mesh, i) => { 
        mesh.material = BasicMaterial;
    });
    // shadow.children.forEach((mesh, i) => { mesh.material = ShadowMaterial; });
    return  (
        <React.Fragment>
        <primitive scale={0.3} rotation-x={-Math.PI/2} object={model} position={position} 
            onPointerDown={(e) => down(e)} onPointerMove={(e)=>over(e)} onPointerUp={(e)=>up(e)}/>
        {/* <primitive scale={0.1} rotation-x={-Math.PI/2} object={shadow} position={[0,0,0]} 
            onPointerDown={(e) => click(e)} onPointerOver={(e)=>up(e)}/> */}
        </React.Fragment>
    )
}

export default Cat;