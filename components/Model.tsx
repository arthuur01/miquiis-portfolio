"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type ModelProps = {
  path: string;
};

export default function Model({ path }: ModelProps) {
  const { scene } = useGLTF(path);
  const groupRef = useRef<THREE.Group>(null);

 useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.y = 0;

    }
 }, [])


  useFrame(() => {
    if (groupRef.current) {
      
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      <primitive object={scene} scale={2} />
    </group>
  );
}