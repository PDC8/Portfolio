import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Floor } from './Floor';
import Car from './Car';
import { Physics } from '@react-three/cannon';
import { Billboard } from './Billboard';
import image1 from './Assets/download.jpeg';

// import { setCurrentStack } from 'three/webgpu';
// import { Track } from './Track';






const App = () => {

  const carRef = useRef(null);
  const [debug] = useState(false);
  const [cameraPosition] = useState([30, 40, 30])


  const projects = [
    {position: [10, 2.5, 0], image: image1}
  ];

  return (
    <Canvas>
      <Physics broadphase='SAP' gravity={[0, -3, 0]}>
        <Suspense fallback={null}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <Environment preset="forest" background/> */}
            <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
            {debug && (
              <OrbitControls target={[0, 0, 0]} />
            )}

            {projects.map((project, index) => (
              <group key={index}>
                 <Billboard position={project.position} image={project.image} />
              </group>
            ))}


            {/* <Track /> */}
            <Floor/>
            <Car ref={carRef} debug={debug}/>

        </Suspense>
      </Physics>
    </Canvas>
  );
}

export default App