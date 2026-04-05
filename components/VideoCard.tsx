"use client";

import { useRef, useState } from "react";
import VideoDialog from "./VideoDialog";

interface VideoCardProps {
  title: string;
  views: string;
  channel: string;
  category: string;
  previewVideoUrl: string;
  youtubeUrl: string;
  number: string;
}

export default function VideoCard({
  title,
  views,
  channel,
  category,
  previewVideoUrl,
  youtubeUrl,
  number
}: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <VideoDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        videoUrl={youtubeUrl}
      />
      
      <div className="flex flex-col w-full gap-2 bg-charcoal-black-900">
        <video 
          onClick={() => setOpen(true)} 
          ref={videoRef} 
          className="w-full opacity-20 transition-opacity duration-500 ease-in-out hover:opacity-70 cursor-pointer bg-black" 
          src={previewVideoUrl} 
          autoPlay 
          muted 
          loop 
          playsInline
        />
        <div className="flex justify-between w-full pt-5">
          <h1 className="text-[20px] lg:text-5xl font-rale font-light pl-2 lg:pl-2">{title}</h1>
          <h1 className="text-[20px] lg:text-xl font-mono font-light pt-2 pr-7 lg:pr-3">{views}</h1>
        </div>
        <h1 className="text-[13px] lg:text-xl font-sans font-light pl-4">{channel}</h1>
        <h1 className="text-[13px] lg:text-xl font-sans font-light pl-4">{category}</h1>
        <h1 className="text-[13px] lg:text-xl font-sans font-light mt-40 pl-4">{number}</h1>
      </div>
    </>
  );
}
