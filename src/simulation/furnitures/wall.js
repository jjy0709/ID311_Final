function Floor({select, setSelect, floor_color}) {
    const down = (e) => {
        setSelect({...select, id:'Floor', key:'floor'});
    }

    return (
        <mesh rotation-x={-Math.PI/2} rotation-z={Math.PI/2} position={[0,-24.5,0]} castShadow receiveShadow onPointerDown={(e)=>down(e)}>
            <boxBufferGeometry attach="geometry" args={[50, 50, 1]} />
            <meshPhongMaterial color={floor_color}  />
        </mesh>
    )
}

function Wall({select, setSelect, wall_color}) {
    const down = (e) => {
        setSelect({...select, id:'Wall', key:'wall'})
    }

    return (
        <>
        <mesh position={[-25,0,0]} rotation-y={-Math.PI/2} receiveShadow onPointerDown={(e)=>down(e)}>
            <boxBufferGeometry attach="geometry" args={[50, 50, 1]} />
            <meshPhongMaterial color={wall_color} />
        </mesh>
        <mesh position={[0,0,-25]} rotation-y={0} receiveShadow onPointerDown={(e)=>down(e)}>
            <boxBufferGeometry attach="geometry" args={[50, 50, 1]} />
            <meshPhongMaterial color={wall_color} />
        </mesh>
        </>
    )
}

export { Floor, Wall };