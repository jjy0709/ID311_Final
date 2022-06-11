import { useState } from "react";

function Floor({select, setSelect}) {
    const [color, setColor] = useState(0x5555ff);
    const down = (e) => {
        setSelect({...select, id: 'floor', color, setColor})
    }
    return (
        <mesh rotation-x={-Math.PI/2} rotation-z={Math.PI/4} position={[0,-24.5,0]} castShadow receiveShadow onPointerDown={(e) => down(e)}>
            <boxBufferGeometry attach="geometry" args={[50, 50, 1]} />
            <meshPhongMaterial color={color} />
        </mesh>
    )
}

function Wall({left, select, setSelect}) {
    const position = left?[-18,0,-18]:[18,0,-18];
    const angle = left?-Math.PI*3/4:Math.PI*3/4;
    return (
        <mesh position={position} rotation-y={angle} receiveShadow onPointerDown={()=>setSelect({...select, id: -1})}>
            {/* <planeBufferGeometry attach="geometry" args={[10,10]} /> */}
            <boxBufferGeometry attach="geometry" args={[50, 50, 1]} />
            <meshPhongMaterial color={0xffff00} />
        </mesh>
    )
}

export { Floor, Wall };