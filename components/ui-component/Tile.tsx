"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import Image from "next/image";
import axios from 'axios';
import { API_BASE_URL } from '@/utils/axios';

// Import the 5 random default images
import randomImage1 from "../../assets/imgs/tiles/Nft1.png";
import randomImage2 from "../../assets/imgs/tiles/Nft2.png";
import randomImage3 from "../../assets/imgs/tiles/Nft3.png";
import randomImage4 from "../../assets/imgs/tiles/Nft4.png";
import randomImage5 from "../../assets/imgs/tiles/Nft5.png";
import randomImage6 from "../../assets/imgs/tiles/Nft6.png";
// import { MixpanelTracking } from "@/services/mixpanel";
// Array of random default images
const randomImages = [randomImage1, randomImage2, randomImage3, randomImage4, randomImage5, randomImage6];

const Tiles = () => {
  const router = useRouter();
  const token = JSON.parse(localStorage.getItem('authtoken') as string).access_token;
  const [tiles, setTiles] = useState<any[]>([]);

  const fetchData = async () => {
    const response = await axios.get(`${API_BASE_URL}/grade-retrieval/get_all_subject`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    setTiles(response.data);
  };

  const showSubject = (id: number) => {
    router.push(`/subjects/detail?subject_id=${id}`);
  };

  // Function to dynamically import images based on subject name
  const getImageSrc = (subjectName: string) => {
    try {
      // Dynamically import the image using the subject name
      return require(`../../assets/imgs/subject_images/${subjectName}.jpeg`).default;
    } catch (err) {
      // If the image is not found, return a random image from the array
      const randomIndex = Math.floor(Math.random() * randomImages.length);
      return randomImages[randomIndex];
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-30">
      {tiles && tiles.map((item, i) => (
        <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 max-[640px]:col-span-6 max-[480px]:col-span-12 " key={i}>
          <button onClick={() => {
            showSubject(item.subject_id);
          }} className="relative">
            <div className="rounded-lg dark:shadow-dark-md shadow-md p-0 relative w-full break-words overflow-hidden dark:bg-slate-700">
              <div className="relative">
                <Image
                  src={getImageSrc(item.subject_name)}
                  alt={item.subject_name}
                  layout="responsive"
                  width={300}
                  height={200}
                  objectFit="cover"
                />
              </div>
              <div className="px-6 dark:text-white dark:bg-slate-700">
                <h5 className="text-lg group-hover:text-primary line-clamp-2 dark:text-white h-[100px] flex items-center justify-center">
                  {item.subject_name}
                </h5>
              </div>
            </div>
            { item.subject_id === "15" &&
              <div className="absolute top-[10px] right-[-25px] z-10 rotate-45">
                <div className="bg-red-500 text-white px-3 py-1 rounded-md text-[10px]">
                  Coming Soon
                </div>
              </div>
            }
          </button>
        </div>
      ))}
    </div>
  );
};

export default Tiles;
