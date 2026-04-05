"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/all";
import VideoCard from "@/components/VideoCard";


gsap.registerPlugin(SplitText);


export default function Page(){
    const splitTextRef = useRef<any>(null);

    useEffect(() => {
        let mySplitText: any = null;
        let anim: any = null;

        if (splitTextRef.current) {
            mySplitText = new SplitText(".split", {type:"chars"});
            const chars = mySplitText.chars;
            
            anim = gsap.from(chars, {
                yPercent: 110,
                stagger: 0.02,
                duration: 0.7,
            });
        }
            
        return () => {
            if (anim) anim.kill();
            if (mySplitText) mySplitText.revert();
        };
    }, [])



    return(
        <div className="flex flex-col gap-30">
        <div ref={splitTextRef} >
            <h1 className="split text-[280px] text-samurai-red-800 font-striper ml-10 overflow-hidden">Popular<br/>Works</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-1">
            <VideoCard
                title="Minecraft But You Can Trade Your Hearts"
                views="9.1M"
                channel="Preston Playz"
                category="Minecraft Challenge"
                previewVideoUrl="/preview01.mp4"
                youtubeUrl="https://www.youtube.com/watch?v=RFuI9LIyvmI"
                number="[01]"
            />
            <VideoCard
                title="Minecraft, but your XP = your Time"
                views="8M"
                channel="Preston Playz"
                category="Minecraft Challenge"
                previewVideoUrl="/preview02.mp4"
                youtubeUrl="https://www.youtube.com/watch?v=hZf9jojNFi0"
                number="[02]"
            />
            <VideoCard
                title="Minecraft, but with a XP block"
                views="7.3M"
                channel="Preston Playz"
                category="Minecraft Challenge"
                previewVideoUrl="/preview03.mp4"
                youtubeUrl="https://www.youtube.com/watch?v=SE3U06BOzZM"
                number="[03]"
            />
            <VideoCard
                title="Minecraft, but with a videogame block"
                views="7.3M"
                channel="Preston Playz"
                category="Minecraft Challenge"
                previewVideoUrl="/preview04.mp4"
                youtubeUrl="https://www.youtube.com/watch?v=TqmkmXOGm0w"
                number="[04]"
            />
            <VideoCard
                title="Minecraft but Your XP = SCARY"
                views="6.7M"
                channel="Preston Playz"
                category="Minecraft Challenge"
                previewVideoUrl="/preview05.mp4"
                youtubeUrl="https://www.youtube.com/watch?v=Cj9WwF8nWXI"
                number="[05]"
            />
            <VideoCard
                title="I Survived 100 Days with Only 1 Block of Money (vs Camman18)"
                views="6.2M"
                channel="Preston Playz"
                category="Minecraft Challenge"
                previewVideoUrl="/preview06.mp4"
                youtubeUrl="https://www.youtube.com/watch?v=uLOVrx1P1mY"
                number="[06]"
            />
            <VideoCard
                title="Minecraft But There’s 1 SPACE Block"
                views="4.6M"
                channel="Preston Playz"
                category="Minecraft Challenge"
                previewVideoUrl="/preview07.mp4"
                youtubeUrl="https://www.youtube.com/watch?v=RO56GHReY40"
                number="[07]"
            />
            <VideoCard
                title="Minecraft, But There's One Millionaire Block"
                views="4.5M"
                channel="Preston Playz"
                category="Minecraft Challenge"
                previewVideoUrl="/preview08.mp4"
                youtubeUrl="https://www.youtube.com/watch?v=mgWqrbpa6hk"
                number="[08]"
            />
            <VideoCard
                title="Minecraft, but you can steal hearts"
                views="3M"
                channel="Preston Playz"
                category="Minecraft Challenge"
                previewVideoUrl="/preview09.mp4"
                youtubeUrl="https://www.youtube.com/watch?v=2gitsm-xnVw"
                number="[09]"
            />
            <VideoCard
                title="Minecraft But there's one Billionare Block"
                views="3M"
                channel="Preston Playz"
                category="Minecraft Challenge"
                previewVideoUrl="/preview10.mp4"
                youtubeUrl="https://www.youtube.com/watch?v=OCjJaCIiUko"
                number="[10]"
            />
            <VideoCard
                title="What If Minecraft Mobs Used TNT?"
                views="1.2M"
                channel="Skip the Tutorial"
                category="Minecraft Challenge"
                previewVideoUrl="/preview11.mp4"
                youtubeUrl="https://www.youtube.com/watch?v=bU5X08HLQSE"
                number="[11]"
            />
        </div>
        </div>
    );
}