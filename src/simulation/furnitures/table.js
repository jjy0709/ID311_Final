import React, { useMemo, useState } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

import bodyUrl from '../objects/table/wood.obj'
import legUrl from '../objects/table/leg.obj'

function Table({select, setSelect, pos, id}) {
    const [position, setPosition] = useState(pos);
    const [rotation, setRotation] = useState(0);
    const [color, setColor] = useState('#99825e');
    const [removed , setRemoved] = useState(false);

    // for click move
    const [prev, setPrev] = useState();
    const [drag, setDrag] = useState(false);
    
    const BodyMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color(color)});
    const body = useLoader(OBJLoader, bodyUrl);
    const bodymodel = useMemo(() => body.clone(true), []);
    bodymodel.children.forEach((mesh, i) => { 
        mesh.material = BodyMaterial;
        const edge = new THREE.LineSegments(
            new THREE.EdgesGeometry(mesh.geometry),
            new THREE.LineBasicMaterial({ color: (select&&select.key === id)?0xC71585:color, linewidth: 1 })
        );
        mesh.add(edge);
    });

    const LegMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color('#595959')});
    const leg = useLoader(OBJLoader, legUrl);
    const legmodel = useMemo(() => leg.clone(true), []);
    legmodel.children.forEach((mesh, i) => { 
        mesh.material = LegMaterial;
        const edge = new THREE.LineSegments(
            new THREE.EdgesGeometry(mesh.geometry),
            new THREE.LineBasicMaterial({ color: (select&&select.key === id)?0xC71585:'#595959', linewidth: 4 })
        ); 
        mesh.add(edge);
    });

    const down = (e, sector) => {
        setSelect({...select,id:'Table', key:id, color, setColor, setRemoved});
        setPrev(new THREE.Vector3(e.point.x, e.point.y, e.point.z));
        setDrag(true);
    }

    const move = (e) => {
        if(drag) {
            const newPosition = position.clone();
            newPosition.add(new THREE.Vector3(e.point.x,e.point.y,e.point.z));
            newPosition.sub(prev);
            newPosition.y = -14;
            // setPosition(newPosition);
            setPrev(new THREE.Vector3(e.point.x, e.point.y, e.point.z));  
        }
    }

    const up = (e) => {
        const newPosition = position.clone();
        newPosition.add(new THREE.Vector3(e.point.x,e.point.y,e.point.z));
        newPosition.sub(prev);
        newPosition.y = -14;
        // setPosition(newPosition);
        setDrag(false);
    }
    
    if(select.key === id) {
        document.onkeydown = function(e) {
            const newPosition = position.clone();
            if(e.key === 'ArrowUp') {
                newPosition.x -= 0.5;
                newPosition.z -= 0.5;
            } else if(e.key === 'ArrowDown') {
                newPosition.x += 0.5;
                newPosition.z += 0.5;
            } else if(e.key === 'ArrowRight') {
                newPosition.x += 0.5;
                newPosition.z -= 0.5;
            } else if(e.key === 'ArrowLeft') {
                newPosition.x -= 0.5;
                newPosition.z += 0.5;
            } else if (e.key === ' ') {
                setRotation(rotation+1);
            } else if (e.key === 'c') {
                console.log(newPosition);
            }
            if (newPosition.x < -19){
                newPosition.x = -19
            }
            if (newPosition.x > 19.5){
                newPosition.x = 19.5
            }
            if (newPosition.z < -19){
                newPosition.z = -19
            }
            if (newPosition.z > 19.5){
                newPosition.z = 19.5
            }
            setPosition(newPosition);
            return false;
        }
    }

    return  (
        removed?<></>:
        <mesh castShadow scale={0.07} position={position} rotation-y={Math.PI/4-Math.PI*rotation/2}>
        <group>
        <primitive onPointerDown={(e) => down(e,0)} object={bodymodel}/>
        <primitive onPointerDown={(e) => down(e,1)} object={legmodel} />
        </group>
        </mesh>
    )
}

export default Table;