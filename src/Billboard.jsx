import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber'

export function Billboard({position, image}){
    const texture = useLoader(TextureLoader, image);

    return (
        <mesh position={position}>
            <planeGeometry args={[10, 5]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
}