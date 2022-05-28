import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import catUrl from './objects/cat.obj'
import wallUrl from './objects/wall.stl'
import { useMemo, useState } from 'react'

function Cat() {
    const [position, setPosition] = useState([0,-5,-5]);
    let prevPosition = [...position];
    const BasicMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(0x0000ff)});
    const obj = useLoader(OBJLoader, catUrl);
    const obj2 = useLoader(STLLoader, wallUrl);
    const model = useMemo(() => obj.clone(true), []);
    const click = (e) => {
        prevPosition = e.point;
    }
    const up = (e) => {
        // console.log("up");
        const afterPosition = e.point;
        let newPosition = [...position];
        newPosition[0] = position[0] + afterPosition[0] - prevPosition[0];
        newPosition[1] = position[1] + afterPosition[1] - prevPosition[1];
        newPosition[2] = position[2] + afterPosition[2] - prevPosition[2];
        // setPosition(afterPosition);
    }

    model.children.forEach((mesh, i) => { mesh.material = BasicMaterial; });
    return <primitive scale={0.1} rotation-x={-Math.PI/2} object={model} position={position} 
                onPointerDown={(e) => click(e)} onPointerOver={(e)=>up(e)}/>
}

export default Cat;