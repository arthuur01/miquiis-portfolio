"use client";
import {useState, useEffect, useRef} from 'react';
import gsap from 'gsap';
import Link from "next/link";


export default function Sidebar(){
    const [isOpen, setStatus] = useState(false);
    const navDiv = useRef<HTMLDivElement>(null);
    const listElement = useRef<HTMLDivElement>(null);
     const tl = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
     if (!navDiv.current || !listElement.current) return;

     const items = listElement.current.querySelectorAll("li");

     tl.current = gsap.timeline({ paused: true });
     
     if(items){
            tl.current.to(navDiv.current, {
            y: 0,
            opacity:1,
            duration: 0.7,
            ease: "power3.inOut"
        }).from(items,  {yPercent:50,
                duration: 0.3,
                stagger: 0.02,ease:"back.out"})
    }}, []);

    const enterScreen = () => {
        tl.current?.play();
        }
        
    const exitScreen = () => {
        tl.current?.reverse();
    }

    return(
    <div>
         <button onClick={enterScreen} className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path fill="none"     d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg></button>
          {/* Sidebar */}
        <div ref={navDiv}className="lg:hidden flex flex-col fixed right-0 top-0 w-screen h-screen bg-black  text-white" style={{ transform: "translateY(-100%)", opacity: 0}} >
        <button onClick={exitScreen} className="flex justify-end mt-2 mr-5 cursor-pointer">
          <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
           >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
           </svg>
        </button>
        <div className="" ref={listElement}>
          <ul className="lg:hidden flex flex-col justify-center items-center mt-25 uppercase  text-samurai-red-800 text-6xl  gap-10 group w-fit mx-auto">
            <li className="lg:hidden flex items-center cursor-pointer transition-opacity duration-100 group-hover:opacity-40 hover:opacity-100"><span className="text-bone-white text-xl">[1]</span>Works</li>
            <li className="lg:hidden flex items-center cursor-pointer transition-opacity duration-100 group-hover:opacity-40 hover:opacity-100"><span className="text-bone-white  text-xl">[2]</span>About</li>
            <li className="lg:hidden flex items-center cursor-pointer transition-opacity duration-100 group-hover:opacity-40 hover:opacity-100"><span className="text-bone-white  text-xl">[3]</span>Discord</li>
            <li className="lg:hidden flex items-center cursor-pointer transition-opacity duration-100 group-hover:opacity-40 hover:opacity-100"><span className="text-bone-white  text-xl">[4]</span>Github</li>
            <li className="lg:hidden flex items-center cursor-pointer transition-opacity duration-100 group-hover:opacity-40 hover:opacity-100"><span className="text-bone-white  text-xl">[5]</span>Paypal</li>
          </ul>
        </div>
        
      </div>
    </div>
    );
}