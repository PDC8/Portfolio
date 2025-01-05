import { Environment, OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Floor } from './Floor';
import Car from './Car';
import { Physics } from '@react-three/cannon';
import { Billboard } from './Billboard';
// import { setCurrentStack } from 'three/webgpu';
// import { Track } from './Track';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import Santorini_1 from './Assets/Project_Images/Santorini_1.jpeg';
import Santorini_2 from './Assets/Project_Images/Santorini_2.png';
import Game_2048_1 from './Assets/Project_Images/2048_1.png';
import Game_2048_2 from './Assets/Project_Images/2048_2.png';
import Slam_Dunk from './Assets/Project_Images/The_Final_Slam_Dunk.png'




const App = () => {
  const carRef = useRef(null);
  const [debug] = useState(false);
  const [cameraPosition] = useState([30, 40, 30]);
  const [currentLink, setCurrentLink] = useState(null);
  const [currentLinkPos, setCurrentLinkPos] = useState(null);

  let projPos = [0, 0, 0]


  const projects = [
	// Santorini
	{	projIdx: 0,
		position: [10, 2.5, 0], 
		image: Santorini_1,
		linkPosition: null,
		linkSize: [5, 5],
		link: "https://github.com/PDC8/Santorini",
		title: "Terminal Santorini",
		description: "Recreation of the board game Santorini. Playable on the terminal against random or heuristic bots, or another player.",
    },
	{	projIdx: 1,
		image: Santorini_2,
    },
	// 2048
	{	projIdx: 0,
		position: [50, 2.5, 0], 
		image: Game_2048_1,
		linkPosition: null,
		linkSize: [5, 5],
		link: "https://github.com/PDC8/CPSC-474-Final-Project",
		title: "2048 with Expectimax and MCTS",
		description: "Implementation Monte Carlo Tree Search and Expectimax on 2048. Compared its results with some baseline agents (random, greedy, heuristic).",
	},
	{ 	projIdx: 1,
		image: Game_2048_2,
	},
	//The Final Slam Dunk
	{	projIdx: 0,
		position: [100, 2.5, 0], 
		image: Slam_Dunk,
		linkPosition: null,
		linkSize: [5, 5],
		link: "https://www.youtube.com/watch?v=8S4YsUGGLp8",
		title: "The Final Slam Dunk",
		description: "Computer Graphics generated video utilizing CMU motion capture dataset. Effects include anti-aliasing, soft shadows, texture mapping, reflection, and refraction.",
	},






  ];

  projects.map((project) => {
	if (project.projIdx === 0) {
	   	projPos = project.position;
	   	project.linkPosition = [
			project.position[0], 
			0, 
			project.position[2] + 2
		];
	} else {
		project.position = [
			projPos[0] + 14 * project.projIdx, //offset x position
			projPos[1],
			projPos[2],
		];
	}
  });


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
            {debug && (<OrbitControls target={[0, 0, 0]} />)}
			
            {projects.map((project, index) => (
				
				<group key={index}>
					<Billboard position={project.position} image={project.image} />
				</group>
            ))}


            {/* <Track /> */}
            <Floor projects={projects}/>
            <Car ref={carRef} debug={debug} projects={projects} setCurrentLink={setCurrentLink} setCurrentLinkPos={setCurrentLinkPos}/>
            {currentLink && (
                    <Html position={currentLinkPos}>
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