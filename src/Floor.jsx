import { useRef } from 'react'
import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial } from '@react-three/drei';


export function Floor(){
    const [ref] = usePlane (() => ({
        type: 'Static',
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
    }),
        useRef(null),
    );   



    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial color={"blue"} />
        </mesh>
    )
}

