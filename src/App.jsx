import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Floor } from './Floor';
import Car from './Car';
import { Physics } from '@react-three/cannon';
// import { setCurrentStack } from 'three/webgpu';
// import { Track } from './Track';


const App = () => {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([0, 50, 0])



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
              <OrbitControls target={[20, 20, 10]} />
            )}
    


            {/* <Track /> */}
            <Floor />
            <Car thirdPerson={thirdPerson}/>
        </Suspense>
      </Physics>
    </Canvas>
  );
}

export default App