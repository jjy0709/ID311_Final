function Floor() {
    return (
        <mesh rotation-x={-Math.PI/2} position={[0,-10,0]}>
            <boxBufferGeometry attach="geometry" args={[10, 10, 1]} />
            <meshBasicMaterial color={0xffff00}  />
        </mesh>
    )
}

function Wall() {
    return (
        <mesh position={[0,-5,-5]}>
            {/* <planeBufferGeometry attach="geometry" args={[10,10]} /> */}
            <boxBufferGeometry attach="geometry" args={[10, 10, 1]} />
            <meshBasicMaterial color={0xff00ff} />
        </mesh>
    )
}

export { Floor, Wall };