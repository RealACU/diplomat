import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import CreateTourneyForm from "@/components/CreateTourneyForm";

const createTourneyPage = async (req: NextRequest) => {
  const user = await currentUser();

  if (!user || (user?.publicMetadata.role as string) !== "admin") {
    const { nextUrl } = req;
    NextResponse.redirect(new URL("/", nextUrl));
  }

  return <CreateTourneyForm />;
};

export default createTourneyPage;
