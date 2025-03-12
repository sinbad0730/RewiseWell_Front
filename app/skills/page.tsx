"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import useUserActivity from "../../hooks/useUserActivity";

import Image from "next/image";

// Import the 5 random default images
import randomImage1 from "../../assets/imgs/tiles/Nft1.png";

import btn1 from '../../assets/imgs/tiles/btn/btn1.png';
import btn2 from '../../assets/imgs/tiles/btn/btn2.png';
import btn3 from '../../assets/imgs/tiles/btn/btn3.png';
import btn4 from '../../assets/imgs/tiles/btn/btn4.png';
import btn5 from '../../assets/imgs/tiles/btn/btn5.png';
import WithAuth from "@/components/Layout/WithLayout";
// Array of random default images

const Skills: React.FC = () => {
    const router = useRouter();
    useUserActivity();
    const showSelf = () => {
        router.push(`/skills/self`);
    }
    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="col-start-2 col-end-3">
                <button onClick={() => window.open("https://revisewell.discourse.group/hot", "_blank")} className="w-[250px] h-[250px]">
                    <Image
                        src={btn1}
                        alt=""
                        layout="responsive"
                        width={150} // Set appropriate width
                        height={100} // Set appropriate height
                        objectFit="cover" // Maintain aspect ratio
                        className="relative w-[150px] h-[150px] break-words"
                    />
                </button>
            </div>
            <div className="col-end-6 col-span-2">
                <button onClick={() => showSelf()} className="w-[250px] h-[250px]">
                    <Image
                        src={btn2}
                        alt=""
                        layout="responsive"
                        width={150} // Set appropriate width
                        height={100} // Set appropriate height
                        objectFit="cover" // Maintain aspect ratio
                        className="relative w-[150px] h-[150px] break-words"
                    />
                </button>
            </div>
            <div className="col-start-3 col-span-2">
                <button onClick={() => showSelf()} className="w-[250px] h-[250px]">
                    <Image
                        src={btn3}
                        alt=""
                        layout="responsive"
                        width={150} // Set appropriate width
                        height={100} // Set appropriate height
                        objectFit="cover" // Maintain aspect ratio
                        className="relative w-[150px] h-[150px] break-words"
                    />
                </button>
            </div>
            <div className="col-start-2 col-end-3">
                <button onClick={() => showSelf()} className="w-[250px] h-[250px]">
                    <Image
                        src={btn4}
                        alt=""
                        layout="responsive"
                        width={150} // Set appropriate width
                        height={100} // Set appropriate height
                        objectFit="cover" // Maintain aspect ratio
                        className="relative w-[150px] h-[150px] break-words"
                    />
                </button>
            </div>
           
            <div className="col-end-6 col-span-2">
                <button onClick={() => showSelf()} className="w-[250px] h-[250px]">
                    <Image
                        src={btn5}
                        alt=""
                        layout="responsive"
                        width={150} // Set appropriate width
                        height={100} // Set appropriate height
                        objectFit="cover" // Maintain aspect ratio
                        className="relative w-[150px] h-[150px] break-words"
                    />
                </button>
            </div>

        </div>
    );
};

export default WithAuth(Skills);