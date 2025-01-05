import { useRef, useMemo } from 'react'
import { usePlane } from '@react-three/cannon';
import { Line, MeshReflectorMaterial, Text } from '@react-three/drei';


export function Floor({projects}){

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


            {projects.map((project, index) => {
                if (project.projIdx == 0){
                    return (
                        <group key={index}>
                            <Text
                                position={[project.position[0] - 5, 0, project.position[2] + 8]}
                                fontSize={0.6}
                                fontWeight="bold"
                                rotation={[-Math.PI / 2, 0, 0]}
                                anchorX="left"
                                maxWidth={10}
                                depthOffset={-1}
                                color="black"
                                renderOrder={1}
                            >
                                {project.title}
                            </Text>


                            <Text
                                position={[project.linkPosition[0], 0, project.linkPosition[2]]}
                                fontSize={0.6}
                                fontWeight="bold"
                                rotation={[-Math.PI / 2, 0, 0]}
                                anchorX="left"
                                maxWidth={10}
                                depthOffset={-1}
                                color="black"
                                renderOrder={1}
                            >
                                Link
                            </Text>

                            
                            <Text
                                position={[project.position[0] - 5, 0, project.position[2] + 10]}
                                fontSize={0.5}
                                rotation={[-Math.PI / 2, 0, 0]}
                                anchorX="left"
                                maxWidth={12}
                                depthOffset={-1}
                                color="black"
                                renderOrder={1}
                            >
                                {project.description}
                            </Text>
                        </group>
                    );
                }
                
            })}




        </>
        
    )
}

