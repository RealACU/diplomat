import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";

const NAV_LINKS = [
  { href: "/contact-us", label: "Contact us" },
  { href: "/about", label: "About" },
];

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className="bg-slate-50 h-20 px-7 items-center grid grid-cols-2 text-slate-800 flex-nowrap filter drop-shadow-lg">
      <div>
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
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className="transition-all hover:font-bold focus:font-medium"
            >
              {link.label}
            </Link>
          ))}
        </ul>

        <div className="items-stretch flex gap-5">
          <SignedIn>
            {(!user || (user?.publicMetadata.role as string) !== "admin") && (
              <Button asChild>
                <Link
                  href="/sign-in"
                  className="text-lg bg-slate-500 py-2 px-6 rounded-md hover:bg-slate-400 hover:scale-105 duration-100 flex-shrink-0 font-semibold"
                >
                  <Plus />
                  Create Tournament
                </Link>
              </Button>
            )}
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <Link
                href="/sign-in"
                className="text-lg bg-slate-500 py-2 px-6 rounded-md hover:bg-slate-400 hover:scale-105 duration-100 flex-shrink-0 font-semibold"
              >
                Sign in
              </Link>
            </Button>
            <Button asChild>
              <Link
                href="/sign-up"
                className="text-lg bg-docorange-100 py-2 px-10 rounded-md hover:bg-docorange-100 hover:scale-105 duration-100 flex-shrink-0"
              >
                Get Started
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
