import * as Three from 'three';
import { useThree } from "@react-three/fiber";
import { useState } from "react";
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei';

function Camera() {
    const {camera} = useThree();
    const [position, setPosition] = useState(camera.position);
    
    return (
        <OrthographicCamera position={position} />
    )
}

export default Camera;