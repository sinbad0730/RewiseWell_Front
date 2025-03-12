"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ReactNode, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star, Star1 } from "iconsax-react";

export const quoteSlides = [
  {
    customer: "From Bahrain",
    description: [
      "ReviseWell has transformed my study routine. The instant feedback is incredibly helpful!",
      "- Sarah A.",
    ],
    color: "bg-orange-100",
  },
  {
    customer: "From Thailand",
    description: [
      "This site has saved me so much time. I can now focus on understanding concepts instead of searching for questions.",
      "- Preecha T.",
    ],
    color: "bg-purple-100",
  },
  {
    customer: "From the UK",
    description: [
      "The grade analysis feature has been a game-changer for me as a teacher. It helps me identify where my students need the most help.",
      "- Mrs. Johnson",
    ],
    color: "bg-sky-100",
  },
];

const SliderCard = ({
  description,
  customer,
  color,
}: {
  description: ReactNode;
  customer: string;
  color: string;
}) => {
  return (
    <div className="p-3">
      <div
        className={`flex flex-col gap-4 h-52 p-6 rounded-lg border-b-4 border-solid border-b-[rgba(0,0,0,0.3)] ${color} bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-blue-800 `}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-semibold dark:text-white">{customer}</h3>
          <div className="flex">
            <Star1 variant="Bulk" color="darkorange" size={20} />
            <Star1 variant="Bulk" color="darkorange" size={20} />
            <Star1 variant="Bulk" color="darkorange" size={20} />
            <Star1 variant="Bulk" color="darkorange" size={20} />
            <Star1 variant="Bulk" color="darkorange" size={20} />
          </div>
        </div>
        <div className="text-sm md:text-base dark:text-slate-300">{description}</div>
      </div>
    </div>
  );
};

export default function ClientQuote() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [position, setPosition] = useState(0);
  const slider = useRef<Slider | null>(null);

  return (
    <div className="mx-auto relative z-10 mt-10">
      <div className="">
        <Slider
          {...settings}
          beforeChange={(e: any) => setPosition(e)}
          ref={slider}
        >
          {quoteSlides.map((slide, index) => (
            <SliderCard
              key={index}
              customer={slide.customer}
              description={slide.description.map((desc, ind) => (
                <p className="mb-4" key={ind}>
                  {desc}
                </p>
              ))}
              color={slide.color}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}
