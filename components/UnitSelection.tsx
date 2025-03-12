"use client"
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import { API_BASE_URL } from '@/utils/axios';
import { Modal } from 'antd';

// Import the 5 random default images
import randomImage1 from "../assets/imgs/tiles/Nft1.png";
import randomImage2 from "../assets/imgs/tiles/Nft2.png";
import randomImage3 from "../assets/imgs/tiles/Nft3.png";
import randomImage4 from "../assets/imgs/tiles/Nft4.png";
import randomImage5 from "../assets/imgs/tiles/Nft5.png";
import randomImage6 from "../assets/imgs/tiles/Nft6.png";
// Array of random default images
const randomImages = [randomImage1, randomImage2, randomImage3, randomImage4, randomImage5, randomImage6];
interface UnitSelectionProps {
  onSelectUnit: (unit: number) => void;
  subject_id: any;
}

const UnitSelection: React.FC<UnitSelectionProps> = ({ onSelectUnit, subject_id }) => {
  const units = Array.from({ length: 10 }, (_, i) => i + 1);
  const token = JSON.parse(localStorage.getItem('authtoken') as string).access_token;
  const [tiles, setTiles] = useState<any[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(`${API_BASE_URL}/grade-retrieval/${subject_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    setTiles(response.data);
  };

  // Function to dynamically import images based on subject name
  const getImageSrc = (subjectName: string) => {
    try {
      // Dynamically import the image using the subject name
      return require(`../assets/imgs/subject_images/${subjectName}.jpeg`).default;
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
    <div>

      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-bold dark:text-white text-center mb-2'>Flashcards</h1>
        <button id='help' className="ml-2 px-[10px] rounded-full text-lg dark:bg-blue-700 dark:text-white" onClick={() => setShowHelp(true)}>?</button>
      </div>

      <Modal open={showHelp} onCancel={() => setShowHelp(false)} footer={null}>
        <div className="tutorial-overlay rounded-md p-5">
          <div className="tutorial-content space-y-2">
            <h2 className='text-xl text-center'>Flashcards</h2>
            <iframe
              className='w-full h-[315px]'
              src="https://www.youtube.com/embed/DCcUwMI6tFA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
            <div className='flex justify-end'>
              <button id="help" className='py-2 px-4 dark:bg-blue-700 dark:text-white' onClick={() => setShowHelp(false)}>Got It!</button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="grid grid-cols-12 gap-30 container align-auto mt-4">
        {tiles && tiles.map((item: any, i) => (
          <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 max-[640px]:col-span-6 max-[480px]:col-span-12 dark:bg-slate-900" key={i} style={{ width: '100%', height: '100%' }}>
            <button onClick={() => onSelectUnit(item.unit_id)} style={{ width: '100%', height: '100%' }}>
              <div className="rounded-lg dark:shadow-dark-md shadow-md dark:bg-darkgray p-0 relative w-full break-words overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={randomImage5}
                    alt={item.subject_name}
                    layout="responsive"
                    width={300}
                    height={200}
                    objectFit="cover"
                  />
                </div>
                <div className="flex justify-center items-center h-[100px] bg-white dark:bg-slate-700">
                  <h5 className="text-md my-6 group-hover:text-primary line-clamp-2 dark:text-white">
                    {item.unit_name}
                  </h5>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitSelection;
