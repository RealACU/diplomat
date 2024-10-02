"use client";
import { useState } from "react";
import getTourneysByName from "@/actions/getTourneysByName";

const SearchInput: React.FC<{ onFetch: (data: any[]) => void } & React.InputHTMLAttributes<HTMLInputElement>> = ({
    onFetch,
    className,
  }) => {
    const [input, setInput] = useState("");
  

    const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value){
            return;
        }
        const fetchedTourneys = (await getTourneysByName(e.target.value));
        onFetch(fetchedTourneys);
        
    }
    
    return(
        <div className="relative">
            <input 
                onBlur={handleBlur}
                type="text"
                id="search-bar"
                placeholder="Search for a tournament near you"
                className={className}
            />
        </div>
    )
}

export default SearchInput;