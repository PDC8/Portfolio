import carObj from './Assets/truck.glb';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useWheels } from './useWheels';
import { WheelDebug } from './WheelDebug';
import { useControls } from './useControls';

const Car = () => {
    const { scene, animations} = useGLTF(carObj);
  
    const pos = [0, 10, 0];
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

    return (
        <group ref={vehicle} name='vehicle'>
            <mesh ref={carBody}>
                <boxGeometry args={carBodyArgs} />
            </mesh>
            <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
            <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
        </group>
    )
}

export default Car
