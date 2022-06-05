import React from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useState } from 'react'

import bodyUrl from './objects/bed/body.obj'
import legUrl from './objects/bed/leg.obj'
import greenUrl from './objects/bed/green.obj'
import whiteUrl from './objects/bed/white.obj'

function Bed({setSelect}) {
    const [position, setPosition] = useState(new THREE.Vector3(35,-20,-15));
    const [colors, setColor] = useState();
    const BodyMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color(0x99825e)});
    
    const body = useLoader(OBJLoader, bodyUrl);
    const bodymodel = useMemo(() => body.clone(true), []);
    bodymodel.children.forEach((mesh, i) => { 
        mesh.material = BodyMaterial;
    });

    const LegMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color(0x595959)});
    
    const leg = useLoader(OBJLoader, legUrl);
    const legmodel = useMemo(() => leg.clone(true), []);
    legmodel.children.forEach((mesh, i) => { 
        mesh.material = LegMaterial;
    });

    const GreenMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color(0x449647)});
    
    const green = useLoader(OBJLoader, greenUrl);
    const greenmodel = useMemo(() => green.clone(true), []);
    greenmodel.children.forEach((mesh, i) => { 
        mesh.material = GreenMaterial;
    });

    const WhiteMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color(0xffffff)});
    
    const white = useLoader(OBJLoader, whiteUrl);
    const whitemodel = useMemo(() => white.clone(true), []);
    whitemodel.children.forEach((mesh, i) => { 
        mesh.material = WhiteMaterial;
    });

    const click = (id) => {
        setSelect({obj: this, id: id, setPosition, onWall: false});
    }

    return  (
        <React.Fragment>
        <primitive scale={0.04} rotation-y={-Math.PI*3/4} onPointerDown={click(0)} object={bodymodel} position={position} />
        <primitive scale={0.04} rotation-y={-Math.PI*3/4} onPointerDown={click(1)} object={legmodel} position={position} />
        <primitive scale={0.04} rotation-y={-Math.PI*3/4} onPointerDown={click(2)} object={greenmodel} position={position} />
        <primitive scale={0.04} rotation-y={-Math.PI*3/4} onPointerDown={click(3)} object={whitemodel} position={position} />
        </React.Fragment>
    )
}

export default Bed;