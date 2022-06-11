import * as Three from 'three';
import { useThree } from "@react-three/fiber";
import { useState } from "react";
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei';

function Camera(position, zoom) {
    const {camera} = useThree();
    // const [position, setPosition] = useState(camera.position);
    console.log('camera :',position)

    return (
        <OrthographicCamera position = {position} zoom = {zoom}/>
    )
}

export default Camera;