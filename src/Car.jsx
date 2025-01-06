import carObj from './Assets/tofu_car.glb';
import { useEffect, useRef} from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useWheels } from './useWheels';
import { WheelDebug } from './WheelDebug';
import { useControls } from './useControls';
import { Vector3, Quaternion } from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';


const Car = ({debug, projects, setCurrentLink, setCurrentLinkPos}) => {
    const { scene, animations } = useGLTF(carObj);
  
    const pos = [0, 5, 0];
    const width = 1;
    const height = 0.5;
    const front = 1;
    const wheelRadius = .4;

    const carBodyArgs = [width, height, front * 2];

    const [carBody, carApi] = useBox(() => ({
        mass: 100,
        args: carBodyArgs,
        position: pos,
        rotation: [0, 0, 0],
    }), 
        useRef(null),
    );

    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

    const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
        chassisBody: carBody,
        wheelInfos: wheelInfos,
        wheels: wheels,
        indexRightAxis: 0,
        indexUpAxis: 1,
        indexForwardAxis: 2,
    }),
        useRef(null),
    );

    useControls(vehicleApi, carApi);
    

    //fix camera to the car
    useFrame((state) => {
        if (carBody.current){
            if (!debug){
                const carPosition = new Vector3().setFromMatrixPosition(carBody.current.matrixWorld);
                let fixedOffset = new Vector3(-20, 35, 20);
                let cameraPosition = carPosition.clone().add(fixedOffset);
                state.camera.position.copy(cameraPosition);
                state.camera.lookAt(carPosition);
            }

            const carPosition = new Vector3().setFromMatrixPosition(carBody.current.matrixWorld);
            
            let activeLink = null;
            let linkPos = null;
            for (const project of projects) {
                if (project.projIdx == 0){
                    const [x, y, z] = project.linkPosition;
                    const [width, depth] = project.linkSize;

                    // console.log(carPosition.x, carPosition.z, x, z);
                    const inX = carPosition.x >= x - width && carPosition.x <= x + width;
                    const inZ = carPosition.z >= z - depth && carPosition.z <= z + depth;
    
                    if (inX && inZ) {
                        activeLink = project.link;
                        linkPos = project.linkPosition;
                        console.log(linkPos);
                        break;
                    }
                }
            }

            setCurrentLink(activeLink);
            setCurrentLinkPos(linkPos);
        }
    });



    return (
        <group ref={vehicle} name='vehicle'>
            {/* <mesh ref={carBody}>
                <boxGeometry args={carBodyArgs} />
            </mesh> */}
            <primitive
                object={scene}
                ref={carBody}
                position={[0, 0, 0]}
                scale={[1, 1, 1]}
            />
                    
            <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
        </group>
    )
}

export default Car
