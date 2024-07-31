import React from 'react'
import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial } from '@react-three/drei';


export function Floor(){
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, 0]}>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial color={"blue"} />
        </mesh>
    )
}

