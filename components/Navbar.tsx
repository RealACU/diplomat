import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { Plus, Eye } from "lucide-react";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className="bg-gradient-to-br from-slate-50 to-slate-300 to-95% h-20 px-7 items-center grid grid-cols-2 text-slate-800 flex-nowrap filter drop-shadow-lg">
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

      <div className="flex justify-end">
        <div className="hidden sm:flex gap-7 items-center">
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
            {(user?.publicMetadata.role as string) === "admin" && (
              <Button
                asChild
                className="text-[16px] bg-gradient-to-tr from-slate-400 to-[#7388a2] -mx-1 py-2 px-6 rounded-md hover:bg-gradient-to-r transition-all hover:scale-105 duration-100 flex-shrink-0 font-semibold hidden sm:flex"
              >
                <Link href="/admin/create-tournament">
                  <Plus className="mr-1 px-0.5 -ml-2" />
                  Create Tournament
                </Link>
              </Button>
            )}
            <Button
              asChild
              className="text-[16px] bg-gradient-to-tl from-[#c1ad5e] to-[#d6975f] -mx-1 py-2 px-6 rounded-md hover:bg-gradient-to-t transition-all hover:scale-105 duration-100 flex-shrink-0 font-semibold hidden sm:flex"
            >
              <Link href="my-tournaments">
                <Eye className="mr-1 px-0.5 -ml-2" />
                My Tournaments
              </Link>
            </Button>
          </SignedIn>
        </div>

        <SignedIn>
          <div className="h-auto w-auto flex items-center justify-center ml-8">
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="hidden sm:flex gap-5">
            <Button
              asChild
              className="text-[16px] bg-gradient-to-b from-slate-400 to-[#7388a2] py-2 px-6 rounded-md hover:bg-gradient-to-bl hover:scale-105 transition duration-100 flex-shrink-0 font-semibold"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              className="text-[16px] bg-gradient-to-b from-[#c1ad5e] to-[#d6975f] py-2 px-10 rounded-md hover:bg-gradient-to-br hover:scale-105 transition duration-100 flex-shrink-0"
            >
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
