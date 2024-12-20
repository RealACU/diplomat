"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearchInput";
import { useState, useRef, useEffect } from "react";
import { Scroll, Search, ChevronRight } from "lucide-react";
import getAllTourneys from "@/actions/getAllTourneys";
import ScrollingText from "@/components/ScrollingText";
import GlobeComponent from "@/components/GlobeComponent";
import { isAfter, isToday } from "date-fns";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showGlobe, setShowGlobe] = useState(false); 
  const [tourneys, setTourneys] = useState<any[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const searchInputRef = useRef(null);
  
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchTourneys = async () => {
    setLoading(true);
    const allTourneys = await getAllTourneys();
    setTourneys(allTourneys);
    setLoading(false);
    setShowGlobe(true); 
  };

  useEffect(() => {
    fetchTourneys();
  }, []);

  return (
    <div>
      <div className="flex-col sm:flex sm:flex-row h-[745px] sm:min-h-screen justify-between overflow-hidden">
        <div className="relative flex-grow w-full xl:flex-1">

          {/*absolutely ratchet solution to this blur thing, but I have spent far too long on this thus far. I digress*/}
          <div className="sm:absolute sm:mx-52 sm:my-20 sm:px-32 sm:py-16 sm:z-20 sm:filter sm:blur-2xl">
            <div className="sm:h-64 sm:w-72 sm:bg-slate-200"/>
          </div>

          <h1 style={{ lineHeight: '1.2' }} className="relative sm:absolute text-5xl sm:text-8xl 2xl:text-8.5xl 3xl:text-9xl font-semibold sm:text-left text-center pl-4 pr-4 sm:pr-0 sm:pl-12 sm:-mr-16 xl:-mr-8 pt-[320px] sm:pt-16 z-30 text-navy-100">
            Your gateway to everything Model UN
          </h1>
          <div className="relative sm:absolute my-8 sm:my-0 sm:mt-[480px] 2xl:mt-[500px] sm:mx-12 gap-x-6 flex flex-row">
            <Button className="ml-8 sm:mx-0 py-6 sm:py-8 px-4 sm:px-8 text-base sm:text-2xl font-bold bg-periwinkle-100 hover:bg-periwinkle-200 shadow-lg transition-all duration-110 z-50">
              <Link href="/view-tournaments">View Tournaments</Link>
            </Button>
            <div className="mt-0 flex flex-row items-center justify-center">
              <Link 
                href="/sign-up"
                className="relative ml-0 mr-2 sm:mr-6 sm:ml-6 text-base sm:text-2xl font-bold text-navy-100 z-50 hover:text-navy-200 hover:mr-8 transition-all duration-110"
              >
                Sign up
              </Link>
              <ChevronRight className="text-navy-200"/>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-1 h-full w-full relative overflow-visible -mt-[830px] sm:-mt-0">
          <div className="absolute right-0 bottom-0 w-[130%] h-[130%] md:w-[120%] md:h-[120%] lg:w-[167%] lg:h-[167%] -mr-[56px] sm:-mr-[28%] -mb-[25%] z-0">
            {showGlobe && (
              <Image
                src="/globe.png"
                alt="globe"
                layout="fill" // Makes it responsive
                style={{ objectFit: isSmallScreen ? "contain" : "cover" }} // Makes it cover the space based on screen size
                className="opacity-80"
              />
            )}
          </div>
        </div>
      </div>
      <div className="relative w-full h-full flex flex-col -mt-32">
        <div className="absolute w-full z-20 h-8 bg-slate-200 filter blur-3xl"/>
        <ScrollingText/>
      </div>
      <div className="h-auto w-full bg-periwinkle-100 mt-3 z-30 relative py-4 sm:py-8 px-4 sm:px-6 text-slate-800">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="bg-slate-50 w-full sm:w-2/3 rounded-lg">
            <div className="flex flex-col w-full">
              <div className="bg-slate-50 w-full h-10 sm:h-14 rounded-lg filter drop-shadow-md flex items-center pr-4">
                <SearchInput
                  className="text-lg sm:text-xl font-medium h-full py-1 w-full placeholder-slate-400 bg-slate-50"
                  onFetch={setTourneys}
                  fetchAll={fetchTourneys}
                />
              </div>
            </div>
            <div className="w-full min-h-[465px] bg-white rounded-md shadow-md mt-2">
              <ul>
                {loading ? (
                  <li className="py-2 flex justify-center items-center">Fetching tournaments...</li>
                ) : tourneys.length > 0 ? (
                  tourneys
                  .filter(tourney => {
                    return isAfter(new Date(tourney.startDate), new Date()) || isToday(new Date(tourney.startDate));
                  })
                  .map(tourney => (
                    <li key={tourney.id}>
                      <Link href={`/my-tournaments/${tourney.id}`}>
                        <div className="bg-slate-200 mx-2 sm:mx-4 px-4 py-3 my-3 rounded-md hover:bg-slate-300 duration-100 font-semibold text-sm sm:text-base flex overflow-clip">
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
          <div className="bg-slate-300 w-full sm:w-1/3 rounded-lg shadow-md">
            <div className="bg-slate-300 w-full h-14 rounded-lg filter drop-shadow-md flex items-center">
              <p className="text-md sm:text-xl font-semibold mx-2 sm:mx-8">
                My Tournaments
              </p>
            </div>
            <p className="py-4 justify-center items-center text-center w-full hidden sm:block">
              Sign up for a tournament! 
              <Link href="/view-tournaments" className="text-blue-500 font-semibold hover:underline ml-2">View tournaments</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}