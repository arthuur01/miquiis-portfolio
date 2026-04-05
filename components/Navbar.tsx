"use client";

import Link from "next/link";
import Image from "next/image";
import Sidebar from "./SidebarPhone";

export default function Navbar(){
     
    return(
        <div>
          <div className="hidden lg:flex justify-center gap-140">
                <div>
                 <Link href="/"><Image className="w-20 cursor-pointer" src="/logo.png" alt="Logo" width={80} height={80}/></Link>
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
           <div className="lg:hidden flex justify-between">
            <div className="ml-10">
                <Link href="/"><Image className="w-15 cursor-pointer" src="/logo.png" alt="Logo" width={60} height={60}/></Link>
            </div>
            <div className="mr-5 mt-3">
             <Sidebar/>
            </div>
           </div> 



        </div>


    );
}