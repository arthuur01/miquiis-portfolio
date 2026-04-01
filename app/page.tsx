"use client";
import Image from "next/image";
import LoadingScreen from "./loading";

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../components/Scene"), {
  ssr: false,
});


export default function Home() {
  return (
  <LoadingScreen>
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="fixed w-full h-full ">
        <Scene/>
      </div>
   </div>
  </LoadingScreen>
  );
}
