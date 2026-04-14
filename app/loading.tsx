"use client";

import gsap from "gsap";
import { useState, useRef, useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function LoadingScreen({children, onLoadingComplete}: {children: React.ReactNode, onLoadingComplete?: () => void}){
  const [isLoading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const callbackRef = useRef(onLoadingComplete);
  callbackRef.current = onLoadingComplete;

  useEffect(() => {
   
    window.scrollTo(0, 0);
    
    
    document.body.style.overflow = 'hidden';

    
    NProgress.start();
    
    return () => {
      document.body.style.overflow = 'unset';
      NProgress.remove();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;

    const container = containerRef.current;
    const path = pathRef.current;
    const length = path.getTotalLength();

    
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
    });

    const tl = gsap.timeline();

    
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: function() {
        NProgress.set(this.progress());
      },
    })
    
    .to(container, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onStart: () => {
        NProgress.done();
      },
      onComplete: () => {
        setLoading(false);
        document.body.style.overflow = 'unset';
        callbackRef.current?.();
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return(
    <>
      {isLoading && (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 178 185" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              ref={pathRef}
              d="M9.5 184.08V62.0796L72.5 152.58L162.5 27.5796L168 139.08" 
              stroke="url(#paint0_linear_loading)" 
              strokeWidth="19"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0 }}
            />
            <defs>
              <linearGradient id="paint0_linear_loading" x1="88.75" y1="27.5796" x2="88.75" y2="184.08" gradientUnits="userSpaceOnUse">
                <stop stopColor="#431D1D"/>
                <stop offset="1" stopColor="#931919"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
      {children}
    </>
  );
}