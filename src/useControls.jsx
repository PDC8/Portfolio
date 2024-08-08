import { useEffect, useState } from "react";

export const useControls = (vehicleApi, carApi) => {
    let [controls, setControls] = useState({

    });



    useEffect(() => {
        const keyDownPressHandler = (e) => {
            setControls((controls) => ({
                ...controls,
                [e.key.toLowerCase()]: true,
            }));
        }

        const keyUpPressHandler = (e) => {
            setControls((controls) => ({
                ...controls,
                [e.key.toLowerCase()]: false,
            }));
        }

        window.addEventListener('keydown', keyDownPressHandler);
        window.addEventListener('keyup', keyUpPressHandler);


        return () => {
            window.removeEventListener('keydown', keyDownPressHandler);
            window.removeEventListener('keyup', keyUpPressHandler);
        }

    }, []);

    useEffect(() => {
        if(controls.w){
            vehicleApi.applyEngineForce(150, 2);
            vehicleApi.applyEngineForce(150, 3);
        }
        else if(controls.s){
            vehicleApi.applyEngineForce(-150, 2);
            vehicleApi.applyEngineForce(-150, 3);

        }
        else{
            vehicleApi.applyEngineForce(0, 2);
            vehicleApi.applyEngineForce(0, 3);
        }

        if(controls.a){
            vehicleApi.setSteeringValue(1, 2);
            vehicleApi.setSteeringValue(1, 3);
            vehicleApi.setSteeringValue(-.1, 0);
            vehicleApi.setSteeringValue(-.1, 1);
        }
        else if(controls.d){
            vehicleApi.setSteeringValue(-1, 2);
            vehicleApi.setSteeringValue(-1, 3);
            vehicleApi.setSteeringValue(.1, 0);
            vehicleApi.setSteeringValue(.1, 1);
        }
        else{
            for(let i = 0; i < 4; i ++){
                vehicleApi.setSteeringValue(0, i);
            }
        }
    }, [controls, vehicleApi, carApi])


    return controls;
}