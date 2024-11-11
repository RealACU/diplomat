"use client";

import Link from "next/link";

const error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40 w-full mt-4">
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center mt-6">
          <div className="gavel-container animate-gavel-rotate">
            <img 
              src="/gavel1.svg" 
              alt="Gavel" 
              className="w-24 h-24" 
            />
          </div>
        </div>
        <img 
          src="/gavel2.svg" 
          alt="Gavel" 
          className="-mt-[40px] ml-[66px] w-12 h-12"
        />
      </div>
      <p className="mx-3 text-2xl font-bold pt-2 justify-center flex flex-col items-center text-periwinkle-400">
        We've run into an error!
        <Link href="/" className="text-blue-500 underline block text-xl mt-2">
          Click here to go back.
        </Link>
      </p>
    </div>
  );
};

export default error;
