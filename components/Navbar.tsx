"use client";

import { useEffect, useRef, useState } from "react";


export default function Navbar(){
    return(
        <div>
          <div className="flex justify-center gap-15 lg:gap-140">
           
                <div>
                 <a href="/"><img className="w-20 cursor-pointer" src="/logo.png"/></a>
                </div>
                <div className="font-invasion text-xl  ">
                 <p className="hover:transition-colors hover:text-samurai-red-600 cursor-pointer">Works</p>
                 <p className="hover:transition-colors hover:text-samurai-red-600 cursor-pointer">About</p>
                </div>
                <div className="font-invasion text-xl">
                 <p className="hover:transition-colors hover:text-samurai-red-600 cursor-pointer">Discord</p>
                 <p className="hover:transition-colors hover:text-samurai-red-600 cursor-pointer">Github</p>
                </div>
                <div className="font-invasion text-xl">
                 <p className="hover:transition-colors hover:text-samurai-red-600 cursor-pointer">Paypal</p>
                 <p className="hover:transition-colors hover:text-samurai-red-600 cursor-pointer">Contact</p>
                </div>
          </div> 
        </div>


    );
}