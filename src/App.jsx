import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Floor } from './Floor';
import Car from './Car';
import { Physics } from '@react-three/cannon';
import { Track } from './Track';
const App = () => {
  return (
    <Canvas>
      <Physics broadphase='SAP' gravity={[0, -3, 0]}>
        <Suspense fallback={null}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <Environment preset="forest" background/> */}
            <PerspectiveCamera makeDefault position={[0, 50, 0]} fov={40} />
            <OrbitControls target={[20, 20, 10]} />

            <Car />
            <Track />
            <Floor />
        </Suspense>
      </Physics>
    </Canvas>
  );
}

export default App