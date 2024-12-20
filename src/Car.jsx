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

const Car = ({thirdPerson}) => {
    const { scene, animations} = useGLTF(carObj);
  
    const pos = [0, 5, 0];
    const width = 1;
    const height = 0.5;
    const front = 1;
    const wheelRadius = .5;

    const carBodyArgs = [width, height, front * 2];

    const [carBody, carApi] = useBox(() => ({
        mass: 150,
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
    }),
        useRef(null),
    );

    useControls(vehicleApi, carApi);
    
    useFrame((state) => {
        if(!thirdPerson) return;

        let position = new Vector3(0, 0, 0);
        position.setFromMatrixPosition(carBody.current.matrixWorld);

        let quaternion = new Quaternion(0, 0, 0, 0);
        quaternion.setFromRotationMatrix(carBody.current.matrixWorld);

        let wDir = new Vector3(0, 0, -1);
        wDir.applyQuaternion(quaternion);
        wDir.normalize();
        
        let cameraPosition = position.clone().add(
            wDir.clone().multiplyScalar(-20).add(
                new Vector3(20, 30, 0)
            )
        );

        state.camera.position.copy(cameraPosition);
        state.camera.lookAt(position);
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
