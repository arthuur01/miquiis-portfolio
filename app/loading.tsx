"use client";

import gsap from "gsap";
import { useState, useRef, useEffect } from "react";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

gsap.registerPlugin(DrawSVGPlugin);

NProgress.configure({ showSpinner: false });

export default function LoadingScreen({children, onLoadingComplete}: {children: React.ReactNode, onLoadingComplete?: () => void}){
  const [isLoading, setLoading] = useState(true);
  
  const [n, setN] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Disable scroll during loading
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    // Re-enable scroll when loading is complete
    if (!isLoading) {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  useEffect(() => {
    NProgress.start();
    
    const id = setInterval(() => {
      setN((v) => {
        if (v >= 100) {
          clearInterval(id);
          return 100;
        }
        return v + 1;
      });
    }, 40); 

    return () => {
      clearInterval(id);
      NProgress.remove();
    };
  }, []);

  useEffect(() => {
    NProgress.set(n / 100);
    
    if (n === 100) {
      NProgress.done();
    }
  }, [n]);

  useEffect(() => {
    if (n === 100) {
      const tl = gsap.timeline();
      
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }).to(topHalfRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power3.inOut"
      }, "+=0.2").to(bottomHalfRef.current, {
        y: "100%",
        duration: 1,
        ease: "power3.inOut"
      }, "<") .call(() => {
        setLoading(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      });

      return () => {
        tl.kill();
      };
    }
  }, [n]);

  return(
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <div className="h-screen relative overflow-hidden">
            <div ref={topHalfRef} className="absolute top-0 left-0 w-full h-1/2 bg-neutral-950 z-10"></div>
            <div ref={bottomHalfRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-neutral-950 z-10"></div>
            <div ref={contentRef} className="absolute inset-0 z-20 grid grid-rows-[auto_1fr_auto]">
              <div className = "flex items-center h-screen">
                <div className="flex justify-center lg:justify-between w-screen">
                    <span ref={spanRef} className="hidden lg:flex text-[300px] font-array text-samurai-red-800 pt-70 pl-20 select-none animate-pulse">&gt;</span>
                    <div className="flex justify-center lg:flex  lg:pr-10 lg:flex-col lg:gap-0">
                      <span ref={spanRef} className=" text-[150px]  lg:text-[300px] font-striper text-samurai-red-800 "> {n}% </span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}