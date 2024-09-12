import CreateTourneyForm from "@/components/CreateTourneyForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const createTourneyPage = async () => {
  const user = await currentUser();

  if (!user || (user?.publicMetadata.role as string) !== "admin") {
    return redirect("/");
  }

  return (
    <div className="px-8 md:px-32">
      <CreateTourneyForm creatorId={user.id} />
    </div>
  );
};

export default createTourneyPage;
