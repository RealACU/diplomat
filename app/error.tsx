"use client";

import Link from "next/link";
import Image from "next/image";

const error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40 w-full mt-4">
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center mt-6">
          <div className="gavel-container animate-gavel-rotate">
            <Image 
              src="/gavel1.svg" 
              alt="Gavel" 
              width={96}
              height={96} 
            />
          </div>
        </div>
        <Image 
          src="/gavel2.svg" 
          alt="Gavel" 
          className="-mt-[14px] ml-[66px]"
          width={48}
          height={48}
        />
      </div>
      <p className="mx-3 text-2xl font-bold pt-2 justify-center flex flex-col items-center text-periwinkle-400">
        We&apos;ve run into an error!
        <Link href="/" className="text-blue-500 underline block text-xl mt-2">
          Click here to go back.
        </Link>
      </p>
    </div>
  );
};

export default error;
