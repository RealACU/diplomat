"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import getAllTourneys from "@/actions/getAllTourneys";
import getTourneysByName from "@/actions/getTourneysByName";

export default function Home() {
  const [tourneys, setTourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);  
  
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
    <div className="h-full relative px-6 py-6 text-slate-800">
        <div className="flex flex-col gap-6 items-center">
            <h1 className="font-bold text-4xl text-navy-100 mt-12 mb-2 text-center flex sm:text-start">
                Search for a tournament
            </h1>
            <div className="flex flex-col w-full sm:w-[800px] mb-2 sm:mb-10">
                <div className="bg-slate-50 w-full h-14 rounded-lg filter drop-shadow-md flex items-center pr-4">
                    <SearchInput
                        className="text-xl font-medium h-full py-1 w-full placeholder-slate-400 bg-slate-50"
                        onFetch={setTourneys}
                        fetchAll={fetchTourneys}  
                    />
                </div>
            </div>
            <div className="bg-slate-50 w-full rounded-lg">
                <div className="w-full min-h-[465px] bg-white rounded-md shadow-md">
                    <ul className="bg-slate-350 px-4 py-1 font-bold text-base flex overflow-clip">
                        <div className="w-[50%] sm:w-[60%] break-words pr-8">Name</div>
                        <div className="w-[25%] break-words flex">
                            <p className="w-full block sm:hidden">City, State</p>
                            <p className="w-0 sm:w-5/6 hidden sm:block">City</p>
                            <p className="w-0 sm:w-1/6 hidden sm:block">State</p>
                        </div>
                        <div className="ml-auto text-right w-0 sm:w-[15%] hidden sm:block">Start Date</div>
                        <div className="ml-auto text-right w-[25%] sm:w-0 block sm:hidden">Date</div>
                    </ul>
                    <ul>
                        {loading ? (
                        <li className="py-2 flex justify-center items-center">Fetching tournaments...</li>
                        ) : tourneys.length > 0 ? (
                            tourneys.map(tourney => (
                                <li key={tourney.id} className="odd:bg-slate-100 even:bg-slate-200 odd:hover:bg-periwinkle-50 even:hover:bg-periwinkle-100 transition-all duration-200">
                                    <Link href={`/my-tournaments/${tourney.id}`}>
                                        <div className="px-4 py-3 rounded-md font-semibold text-md flex overflow-clip">
                                            <div className="w-[50%] sm:w-[60%] break-words pr-8">{tourney.name}</div>
                                            <div className="w-[25%] break-words flex">
                                                <p className="w-full block sm:hidden">{tourney.city}, {tourney.state}</p>
                                                <p className="w-0 sm:w-5/6 hidden sm:block">{tourney.city}</p>
                                                <p className="w-0 sm:w-1/6 hidden sm:block">{tourney.state}</p>
                                            </div>
                                            <div className="ml-auto text-right w-[25%] sm:w-[15%]">{tourney.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
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
        </div>
    </div>
  );
}
