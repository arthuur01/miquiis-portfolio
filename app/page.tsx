"use client";
import Image from "next/image";
import LoadingScreen from "./loading";
import Navbar from "@/components/Navbar";





export default function Home() {
  return (
  <LoadingScreen>
    <Navbar/>
  </LoadingScreen>
  );
}
