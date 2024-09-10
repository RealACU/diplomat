"use client";

import Image from "next/image";
import Link from "next/link";

const error = () => {
  return (
    <Link href="/" className="flex flex-col items-center justify-center h-40 w-full">
      <Image
        src="/diplomat-logo.svg"
        width={50}
        height={0}
        alt="logo"
        className="h-auto -ml-2 sepia"
      ></Image>
      <p className="mx-3 text-2xl font-bold pt-4">Sorry about that! Click here to go back.</p>
    </Link>
  );
};

export default error;
