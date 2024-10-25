"use client"; 

import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Plus, Eye } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  return (
    <nav className="bg-white h-20 px-7 items-center flex justify-between text-slate-800 filter drop-shadow-lg z-50">
      <div className="w-1/4">
        <Link href="/" className="flex items-center">
          <Image
            src="/diplomat-logo.svg"
            width={50}
            height={0}
            alt="logo"
            className="h-auto -ml-2"
          />
          <p className="mx-3 text-2xl font-bold">Diplomat</p>
        </Link>
      </div>

      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="md:hidden flex items-center py-2 rounded text-gray-700"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div className="hidden md:flex gap-7 items-center">
        <ul className="space-x-7 hidden lg:flex flex-shrink-0">
          <Link
            href="/contact-us/"
            className="transition-all hover:font-bold focus:font-medium"
          >
            Contact Us
          </Link>
          <Link
            href="/about/"
            className="transition-all hover:font-bold focus:font-medium"
          >
            About
          </Link>
        </ul>

        <SignedIn>
          {user?.publicMetadata.role === "admin" && (
            <Button
              asChild
              className="text-[16px] text-slate-800 bg-slate-200 -mx-1 py-2 px-6 rounded-md hover:bg-slate-300 transition-all hover:scale-105 duration-100 flex-shrink-0 font-semibold"
            >
              <Link href="/admin/create-tournament">
                <Plus className="mr-1 px-0.5 -ml-2" />
                Create Tournament
              </Link>
            </Button>
          )}
          <Button
            asChild
            className="text-[16px] bg-periwinkle-100 -mx-1 py-2 px-6 rounded-md hover:bg-periwinkle-200 transition-all hover:scale-105 duration-100 flex-shrink-0 font-semibold"
          >
            <Link href="/my-tournaments">
              <Eye className="mr-1 px-0.5 -ml-2" />
              My Tournaments
            </Link>
          </Button>
        </SignedIn>

        <SignedIn>
          <div className="h-auto w-auto flex items-center justify-center ml-2">
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex gap-5">
            <Button
              asChild
              className="text-[16px] text-slate-800 bg-slate-200 py-2 px-6 rounded-md hover:bg-slate-300 hover:scale-105 transition duration-100 flex-shrink-0 font-semibold shadow-md"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              className="text-[16px] bg-periwinkle-100 py-2 px-10 rounded-md hover:bg-periwinkle-200 hover:scale-105 transition duration-100 flex-shrink-0 font-semibold shadow-md"
            >
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </SignedOut>
      </div>

      {isOpen && (
        <div 
          tabIndex={0}
          onBlur={() => setIsOpen(false)}
          className={`md:hidden absolute top-16 ${user ? 'left-0 w-full' : '-right-4 pr-2 w-4/5'} bg-white bg-opacity-50 shadow-md flex justify-end text-end rounded-xl pt-4`}
        >
          <SignedIn>
            <div className="h-auto w-auto flex flex-col items-center justify-center mr-1">
              <UserButton/>
              <span className="text-md font-bold text-slate-800 mt-2">{user?.firstName}</span>
            </div>
          </SignedIn>
          
          <ul className="flex flex-col gap-2 px-6 py-4">
            <div className="flex flex-row gap-x-2">
              <Button
                asChild
                className="text-[16px] bg-periwinkle-100 py-2 px-6 rounded-md hover:bg-periwinkle-200 transition-all hover:scale-105 duration-100 font-semibold"
              >
                <Link href="/contact-us/">
                  Contact Us
                </Link>
              </Button>
              <Button
                asChild
                className="text-[16px] bg-periwinkle-100 py-2 px-6 rounded-md hover:bg-periwinkle-200 transition-all hover:scale-105 duration-100 font-semibold"
              >
                <Link href="/about/">
                  About
                </Link>
              </Button>
            </div>

            <SignedIn>
              {user?.publicMetadata.role === "admin" && (
                <Button
                  asChild
                  className="text-[16px] bg-periwinkle-200 py-2 px-6 rounded-md hover:bg-periwinkle-300 transition-all hover:scale-105 duration-100 font-semibold"
                >
                  <Link href="/admin/create-tournament">
                    <Plus className="mr-1 px-0.5 -ml-2" />
                    Create Tournament
                  </Link>
                </Button>
              )}
              <Button
                asChild
                className="text-[16px] bg-periwinkle-300 py-2 px-6 rounded-md hover:bg-periwinkle-400 transition-all hover:scale-105 duration-100 font-semibold"
              >
                <Link href="/my-tournaments">
                  <Eye className="mr-1 px-0.5 -ml-2" />
                  My Tournaments
                </Link>
              </Button>
            </SignedIn>

            <SignedOut>
              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  className="text-[16px] bg-periwinkle-200 py-2 px-6 rounded-md hover:bg-periwinkle-300 hover:scale-105 transition duration-100 font-semibold shadow-md"
                >
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button
                  asChild
                  className="text-[16px] bg-periwinkle-300 py-2 px-6 rounded-md hover:bg-periwinkle-400 hover:scale-105 transition duration-100 font-semibold shadow-md"
                >
                  <Link href="/sign-up">Get started</Link>
                </Button>
              </div>
            </SignedOut>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
