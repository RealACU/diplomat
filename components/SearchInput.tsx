"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import getTourneysByName from "@/actions/getTourneysByName";
import { Search } from "lucide-react";

const SearchInput: React.FC<
  {
    onFetch: (data: any[]) => void;
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ onFetch, className }) => {
  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      return;
    }
    const fetchedTourneys = await getTourneysByName(e.target.value);
    onFetch(fetchedTourneys);
  };

  return (
    <div className="h-full w-full flex gap-2 p-2">
      <Input
        onBlur={handleBlur}
        type="text"
        id="search-bar"
        placeholder="Search for a tournament..."
        className={`w-full ${className}`}
      />
      <Button className="">
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;
