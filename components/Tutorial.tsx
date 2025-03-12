"use client";
import { Video } from "iconsax-react";
import { useState } from "react";
import VideoModal from "./VideoModal";

export default function Tutorial() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <VideoModal isOpen={modal} closeModal={() => setModal(false)} />
      {/*Button to view the tutorial on the homepage disabled for now*\}
      {/* <button
        onClick={() => setModal(true)}
        className="mx-auto flex items-center gap-4 bg-sky-600 text-white py-2 md:py-4 px-10 md:px-20 mt-10 md:text-xl rounded-full hover:bg-sky-700 duration-300 font-medium"
      >
        See tutorial video <Video />
      </button> */}
    </>
  );
}
