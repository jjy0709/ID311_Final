import React, { useMemo, useState } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

import bodyUrl from '../objects/desk/wood.obj'
import legUrl from '../objects/desk/leg.obj'
import whiteUrl from '../objects/desk/white.obj'

function Desk({select, setSelect, pos, id}) {
    const [position, setPosition] = useState(pos);
    const [rotation, setRotation] = useState(0);
    const [color, setColor] = useState('#99825e');

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

    const LegMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color(0x595959)});
    const leg = useLoader(OBJLoader, legUrl);
    const legmodel = useMemo(() => leg.clone(true), []);
    legmodel.children.forEach((mesh, i) => { 
        mesh.material = LegMaterial;
        const edge = new THREE.LineSegments(
            new THREE.EdgesGeometry(mesh.geometry),
            new THREE.LineBasicMaterial({ color: (select&&select.key === id)?0xC71585:0x595959, linewidth: 4 })
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
            new THREE.LineBasicMaterial({ color: (select&&select.key === id)?0xC71585:0xffffff, linewidth: 4 })
        );  
        mesh.add(edge);
    });

    const down = (e, sector) => {
        setSelect({...select,id:'Desk', key:id, color, setColor});
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

    document.onkeydown = function(e) {
        const newPosition = position.clone();
        const xlimit1 = [-17, -13.5, -24.5, -14];
        const xlimit2 = [24.5, 14, 17.5, 14];
        const zlimit1 = [-13.5, -17, -14, -24.5];
        const zlimit2 = [14, 24.5, 14, 17.5];
        if(select.key === id) {
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
            if (newPosition.x < xlimit1[rotation%4]){
                newPosition.x = xlimit1[rotation%4]
            }
            if (newPosition.x > xlimit2[rotation%4]){
                newPosition.x = xlimit2[rotation%4]
            }
            if (newPosition.z < zlimit1[rotation%4]){
                newPosition.z = zlimit1[rotation%4]
            }
            if (newPosition.z > zlimit2[rotation%4]){
                newPosition.z = zlimit2[rotation%4]
            }
            setPosition(newPosition);
            return false;
        }
    }

    return  (
        <mesh castShadow scale={0.07} position={position} rotation-y={Math.PI/2-Math.PI*rotation/2}>
        <group>
        <primitive onPointerDown={(e) => down(e,0)} object={bodymodel}/>
        <primitive onPointerDown={(e) => down(e,1)} object={legmodel} />
        <primitive onPointerDown={(e) => down(e,2)} object={whitemodel} />
        </group>
        </mesh>
    )
}

export default Desk;