import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Floor } from './Floor';
import Car from './Car';
import { Physics } from '@react-three/cannon';
import { Billboard } from './Billboard';
import image1 from './Assets/download.jpeg';
// import { setCurrentStack } from 'three/webgpu';
// import { Track } from './Track';


const App = () => {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([30, 40, 30])
  
  const projects = [
    {position: [10, 2.5, 0], image: image1}
  ];


  useEffect(() => {
    function keydownHandler(e) {
      if (e.key == "k") {
        if(thirdPerson) {
          var random = Math.random() * 1.01
          setCameraPosition([0 + random, 50 + random, 0 + random]);
        }
        setThirdPerson(!thirdPerson);
      }
    }
    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);



  return (
    <Canvas>
      <Physics broadphase='SAP' gravity={[0, -3, 0]}>
        <Suspense fallback={null}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <Environment preset="forest" background/> */}
            <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
            {!thirdPerson && (
              <OrbitControls target={[0, 0, 0]} />
            )}

            {projects.map((project, index) => (
              <Billboard key={index} position={project.position} image={project.image} />
            ))}


            {/* <Track /> */}
            <Floor />
            <Car thirdPerson={thirdPerson}/>
        </Suspense>
      </Physics>
    </Canvas>
  );
}

export default App