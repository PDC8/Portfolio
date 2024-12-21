import { Environment, OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
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
  const [cameraPosition] = useState([30, 40, 30]);
  const [currentLink, setCurrentLink] = useState(null);



  const projects = [
    {position: [10, 2.5, 0], image: image1}
  ];
  const hyperlinks = [
    {position: [10, 2.5, 0], size: [3, 3], link: "https://www.github.com"}
  ]

  //press enter to redirect to project links
  useEffect(() => {
    const handleKeyDown = (event) => {
        if (currentLink && event.key === 'Enter') {
            window.location.href = currentLink;
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, [currentLink]);

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
            <Car ref={carRef} debug={debug} hyperlinks={hyperlinks} setCurrentLink={setCurrentLink}/>
            {currentLink && (
                    <Html position={[0, 5, 0]}>
                        <div
                            style={{
                                background: 'rgba(0, 0, 0, 0.7)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                fontSize: '16px',
                            }}
                        >
                            Press Enter to visit {currentLink}
                        </div>
                    </Html>
                )}
        </Suspense>
      </Physics>
    </Canvas>
  );
}

export default App