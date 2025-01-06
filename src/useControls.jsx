import { useEffect, useState } from "react";

export const useControls = (vehicleApi, carApi) => {
    let [controls, setControls] = useState({

    });

    useEffect(() => {
        const keyDownPressHandler = (e) => {
            if (e.key === ' '){
                setControls((controls) => ({
                    ...controls,
                    drift: true,
                }));
            }
            else{
                setControls((controls) => ({
                    ...controls,
                    [e.key.toLowerCase()]: true,
                }));
            }
        }

        const keyUpPressHandler = (e) => {
            if (e.key === ' ') {
                setControls((controls) => ({
                    ...controls,
                    drift: false,
                }));
            }
            else{
                setControls((controls) => ({
                    ...controls,
                    [e.key.toLowerCase()]: false,
                }));
            }
        }

        window.addEventListener('keydown', keyDownPressHandler);
        window.addEventListener('keyup', keyUpPressHandler);


        return () => {
            window.removeEventListener('keydown', keyDownPressHandler);
            window.removeEventListener('keyup', keyUpPressHandler);
        }

    }, []);

    const applyFriction = () => {
        for (let i = 0; i < 4; i++){
            vehicleApi.setBrake(1, i);
        }
    }
    const setForceZero = () => {
        for (let i = 0; i < 4; i++){
            vehicleApi.applyEngineForce(0, i);
        }
    }
    const setBrakeZero = () => {
        for (let i = 0; i < 4; i++){
            vehicleApi.setBrake(0, i);
        }
    }
    const setSteerZero = () => {
        for (let i = 0; i < 4; i++){
            vehicleApi.setSteeringValue(0, i);
        }
    }

    const wheelForce = 200;
    const steerValue = 0.5;
    // const driftValue = 1000;
    // const driftPos = 2;
    // const driftValue = 20;
    // const driftPos = 2;
    let driftSteer = .22;
    useEffect(() => {

        if(controls.w){
            setBrakeZero();
            vehicleApi.applyEngineForce(wheelForce, 0);
            vehicleApi.applyEngineForce(wheelForce, 1);

        }
        else if(controls.s){
            setBrakeZero();
            vehicleApi.applyEngineForce(-wheelForce, 0);
            vehicleApi.applyEngineForce(-wheelForce, 1);

        }
        else{
            setForceZero();
            applyFriction();
        }

        if (controls.drift && controls.w) {
            if(controls.a){
                vehicleApi.setSteeringValue(-driftSteer, 0);
                vehicleApi.setSteeringValue(-driftSteer, 1);
                vehicleApi.setSteeringValue(steerValue, 2);
                vehicleApi.setSteeringValue(steerValue, 3);
                // carApi.applyLocalImpulse([driftValue, 0, 0], [0, 0, driftPos]);
            }
            else if(controls.d){
                vehicleApi.setSteeringValue(driftSteer, 0);
                vehicleApi.setSteeringValue(driftSteer, 1);
                vehicleApi.setSteeringValue(-steerValue, 2);
                vehicleApi.setSteeringValue(-steerValue, 3);
                // carApi.applyLocalImpulse([-driftValue, 0, 0], [0, 0, driftPos]);
            }
            else{
                setSteerZero();

            }
        }
        else {
            if(controls.a){
                vehicleApi.setSteeringValue(steerValue, 2);
                vehicleApi.setSteeringValue(steerValue, 3);
            }
            else if(controls.d){
                vehicleApi.setSteeringValue(-steerValue, 2);
                vehicleApi.setSteeringValue(-steerValue, 3);
            }
            else{
                setSteerZero();
            }
        }
    
    }, [controls, vehicleApi, carApi])


    return controls;
}