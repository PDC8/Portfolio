import { useRef } from 'react'
import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial, Text } from '@react-three/drei';


export function Floor({projects}){

    const text = [{description: "Hell World"}]

    const [ref] = usePlane (() => ({
        type: 'Static',
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
    }),
        useRef(null),
    );   



    return (
        <>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color={"gray"} />
            </mesh>
            {/* <Text
            position={[10, 0.01, -10]} // Position slightly above the plane to avoid z-fighting
            fontSize={.5} // Adjust the font size
            rotation={[-Math.PI / 2, 0, 0]} // Align text flat with the floor
            color="black" // Text color
            >
                Hello World
            </Text> */}

            {projects.map((project, index) => (
              <group key={index}>
                <Text
                position={[project.position[0], project.position[1] + 0.01, project.position[2] + 10]} // Position slightly above the plane to avoid z-fighting
                fontSize={.5} // Adjust the font size
                rotation={[-Math.PI / 2, 0, 0]} // Align text flat with the floor
                color="black" // Text color
                >
                    {text[index].description}
                </Text>
              </group>
            ))}




        </>
        
    )
}

