import React from 'react'
import carObj from './Assets/truck.glb'
import { useGLTF } from '@react-three/drei'

const Car = () => {
    const { scene, animations} = useGLTF(carObj);
  return (
    <mesh position={[0, 0, 0] }>
        <primitive object={scene} />
    </mesh>
  )
}

export default Car
