import { useRef, useEffect } from 'react'
import { useLoader } from '@react-three/fiber';
import { usePlane } from '@react-three/cannon';
import { useGLTF, MeshReflectorMaterial } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import trackObj from './Assets/track.glb';
import { ColliderBox } from './ColliderBox';

export function Track(){
    const result = useLoader(
        GLTFLoader,
        trackObj
    );

    let geometry = result.scene.children[0].geometry;

    return (
        <>
            <mesh>
                <primitive object={geometry} attach={'geometry'} />
            </mesh>
            <ColliderBox position={[10, 0, 10]} scale={[1, 1, 1]} />
        </> 
    )
}