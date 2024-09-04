import { NextRequest, NextResponse } from "next/server";
import CreateTourneyForm from "@/components/CreateTourneyForm";
import { currentUser } from "@clerk/nextjs/server";

const createTourneyPage = async (req: NextRequest) => {
  const user = await currentUser();

  if (!user || (user?.publicMetadata.role as string) !== "admin") {
    const { nextUrl } = req;
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return (
    <div className="px-32">
      <CreateTourneyForm creatorId={user.id} />
    </div>
  );
};

export default createTourneyPage;
