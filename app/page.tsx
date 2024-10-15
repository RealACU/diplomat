"use client";

import Image from "next/image";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import getAllTourneys from "@/actions/getAllTourneys";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tourneys, setTourneys] = useState<any[]>([]);
  const searchInputRef = useRef(null);
  
  const fetchTourneys = async () => {
    setLoading(true);
    const allTourneys = await getAllTourneys();
    setTourneys(allTourneys);
    setLoading(false);
  };

  useEffect(() => {
    fetchTourneys();
  }, []);

  return (
    <div>
      <div className="relative h-screen">
        <div className="w-full h-screen bg-docblue-200 z-10 absolute opacity-35" />
        <div className="bg-frontpage w-full h-screen bg-no-repeat bg-center bg-cover absolute" />

        <div className="relative whitespace-nowrap w-full z-0 mt-2 flex-nowrap inline-flex overflow-hidden">
          <ul className="flex items-center justify-center text-lg text-white animate-infinite-scroll">
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Easy and fast tournament creation
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Discover events in your area
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Edit and share tournament information
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Keep delegates updated through SMS and email
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              View and administer delegate results
            </li>
          </ul>
          <ul className="flex items-center justify-center text-lg text-white animate-infinite-scroll">
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Easy and fast tournament creation
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Discover events in your area
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Edit and share tournament information
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              Keep delegates updated through SMS and email
            </li>
            <li className="min-w-max flex items-center">
              <Image
                src="/star_white.png"
                alt="star"
                width={20}
                height={0}
                className="h-full mx-3"
              ></Image>
              View and administer delegate results
            </li>
          </ul>
        </div>

        <div className="flex justify-center w-full px-6 items-center text-white text-[40px] leading-[1.25] lg:text-6xl absolute z-30 font-semibold pt-20 sm:pt-16 text-center h-28">
          <h1 className="md:w-full w-96">
            Your gateway to everything Model UN
          </h1>
        </div>

        <nav className="mt-10 relative grid sm:flex justify-center items-center gap-6 z-20 text-white text-xl font-semibold whitespace-nowrap">
          <a
            href="/view-tournaments"
            className="bg-gradient-to-bl from-[#dcc56a]/75 to-[#ba804d]/75 rounded-md mt-40 py-4 hover:bg-[#ba804d]/90 hover:bg-opacity-100 hover:scale-105 duration-100 md:px-20 px-12 text-center"
          >
            View Tournaments
          </a>

          <a
            href="/about"
            className="-mt-3 bg-gradient-to-br from-docblue-200/50 to-docblue-100/75 rounded-md sm:mt-40 py-4 hover:to-docblue-100/100 bg-opacity-75 hover:bg-opacity-100 hover:scale-105 duration-100 md:px-28 px-12 text-center"
          >
            Learn More
          </a>
        </nav>
      </div>
      <div className="bg-docblue-100 h-auto relative py-4 sm:py-8 px-4 sm:px-6 text-slate-800">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="bg-slate-50 w-full sm:w-2/3 rounded-lg">
            <div className="flex flex-col w-full">
              <div className="bg-slate-50 w-full h-10 sm:h-14 rounded-lg filter drop-shadow-md flex items-center px-2">
                <SearchInput
                  className="text-lg sm:text-xl font-medium h-full py-1 w-full placeholder-slate-400"
                  onFetch={setTourneys}
                />
              </div>
            </div>
            <div className="w-full h-[465px] overflow-auto bg-white rounded-md shadow-md mt-2">
              <ul>
                {loading ? (
                  <li className="py-2 flex justify-center items-center">Fetching tournaments...</li>
                ) : tourneys.length > 0 ? (
                  tourneys.map(tourney => (
                    <li key={tourney.id}>
                      <Link href={`/my-tournaments/${tourney.id}`}>
                        <div className="bg-slate-200 mx-4 px-4 py-3 my-3 rounded-md hover:bg-slate-300 duration-100 font-bold text-md flex overflow-clip">
                          <div className="w-3/5 break-words pr-8">{tourney.name}</div>
                          <div className="w-1/5 break-words">{tourney.city}, {tourney.state}</div>
                          <div className="ml-auto text-right">{tourney.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="py-2 flex justify-center items-center">No tournaments found.</li>
                )}
              </ul>
            </div>
          </div>
          <div className="bg-slate-300 w-full sm:w-1/3 rounded-lg">
            <div className="bg-slate-300 w-full h-14 rounded-lg filter drop-shadow-md flex items-center">
              <p className="text-md sm:text-xl font-semibold mx-2 sm:mx-8">
                My Tournaments
              </p>
              <p className="hidden sm:block">stuff</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
