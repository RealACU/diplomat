"use client";
import { useState } from "react";

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return <input 
        type="text"
        id="search-bar"
        placeholder="Search for a tournament near you"
        className="text-xl font-semibold h-[55px] w-full text-slate-800 placeholder-slate-300"
    />
}

export default SearchInput;