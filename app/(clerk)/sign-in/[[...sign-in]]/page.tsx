import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="mt-32 mb-44">
    <SignIn />
  </div>;
}
