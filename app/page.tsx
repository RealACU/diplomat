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
      <div className="flex h-screen justify-between overflow-hidden">
        <div className="relative flex-grow w-full xl:flex-1">

          {/*absolutely ratchet solution to this blur thing, but I have spent far too long on this thus far. I digress*/}
          <div className="sm:absolute sm:mx-52 sm:my-20 sm:px-32 sm:py-16 sm:z-20 sm:filter sm:blur-2xl">
            <div className="sm:h-64 sm:w-72 sm:bg-slate-200"/>
          </div>

          <h1 style={{ lineHeight: '1.2' }} className="relative sm:absolute text-6xl sm:text-8xl font-semibold sm:text-left text-center sm:px-12 pt-10 sm:pt-20 z-30 text-navy-100">Your gateway to everything Model UN</h1>
          <div className="relative sm:absolute my-12 sm:my-0 sm:mt-[480px] sm:mx-12 gap-x-6 flex sm:flex-row flex-col">
            <Button className="mx-8 sm:mx-0 py-8 px-8 text-2xl font-bold bg-periwinkle-100 hover:bg-periwinkle-200 shadow-lg transition-all duration-110">
              <Link href="/view-tournaments">View Tournaments</Link>
            </Button>
            <div className="mt-6 sm:mt-0 flex flex-row items-center justify-center">
              <Link 
                href="/sign-up"
                className="relative mx-6 text-2xl font-bold text-navy-100 z-50 hover:text-navy-200 hover:mr-8 transition-all duration-110"
              >
                Sign up
              </Link>
              <ChevronRight className="text-navy-200"/>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full w-full relative overflow-visible">
          <div className="absolute right-0 bottom-0 w-[167%] h-[167%] -mr-[28%] -mb-[25%] z-10 hidden xl:block">
            <Image
              src="/globe.png"
              alt="globe"
              layout="fill" // Makes it responsive
              objectFit="cover" // Makes it cover the space
              className="opacity-80"
            />
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
              <p className="hidden sm:block">
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/*
<div className="bg-docblue-100 h-auto relative py-4 sm:py-8 px-4 sm:px-6 text-slate-800">
  <div className="flex flex-col sm:flex-row gap-6">
    <div className="bg-slate-50 w-full sm:w-2/3 rounded-lg">
      <div className="flex flex-col w-full">
        <div className="bg-slate-50 w-full h-10 sm:h-14 rounded-lg filter drop-shadow-md flex items-center pr-4">
          <button>
            <Search className="mx-4"/>
          </button>
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

*/