"use client";
import Image from "next/image";
import LoadingScreen from "./loading";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import localFont from "next/font/local";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(SplitText, DrawSVGPlugin, ScrollTrigger);

const bespokeStencil = localFont({
  src: "../public/fonts/BespokeStencil-Bold.ttf",
  variable: "--font-bespoke-stencil",
});






export default function Home() {
  const [time, setTime] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const leftNavRef = useRef<HTMLDivElement>(null);
  const rightNavRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGLineElement>(null);
  const featuredTitleRef = useRef<HTMLHeadingElement>(null);
  const channelsColumnRef = useRef<HTMLDivElement>(null);
  const carouselSectionRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const contactTitleRef = useRef<HTMLHeadingElement>(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    // Force scroll to top on mount
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Scroll to top with Lenis
    lenis.scrollTo(0, { immediate: true });

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    if (!loadingComplete) return;
    
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([leftNavRef.current, logoRef.current, rightNavRef.current], {
        opacity: 0,
        y: -20
      });

      // Split text for heading
      const split = new SplitText(headingRef.current, { 
        type: "words,chars",
        wordsClass: "split-word"
      });
      
      gsap.set(headingRef.current, {
        opacity: 1
      });
      
      gsap.set(split.words, {
        display: "inline-block",
        whiteSpace: "nowrap"
      });
      
      gsap.set(split.chars, {
        opacity: 0,
        y: 50,
        display: "inline-block"
      });

      // Create timeline
      const tl = gsap.timeline();

      // Logo appears first
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      });

      // Left and right elements appear together
      tl.to([leftNavRef.current, rightNavRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0
      }, "-=0.2");

      // Heading text animates from bottom to top with stagger
      tl.to(split.chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.02
      }, "-=0.4");

      // Draw underline after text appears
      if (underlineRef.current) {
        gsap.set(underlineRef.current, { drawSVG: "0%" });
        tl.to(underlineRef.current, {
          drawSVG: "100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "-=0.2");
      }
    });

    return () => ctx.revert();
  }, [loadingComplete]);

  useEffect(() => {
    if (!loadingComplete) return;
    if (!featuredTitleRef.current || !channelsColumnRef.current) return;

    // Desativa animações ScrollTrigger em mobile
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const title = featuredTitleRef.current;
      if (!title) return;
      
      const spans = title.querySelectorAll('span');
      
      if (isMobile) {
        // Em mobile, apenas mostra os elementos sem animação
        gsap.set(spans, { opacity: 1, x: 0 });
      } else {
        // Animação inicial: fade in da esquerda
        gsap.fromTo(spans, 
          {
            opacity: 0,
            x: -100
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
        
        // Animação de movimento vertical
        gsap.to(title, {
          y: () => {
            const columnHeight = channelsColumnRef.current?.offsetHeight || 0;
            const titleHeight = title?.offsetHeight || 0;
            return columnHeight - titleHeight;
          },
          ease: "none",
          scrollTrigger: {
            trigger: title,
            start: "top center",
            end: () => `+=${channelsColumnRef.current?.offsetHeight || 0}`,
            scrub: 1,
          }
        });
      }
    });

    return () => ctx.revert();
  }, [loadingComplete]);

  useEffect(() => {
    if (!loadingComplete) return;
    if (!carouselSectionRef.current || !carouselTrackRef.current) return;

    // Desativa animações ScrollTrigger em mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const carousel = carouselTrackRef.current;
      const section = carouselSectionRef.current;
      if (!carousel || !section) return;
      
      const cards = carousel.querySelectorAll('a');
      const scrollWidth = carousel.scrollWidth - window.innerWidth;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth + window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });
      
      tl.to(cards, {
        width: 640,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(carousel, {
        x: -scrollWidth,
        duration: 2,
        ease: "none"
      }, "+=0.2");
    });

    return () => ctx.revert();
  }, [loadingComplete]);

  useEffect(() => {
    if (!loadingComplete) return;
    if (!contactTitleRef.current) return;

    // Desativa animações ScrollTrigger em mobile
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const title = contactTitleRef.current;
      if (!title) return;
      
      const spans = title.querySelectorAll('span');
      
      if (isMobile) {
        // Em mobile, apenas mostra os elementos sem animação
        gsap.set(spans, { opacity: 1, x: 0 });
      } else {
        gsap.fromTo(spans, 
          {
            opacity: 0,
            x: -100
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [loadingComplete]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const videos = [
    { id: 1, preview: "/preview01.mp4", url: "https://www.youtube.com/watch?v=RFuI9LIyvmI", title: "100 Minecraft Secrets You Didn't Know", channel: "Skip The Tutorial", views: "15M views" },
    { id: 2, preview: "/preview02.mp4", url: "https://www.youtube.com/watch?v=hZf9jojNFi0", title: "I Survived 100 Days as a DRAGON", channel: "PrestonPlayz", views: "8.2M views" },
    { id: 3, preview: "/preview03.mp4", url: "https://www.youtube.com/watch?v=SE3U06BOzZM", title: "Minecraft But Everything is 10x Bigger", channel: "Skip The Tutorial", views: "12M views" },
    { id: 4, preview: "/preview04.mp4", url: "https://www.youtube.com/watch?v=TqmkmXOGm0w", title: "Most Insane Minecraft Mod Ever", channel: "PrestonPlayz", views: "6.5M views" },
    { id: 5, preview: "/preview05.mp4", url: "https://www.youtube.com/watch?v=Cj9WwF8nWXI", title: "Building The Perfect Minecraft House", channel: "BriannaPlayz", views: "4.8M views" },
    { id: 6, preview: "/preview06.mp4", url: "https://www.youtube.com/watch?v=uLOVrx1P1mY", title: "Minecraft But I'm Tiny", channel: "Cash", views: "3.2M views" },
    { id: 7, preview: "/preview07.mp4", url: "https://www.youtube.com/watch?v=RO56GHReY40", title: "100 Days in Minecraft Hardcore", channel: "PrestonPlayz", views: "9.1M views" },
    { id: 8, preview: "/preview08.mp4", url: "https://www.youtube.com/watch?v=mgWqrbpa6hk", title: "I Became OP in Minecraft", channel: "BriannaPlayz", views: "5.4M views" },
    { id: 9, preview: "/preview09.mp4", url: "https://www.youtube.com/watch?v=2gitsm-xnVw", title: "Secret Minecraft Features", channel: "Skip The Tutorial", views: "11M views" },
    { id: 10, preview: "/preview10.mp4", url: "https://www.youtube.com/watch?v=OCjJaCIiUko", title: "Minecraft But Everything is Cursed", channel: "Cash", views: "2.8M views" },
    { id: 11, preview: "/preview11.mp4", url: "https://www.youtube.com/watch?v=bU5X08HLQSE", title: "I Made Minecraft Impossible", channel: "PrestonPlayz", views: "7.3M views" },
  ];

  return (
  <LoadingScreen onLoadingComplete={() => setLoadingComplete(true)}>
    <div className={bespokeStencil.variable}>
    <div className="flex justify-between">
      <div ref={leftNavRef} className="opacity-0 flex flex-col text-[14px] text-bold font-charon tracking-wider ml-3 mt-3 gap-1">
        <div className="text-samurai-red-600">MIQUIIS.DEV</div>
        <div className="text-samurai-red-600 flex items-center gap-2">
          CONECTED 
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>
        <div className="text-gray-weak opacity-74">ISO-27001</div>
      </div>
      <div ref={logoRef} className="opacity-0 flex items-start justify-center mt-3">
        <Image  src="/logo.png" alt="Miquiis Logo" width={50} height={50} />
      </div>
      <div ref={rightNavRef} className="opacity-0 flex flex-col text-[14px] text-bold font-charon tracking-wider mr-3 mt-3 items-end gap-3">
        <div className="text-gray-weak opacity-74">{time}</div>
        <button 
          onClick={() => {
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="text-samurai-red-600 border border-samurai-red-600 px-1 py-1 cursor-pointer hover:bg-samurai-red-600 hover:text-black transition-all"
        >
          CONTACT
        </button>
      </div>
    </div>
    
    <div className="flex justify-center items-center mt-50 ml-10 2xl:ml-0">
      <div className="relative">
        <h1 ref={headingRef} className="opacity-0 font-(family-name:--font-instrument-sans) text-[150px] font-bold text-center">
          I CODE <span className="font-(family-name:--font-bespoke-stencil)">MINECRAFT</span> <span className="text-samurai-red-700">MODS</span> THAT <span className="relative  inline-block">WORK
            <svg className="left-0" width="100%" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
              <line ref={underlineRef} x1="0" y1="4" x2="100" y2="4" stroke="rgb(185, 28, 28)" strokeWidth="4" />
            </svg>
          </span>
        </h1>
      </div>
    </div>
    
    <div className="flex justify-center items-center mt-16">
      <p className="font-(family-name:--font-inter) text-lg text-gray-weak max-w-2xl text-center">
        Also work with: <span className="text-samurai-red-600">Frontend</span> (Next.js, React, React Native, TypeScript) • <span className="text-samurai-red-600">Backend</span> (Node.js, Python, Java) • <span className="text-samurai-red-600">Game Dev</span> (C++, C#, Unity) • <span className="text-samurai-red-600">Tools</span> (Git, Docker, AWS)
      </p>
    </div>
    
    <div className="flex justify-between items-start mt-100 mx-10 gap-20">
      <div className="flex justify-start items-center">
        <h2 ref={featuredTitleRef} className="font-(family-name:--font-instrument-sans) text-[100px] font-bold leading-tight text-white border-l-8 border-samurai-red-600 pl-8">
          <span className="inline-block opacity-0">FEATURED</span><br />
          <span className="inline-block opacity-0">YOUTUBERS</span>
        </h2>
      </div>
      
      <div ref={channelsColumnRef} className="flex flex-col gap-90 mr-50">
        <a href="https://www.youtube.com/@SkipTheTutorial" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center bg-gray-weak/10 p-6 rounded-lg border border-samurai-red-600/30 w-64 hover:border-samurai-red-600 transition-all cursor-pointer">
          <Image src="/skipthetutorial.jpg" alt="Skip The Tutorial" width={120} height={120} className="rounded-full" />
          <span className="text-white font-bold text-xl mt-4">Skip The Tutorial</span>
          <div className="flex gap-3 mt-3">
            <span className="text-gray-weak text-base">8.2M subscribers</span>
            <span className="text-samurai-red-600 text-base font-semibold">+2 projects</span>
          </div>
        </a>
        
        <a href="https://www.youtube.com/@PrestonPlayz" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center bg-gray-weak/10 p-6 rounded-lg border border-samurai-red-600/30 w-64 hover:border-samurai-red-600 transition-all cursor-pointer">
          <Image src="/prestonplayz.jpg" alt="PrestonPlayz" width={120} height={120} className="rounded-full" />
          <span className="text-white font-bold text-xl mt-4">PrestonPlayz</span>
          <div className="flex gap-3 mt-3">
            <span className="text-gray-weak text-base">12.5M subscribers</span>
            <span className="text-samurai-red-600 text-base font-semibold">+30 projects</span>
          </div>
        </a>
        
        <a href="https://www.youtube.com/@CashMC" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center bg-gray-weak/10 p-6 rounded-lg border border-samurai-red-600/30 w-64 hover:border-samurai-red-600 transition-all cursor-pointer">
          <Image src="/cash.jpg" alt="Cash" width={120} height={120} className="rounded-full" />
          <span className="text-white font-bold text-xl mt-4">Cash</span>
          <div className="flex gap-3 mt-3">
            <span className="text-gray-weak text-base">3.8M subscribers</span>
            <span className="text-samurai-red-600 text-base font-semibold">+2 projects</span>
          </div>
        </a>
        
        <a href="https://www.youtube.com/@BriannaPlayz" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center bg-gray-weak/10 p-6 rounded-lg border border-samurai-red-600/30 w-64 hover:border-samurai-red-600 transition-all cursor-pointer">
          <Image src="/BriannaPlayz.jpg" alt="BriannaPlayz" width={120} height={120} className="rounded-full" />
          <span className="text-white font-bold text-xl mt-4">BriannaPlayz</span>
          <div className="flex gap-3 mt-3">
            <span className="text-gray-weak text-base">7.1M subscribers</span>
            <span className="text-samurai-red-600 text-base font-semibold">113+ projects</span>
          </div>
        </a>
      </div>
    </div>
    
    <div ref={carouselSectionRef} className="mt-125 min-h-screen flex items-center">
      <div className="w-full overflow-hidden">
        <div ref={carouselTrackRef} className="flex gap-6 px-10">
          {videos.map((video) => (
            <a 
              key={video.id} 
              href={video.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="shrink-0 w-80 bg-gray-weak/10 rounded-lg border border-samurai-red-600/30 overflow-hidden hover:border-samurai-red-600 transition-all"
            >
              <div className="relative aspect-video">
                <video 
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                >
                  <source src={video.preview} type="video/mp4" />
                </video>
              </div>
              <div className="p-4">
                <p className="text-white font-charon  text-2xl mb-2 line-clamp-2 uppercase ">{video.title}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-weak">{video.channel}</span>
                  <span className="text-gray-weak">•</span>
                  <span className="text-gray-weak">{video.views}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
    
    <div id="contact-section" className="flex justify-between items-center mt-150 mx-10 mb-20 gap-20">
      <div className="flex flex-col text-center overflow-hidden">
        <h2 ref={contactTitleRef} className="font-(family-name:--font-instrument-sans) text-[140px]  font-bold leading-tight text-white">
          <span className="inline-block opacity-0">LET'S</span><br />
          <span className="inline-block opacity-0">GET IN</span><br />
          <span className="font-(family-name:--font-bespoke-stencil) text-samurai-red-900 inline-block opacity-0">TOUCH</span>
        </h2>
      </div>
      
      <div className="flex items-center justify-center">
        <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 30 L180 30 L180 22 L195 30 L180 38 L180 30" stroke="white" strokeWidth="3" fill="white"/>
        </svg>
      </div>
      
      <div className="flex flex-col max-w-md uppercase gap-8">
        <p className="font-(family-name:--font-instrument-sans) text-2xl font-bold text-white">
          Interested in working together? Reach out to me on <span className="text-samurai-red-900">Discord</span> or through any of my <span className="text-samurai-red-900">social platforms</span>.
        </p>
        
        <div className="flex gap-8 items-center flex-wrap">
          <button 
            onClick={() => {
              navigator.clipboard.writeText('miquiis');
              alert('Discord username copied to clipboard!');
            }}
            className="flex items-center gap-3 px-6 py-3 bg-transparent border-2 border-white text-white font-(family-name:--font-instrument-sans) font-bold text-lg hover:bg-white hover:text-black transition-all cursor-pointer"
            title="Click to copy Discord username"
          >
            <svg width="24" height="24" viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
            </svg>
            <span>MIQUIIS</span>
          </button>
          
          <a href="https://github.com/miquiis" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <svg width="40" height="40" viewBox="0 0 98 96" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
            </svg>
          </a>
          
          <a href="https://www.paypal.com/paypalme/miquiis" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.805.805 0 01-.794.679H7.72a.483.483 0 01-.477-.558L8.926 12.7l.05-.267a.805.805 0 01.794-.68h1.645c3.239 0 5.775-1.314 6.514-5.12.256-1.313.192-2.447-.3-3.327zm-.78 3.327c-.74 3.807-3.276 5.12-6.514 5.12H11.13a.805.805 0 00-.794.68l-.63 3.994-.028.15a.805.805 0 01-.794.68H7.72a.483.483 0 01-.477-.558L8.926 12.7l.05-.267a.805.805 0 01.794-.68h1.645c3.239 0 5.775-1.314 6.514-5.12.074-.381.117-.743.13-1.088.427.553.685 1.223.428 2.26z"/>
              <path d="M8.478 8.174c.04-.222.23-.389.457-.389h5.774c.683 0 1.32.047 1.897.155a6.435 6.435 0 011.328.369c.393.155.718.353.977.603.427.553.685 1.223.428 2.26-.74 3.806-3.276 5.12-6.514 5.12H11.18a.805.805 0 00-.794.68l-.676 4.295a.688.688 0 01-.679.574H6.763a.413.413 0 01-.408-.478l1.734-11.015.389-2.174z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    </div>
  </LoadingScreen>
  );
}
