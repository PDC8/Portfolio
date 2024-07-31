import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Floor } from './Floor';
import Car from './Car';

const App = () => {
  return (
    <Canvas>
        <Suspense fallback={null}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <Environment preset="forest" background/> */}
            <PerspectiveCamera makeDefault position={[0, 200, 0]} fov={40} />
            <OrbitControls target={[-2.64, -0.71, 0.03]} />

            <Car />
            <Floor />
        </Suspense>
    </Canvas>
  );
}

export default App