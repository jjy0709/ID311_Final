import React from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader, useThree } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useState } from 'react'

import bodyUrl from './objects/desk/wood.obj'
import legUrl from './objects/desk/leg.obj'
import whiteUrl from './objects/desk/white.obj'

function Desk({select, setSelect, pos, id}) {
    const [position, setPosition] = useState(pos);
    const [prev, setPrev] = useState();
    const [drag, setDrag] = useState(false);

    const BodyMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color(0x99825e)});
    
    const body = useLoader(OBJLoader, bodyUrl);
    const bodymodel = useMemo(() => body.clone(true), []);
    bodymodel.children.forEach((mesh, i) => { 
        mesh.material = BodyMaterial;
        const edge = new THREE.LineSegments(
            new THREE.EdgesGeometry(mesh.geometry),
            new THREE.LineBasicMaterial({ color: (select&&select.id == id)?0xC71585:0x99825e, linewidth: 1 })
        );
        mesh.add(edge);
    });

    const LegMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color(0x595959)});
    
    const leg = useLoader(OBJLoader, legUrl);
    const legmodel = useMemo(() => leg.clone(true), []);
    legmodel.children.forEach((mesh, i) => { 
        mesh.material = LegMaterial;
        const edge = new THREE.LineSegments(
            new THREE.EdgesGeometry(mesh.geometry),
            new THREE.LineBasicMaterial({ color: (select&&select.id == id)?0xC71585:0x595959, linewidth: 4 })
        ); 
        mesh.add(edge);
    });

    const WhiteMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color(0xffffff)});
    
    const white = useLoader(OBJLoader, whiteUrl);
    const whitemodel = useMemo(() => white.clone(true), []);
    whitemodel.children.forEach((mesh, i) => { 
        mesh.material = WhiteMaterial;
        const edge = new THREE.LineSegments(
            new THREE.EdgesGeometry(mesh.geometry),
            new THREE.LineBasicMaterial({ color: (select&&select.id == id)?0xC71585:0xffffff, linewidth: 4 })
        );  
        mesh.add(edge);
    });

    const down = (e, sector) => {
        setSelect({...select,id, sector, onWall: false});
        setPrev(new THREE.Vector3(e.point.x, e.point.y, e.point.z));
        setDrag(true);
    }

    const move = (e) => {
        if(drag) {
            const newPosition = position.clone();
            newPosition.add(new THREE.Vector3(e.point.x,e.point.y,e.point.z));
            newPosition.sub(prev);
            newPosition.y = -14;
            setPosition(newPosition);
            setPrev(new THREE.Vector3(e.point.x, e.point.y, e.point.z));  
        }
    }

    const up = (e) => {
        const newPosition = position.clone();
        newPosition.add(new THREE.Vector3(e.point.x,e.point.y,e.point.z));
        newPosition.sub(prev);
        newPosition.y = -14;
        setPosition(newPosition);
        setDrag(false);
    }

    const key = (e) => {
        const newPosition = position.clone();
        // newPosition.x += 1;
        newPosition.z -= 1;
        setPosition(newPosition);
    }

    document.onkeydown = function(e) {
        const newPosition = position.clone();
        if(select.id == id) {
            if(e.key == 'ArrowUp') {
                newPosition.z -= 1;
            } else if(e.key == 'ArrowDown') {
                newPosition.z += 1;
            } else if(e.key == 'ArrowRight') {
                newPosition.x += 1;
            } else if(e.key == 'ArrowLeft') {
                newPosition.x -= 1;
            } else if(e.key == 'C'){
                console.log('desk space event')
            }
            setPosition(newPosition);
        }
    }

    return  (
        <mesh castShadow scale={0.07} onPointerUp={(e)=>up(e)} onPointerMove={(e)=>move(e)} position={position} rotation-y={Math.PI/4}>
        <group>
        <primitive onPointerDown={(e) => down(e,0)} object={bodymodel}/>
        <primitive onPointerDown={(e) => down(e,1)} object={legmodel} />
        <primitive onPointerDown={(e) => down(e,2)} object={whitemodel} />
        </group>
        </mesh>
    )
}

export default Desk;