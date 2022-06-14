import React, { useMemo, useState } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

import bodyUrl from '../objects/bed/body.obj'
import legUrl from '../objects/bed/leg.obj'
import greenUrl from '../objects/bed/green.obj'
import whiteUrl from '../objects/bed/white.obj'

function Bed({select, setSelect, pos, id}) {
    const [position, setPosition] = useState(pos);
    const [rotation, setRotation] = useState(0);
    const [color, setColor] = useState('#449647');
    const [removed , setRemoved] = useState(false);

    const [prev, setPrev] = useState();
    const [drag, setDrag] = useState(false);

    const BodyMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color(0x99825e)});
    const body = useLoader(OBJLoader, bodyUrl);
    const bodymodel = useMemo(() => body.clone(true), []);
    bodymodel.children.forEach((mesh, i) => { 
        mesh.material = BodyMaterial;
        const edge = new THREE.LineSegments(
            new THREE.EdgesGeometry(mesh.geometry),
            new THREE.LineBasicMaterial({ color: (select&&select.key === id)?0xC71585:0x99825e, linewidth: 1 })
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
            new THREE.LineBasicMaterial({ color: (select&&select.key === id)?0xC71585:0x595959, linewidth: 1 })
        );
        mesh.add(edge);
    });

    const GreenMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color(color)});
    
    const green = useLoader(OBJLoader, greenUrl);
    const greenmodel = useMemo(() => green.clone(true), []);
    greenmodel.children.forEach((mesh, i) => { 
        mesh.material = GreenMaterial;
        const edge = new THREE.LineSegments(
            new THREE.EdgesGeometry(mesh.geometry),
            new THREE.LineBasicMaterial({ color: (select&&select.key === id)?0xC71585:color, linewidth: 1 })
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
            new THREE.LineBasicMaterial({ color: (select&&select.key === id)?0xC71585:0xffffff, linewidth: 1 })
        );
        mesh.add(edge);
    });

    const down = (e, sector) => {
        setSelect({...select,id:'Bed',key:id, color, setColor, setRemoved});
        setPrev(new THREE.Vector3(e.point.x, e.point.y, e.point.z));
        setDrag(true);
    }

    if(select.key === id) {
        document.onkeydown = function(e) {
        const newPosition = position.clone();
        const xlimit1 = [-23.5, -35.5, -13.5, 12.5];
        const xlimit2 = [14, -12, 24.5, 36];
        const zlimit1 = [-35.5, -14, 12.5, -23.5];
        const zlimit2 = [-12, 24.5, 36, 14.5];
        let rot = rotation;
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
            rot = rot%4;
            if(rot === 0) {
                newPosition.x -= 24;
                newPosition.z += 24;
            } else if(rot === 1) {
                newPosition.x += 24;
                newPosition.z += 24;
            } else if(rot === 2) {
                newPosition.x += 24;
                newPosition.z -= 24;
            } else if(rot === 3) {
                newPosition.x -= 24;
                newPosition.z += 24;
            }
            rot += 1;
            setRotation(rotation+1);
        } else if (e.key === 'c') {
            console.log(newPosition);
        }
        if (newPosition.x < xlimit1[rot%4]){
            newPosition.x = xlimit1[rot%4]
        }
        if (newPosition.x > xlimit2[rot%4]){
            newPosition.x = xlimit2[rot%4]
        }
        if (newPosition.z < zlimit1[rot%4]){
            newPosition.z = zlimit1[rot%4]
        }
        if (newPosition.z > zlimit2[rot%4]){
            newPosition.z = zlimit2[rot%4]
        }
        setPosition(newPosition);
        return false;
        }
    }

    return  (
        removed?<></>:
        <mesh position={position} scale={0.04} rotation-y={-Math.PI/2 + Math.PI/2*rotation}>
        <group>
        <primitive onPointerDown={(e) => down(e, 0)} object={bodymodel}  />
        <primitive onPointerDown={(e) => down(e, 1)} object={legmodel} />
        <primitive onPointerDown={(e) => down(e, 2)} object={greenmodel} />
        <primitive onPointerDown={(e) => down(e, 3)} object={whitemodel} />
        </group>
        </mesh>
    )
}

export default Bed;