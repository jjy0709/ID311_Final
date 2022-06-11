import {ChromPicker} from 'react-color';
import { useState } from 'react';
import * as Three from 'three'
import { Edges } from '@react-three/drei';

function Floor({select, setSelect}) {
    const [color, setColor] = useState('#ffffff');
    const down = (e) => {
        setSelect({...select, id:'Floor', key:'floor', setColor});
    }
    const color_c = getCompColor(color);
    return (
        <mesh rotation-x={-Math.PI/2} rotation-z={Math.PI/2} position={[0,-24.5,0]} castShadow receiveShadow onPointerDown={(e)=>down(e)}>
            <boxBufferGeometry attach="geometry" args={[50, 50, 1]} />
            <Edges color={(select&&select.id === 'Floor')?color_c:color} />
            <meshPhongMaterial color={color}  />
        </mesh>
    )
}

function Wall({select, setSelect}) {
    const [color, setColor] = useState('#ffffff');
    // const position = left?[-18,0,-18]:[18,0,-18];
    // const angle = left?-Math.PI*3/4:Math.PI*3/4;
    const down = (e) => {
        setSelect({...select, id:'Wall', key:'wall', setColor})
    }
    const color_c = getCompColor(color);
    
    return (
        <>
        <mesh position={[-25,0,0]} rotation-y={-Math.PI/2} receiveShadow onPointerDown={(e)=>down(e)}>
            {/* <planeBufferGeometry attach="geometry" args={[10,10]} /> */}
            <boxBufferGeometry attach="geometry" args={[50, 50, 1]} />
            <Edges color={(select&&select.id === 'Wall')?color_c:color} />
            <meshPhongMaterial color={color} />
        </mesh>
        <mesh position={[0,0,-25]} rotation-y={0} receiveShadow onPointerDown={(e)=>down(e)}>
            {/* <planeBufferGeometry attach="geometry" args={[10,10]} /> */}
            <boxBufferGeometry attach="geometry" args={[50, 50, 1]} />
            <Edges color={(select&&select.id === 'Wall')?color_c:color} />
            <meshPhongMaterial color={color} />
        </mesh>
        </>
    )
}

function getCompColor(color) {
    const number = color.slice(1);
    const red = Number("0x" + number.slice(0,2));
    const green = Number("0x" + number.slice(2,4));
    const blue = Number("0x" + number.slice(4));
    const red_ = (255 - red).toString(16);
    const green_ = (255 - green).toString(16);
    const blue_ = (255 - blue).toString(16);
    return '#' + red_ + green_ + blue_;
}

export { Floor, Wall, getCompColor };