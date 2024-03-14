import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-slate-50 border-b-2 border-slate-200 h-16 flex justify-center">
      <div className="w-full items-center grid grid-cols-2 px-6 md:max-w-screen-2xl">
        <div>
          <Link href="/">Logo here</Link>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button variant="secondary" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Be a Model Diplomat</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
