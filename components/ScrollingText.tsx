import React from "react";
import Image from "next/image";

const ScrollingText = () => {
  return (
    <div className="relative whitespace-nowrap w-full z-20 mt-2 flex-nowrap inline-flex overflow-hidden">
      <ul className="flex items-center justify-center text-base sm:text-xl text-navy-100 font-semibold animate-infinite-scroll">
        <li className="min-w-max flex items-center">
          <Image
            src="/star_navy.png"
            alt="star"
            width={20}
            height={20}
            className="h-full mx-3"
          />
          Easy and fast tournament creation
        </li>
        <li className="min-w-max flex items-center">
          <Image
            src="/star_navy.png"
            alt="star"
            width={20}
            height={20} 
            className="h-full mx-3"
          />
          Discover events in your area
        </li>
        <li className="min-w-max flex items-center">
          <Image
            src="/star_navy.png"
            alt="star"
            width={20}
            height={20}
            className="h-full mx-3"
          />
          Edit and share tournament information
        </li>
        <li className="min-w-max flex items-center">
          <Image
            src="/star_navy.png"
            alt="star"
            width={20}
            height={20}
            className="h-full mx-3"
          />
          Keep delegates updated through SMS and email
        </li>
        <li className="min-w-max flex items-center">
          <Image
            src="/star_navy.png"
            alt="star"
            width={20}
            height={20}
            className="h-full mx-3"
          />
          View and administer delegate results
        </li>
      </ul>
      <ul className="flex items-center justify-center text-base sm:text-xl text-navy-100 font-semibold animate-infinite-scroll">
        <li className="min-w-max flex items-center">
          <Image
            src="/star_navy.png"
            alt="star"
            width={20}
            height={20}
            className="h-full mx-3"
          />
          Easy and fast tournament creation
        </li>
        <li className="min-w-max flex items-center">
          <Image
            src="/star_navy.png"
            alt="star"
            width={20}
            height={20}
            className="h-full mx-3"
          />
          Discover events in your area
        </li>
        <li className="min-w-max flex items-center">
          <Image
            src="/star_navy.png"
            alt="star"
            width={20}
            height={20}
            className="h-full mx-3"
          />
          Edit and share tournament information
        </li>
        <li className="min-w-max flex items-center">
          <Image
            src="/star_navy.png"
            alt="star"
            width={20}
            height={20}
            className="h-full mx-3"
          />
          Keep delegates updated through SMS and email
        </li>
        <li className="min-w-max flex items-center">
          <Image
            src="/star_navy.png"
            alt="star"
            width={20}
            height={20}
            className="h-full mx-3"
          />
          View and administer delegate results
        </li>
      </ul>
    </div>
  );
};

export default ScrollingText;
