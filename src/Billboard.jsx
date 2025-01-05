import { TextureLoader, MeshStandardMaterial } from "three";
import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import billboardObj from "./Assets/billboard.glb";

export function Billboard({ position, image }) {
  const texture = useLoader(TextureLoader, image);
  const { scene, animations } = useGLTF(billboardObj);

  //clone billboard scene so each billboard obj has it's own copy
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    const textureMesh = clonedScene.getObjectByName("Texture");
    if (textureMesh) {
      textureMesh.material = new MeshStandardMaterial({
        map: texture,
      });
    //   textureMesh = texture;
      textureMesh.material.needsUpdate = true;
    }
  }, [clonedScene, texture]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      scale={[1, 1, 1]}
      rotation={[0, (-10 * Math.PI) / 16, 0]}
    />
  );
}
