"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import getAllTourneys from "@/actions/getAllTourneys";

export default function Home() {
  const [tourneys, setTourneys] = useState<any[]>([]);
  
  const fetchTourneys = async () => {
    const allTourneys = await getAllTourneys();
    setTourneys(allTourneys);
  };

  useEffect(() => {
    fetchTourneys();
  }, []);

  return (
    <div className="bg-gradient-to-bl from-docblue-100 to-[#d6975f] h-full relative px-6 py-6 text-slate-800">
        <div className="flex gap-6">
            <div className="bg-slate-50 w-4/5 rounded-lg">
                <div className="flex flex-col w-full">
                <div className="bg-slate-50 w-full h-14 rounded-lg filter drop-shadow-md flex items-center pr-4">
                    <button>
                    <Search className="mx-4"/>
                    </button>
                    <SearchInput
                    className="text-xl font-medium h-full py-1 w-full placeholder-slate-400"
                    onFetch={setTourneys}
                    />
                </div>
                </div>
                <div className="w-full h-[465px] overflow-auto bg-white rounded-md shadow-md mt-2">
                    <ul>
                        <div className="mx-4 px-4 my-1 rounded-md font-bold text-md flex overflow-clip">
                            <div className="w-3/5 break-words pr-8">Name</div>
                            <div className="w-1/5 break-words">City, State</div>
                            <div className="ml-auto text-right">Start Date</div>
                        </div>
                    </ul>
                    <ul>
                        {tourneys.length > 0 ? (
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
                        <li className="py-2 flex justify-center items-center">Fetching tournaments...</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="bg-slate-300 w-1/5 rounded-lg">
                <div className="bg-slate-300 w-full h-14 rounded-lg filter drop-shadow-md flex items-center">
                <p className="text-xl font-semibold mx-8">
                    Filter by
                </p>
                </div>
            </div>
        </div>
    </div>
  );
}
