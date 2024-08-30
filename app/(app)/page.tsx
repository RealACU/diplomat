"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const banner_texts = [
  "Easy and fast tournament creation",
  "Discover events in your area",
  "Edit and share tournament information",
  "Keep delegates updated through SMS and email",
  "View and administer delegate results",
  "Easy and fast tournament creation",
  "Discover events in your area",
  "Edit and share tournament information",
  "Keep delegates updated through SMS and email",
  "View and administer delegate results",
  "Easy and fast tournament creation",
  "Discover events in your area",
  "Edit and share tournament information",
  "Keep delegates updated through SMS and email",
  "View and administer delegate results",

];

export default function Home() {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      
      const content = textElement.innerHTML;
      textElement.innerHTML += content;
    }
  }, []);

  return (
    <div>
      <div className="relative h-screen">
        <div className="w-full h-screen bg-docblue-200 z-10 absolute opacity-50" />
        <div className="bg-frontpage w-full h-screen bg-no-repeat bg-center bg-cover absolute" />

        <div className="relative banner-container">
          <ul
            className="banner-text text-lg text-white"
            ref={textRef}
          >
            {banner_texts.map((banner_text, index) => (
              <li key={index} className="min-w-max flex items-center">
                <Image
                  src="/star_white.png"
                  alt="star"
                  width={20}
                  height={20}
                  className="h-full mx-3"
                />
                {banner_text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center w-full items-center text-white text-4xl lg:text-6xl absolute z-30 font-semibold pt-16 text-center h-28">
          <h1 className="md:w-full w-96">
            Your gateway to everything Model UN.
          </h1>
        </div>

        <nav className="relative grid sm:flex justify-center items-center gap-6 z-20 text-white text-xl font-semibold whitespace-nowrap">
          <a
            href="/about"
            className="bg-docorange-100 rounded-md mt-40 py-4 bg-opacity-75 hover:bg-opacity-100 hover:scale-105 duration-100 md:px-32 px-10 text-center"
          >
            Learn more
          </a>

          <a
            href="/tournament-page"
            className="bg-docblue-100 rounded-md sm:mt-40 py-4 bg-opacity-75 hover:bg-opacity-100 hover:scale-105 duration-100 md:px-32 px-10 text-center"
          >
            MAVMUN
          </a>
        </nav>
      </div>
      <div className="bg-docblue-100 h-auto relative px-6 py-10">
        <div className="flex gap-6">
          <div className="bg-slate-50 w-2/3 rounded-lg">
            <div className="bg-slate-50 w-full h-14 rounded-lg filter drop-shadow-md flex items-center">
              <Image
                src="/search_icon.png"
                alt="search_icon"
                width={30}
                height={30}
                className="h-auto mx-4"
              />
              <input
                type="text"
                id="search-bar"
                placeholder="Search for a tournament near you"
                className="text-xl font-semibold text-slate-800 placeholder-slate-300"
              />
            </div>
            <div className="w-full h-[465px]"></div>
          </div>
          <div className="bg-slate-300 w-1/3 rounded-lg">
            <div className="bg-slate-300 w-full h-14 rounded-lg filter drop-shadow-md flex items-center">
              <p className="text-xl font-semibold text-slate-800 mx-8">
                Filter by
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
