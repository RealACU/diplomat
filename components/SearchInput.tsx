"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import getTourneysByName from "@/actions/getTourneysByName";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchInput: React.FC<{ onFetch: (data: any[]) => void; fetchAll: () => void } & React.InputHTMLAttributes<HTMLInputElement>> = ({
    onFetch,
    fetchAll,
    className,
    onChange,
  }) => {
    const [input, setInput] = useState("");
  
    const handleSearch = async () => {
        if (input.trim()) {
            const fetchedTourneys = await getTourneysByName(input);
            onFetch(fetchedTourneys);
        } else {
            fetchAll();
        }
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input) {
          e.preventDefault();
          const fetchedTourneys = await getTourneysByName(input);
          onFetch(fetchedTourneys);
        }  
    }

    const handleBlur = () => {
        if (!input.trim()) {
            fetchAll();
        }
    };
    
    return(
        <div className="relative w-full flex flex-row">
            <button onClick={handleSearch} >
                <Search className="mx-4"/>
            </button>
            <input 
            value={input}
            onChange={(e) => {
                setInput(e.target.value);
                onChange && onChange(e);
            }}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            type="text"
            id="search-bar"
            placeholder="Search..."
            className={`w-full ${className}`}
            />
        </div>
    );
}

export default SearchInput;
