"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      {/* Luz */}
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} />

      {/* Modelo */}
      <Model path="/scene.glb" />

   
      
    </Canvas>
  );
}