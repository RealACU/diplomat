import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { Plus, Eye } from "lucide-react";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className="bg-gradient-to-tl from-slate-300 via-slate-50 to-orange-200 to-90% h-20 px-7 items-center grid grid-cols-2 text-slate-800 flex-nowrap filter drop-shadow-lg">
      <div className="w-1/4 invisible sm:visible">
        <Link href="/" className="flex items-center">
          <Image
            src="/diplomat-logo.svg"
            width={50}
            height={0}
            alt="logo"
            className="h-auto -ml-2"
          ></Image>
          <p className="mx-3 text-2xl font-bold">Diplomat</p>
        </Link>
      </div>

      <div className="items-center flex justify-end gap-7 text-md">
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

        <div className="items-stretch flex gap-5">
          <SignedIn>
            {(user?.publicMetadata.role as string) === "admin" && (
              <Button
                asChild
                className="text-sm bg-docorange-100 py-2 px-6 rounded-md hover:bg-docorange-200 hover:scale-105 duration-100 flex-shrink-0 font-semibold hidden sm:flex"
              >
                <Link href="/admin/create-tournament">
                  <Plus />
                  Create Tournament
                </Link>
              </Button>
            )}
            <Button
              asChild
              className="text-sm bg-docorange-100 py-2 px-6 rounded-md hover:bg-docorange-200 hover:scale-105 duration-100 flex-shrink-0 font-semibold hidden md:flex"
            >
              <Link href="my-tournaments">
                <Eye className="pr-1" />
                My Tournaments
              </Link>
            </Button>

            <div className="h-auto w-auto flex items-center justify-center">
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <Button
              asChild
              className="text-[16px] bg-gradient-to-b from-slate-400 to-slate-400 py-2 px-6 rounded-md hover:bg-slate-500 hover:scale-105 transition duration-100 flex-shrink-0 font-semibold"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              className="text-[16px] bg-gradient-to-b from-orange-300 to-docorange-100 py-2 px-10 rounded-md hover:bg-[#DDA66F] hover:scale-105 transition duration-100 flex-shrink-0"
            >
              <Link href="/sign-up">Get started</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
