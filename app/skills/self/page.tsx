"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import useUserActivity from "../../../hooks/useUserActivity";

import Image from "next/image";


// Import the 5 random default images
import randomImage1 from "../../../assets/imgs/tiles/Nft2.png";
import randomImage2 from "../../../assets/imgs/tiles/Nft4.png";
import randomImage3 from "../../../assets/imgs/tiles/Nft6.png";
import WithAuth from "@/components/Layout/WithLayout";

const Self: React.FC = () => {
  const router = useRouter();
  useUserActivity();
  const showGoals = () => {
    router.push(`/skills/self/goal`);
  }

  const showNotes = () => {
    
  }
  return (
    <div className="grid grid-cols-12 gap-[100px]">
        <div className="lg:col-span-4 col-span-12 " >
          <button onClick={() => window.open("https://pomofocus.io/", "_blank")} className="w-full h-full" >
            <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-0 relative w-full break-words overflow-hidden">
              <div className="relative">
                <Image
                  src={randomImage1}
                  alt=""
                  layout="responsive"
                  width={300} // Set appropriate width
                  height={200} // Set appropriate height
                  objectFit="cover" // Maintain aspect ratio
                />
              </div>
              <div className="px-6 pb-6">
                <h5 className="text-lg my-6 group-hover:text-primary line-clamp-2">
                    Timer pomodoro - link
                </h5>
              </div>
            </div>
          </button>
          
        </div>
        <div className="lg:col-span-4 col-span-12 " >
        <button onClick={() => showNotes()} className="w-full h-full">
            <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-0 relative w-full break-words overflow-hidden">
              <div className="relative">
                <Image
                  src={randomImage2}
                  alt=""
                  layout="responsive"
                  width={300} // Set appropriate width
                  height={200} // Set appropriate height
                  objectFit="cover" // Maintain aspect ratio
                />
              </div>
              <div className="px-6 pb-6">
                <h5 className="text-lg my-6 group-hover:text-primary line-clamp-2">
                    Cornell Notes
                </h5>
              </div>
            </div>
          </button>
          </div>
          <div className="lg:col-span-4 col-span-12" >
          <button onClick={() => showGoals()} className="w-full h-full">
            <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-0 relative w-full break-words overflow-hidden">
              <div className="relative">
                <Image
                  src={randomImage3}
                  alt=""
                  layout="responsive"
                  width={300} // Set appropriate width
                  height={200} // Set appropriate height
                  objectFit="cover" // Maintain aspect ratio
                />
              </div>
              <div className="px-6 pb-6">
                <h5 className="text-lg my-6 group-hover:text-primary line-clamp-2">
                    Goals/Target section
                </h5>
              </div>
            </div>
          </button>
          </div>
    </div>
  );
};

export default WithAuth(Self);