import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import getTourneyById from "@/actions/getTourneyById";
import { CldUploadButton } from "next-cloudinary";

const tourneyPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (
    !user ||
    !(user?.publicMetadata.cTourneys as string[]).includes(params.id)
  ) {
    return redirect("/");
  }

  const tourney = await getTourneyById(params.id);

  return (
    <>
      <h1 className="text-lg font-medium">
        You are a chair for{" "}
        <span className="text-xl font-semibold">{tourney?.name}</span> under the{" "}
        <span className="text-xl font-semibold">
          {
            tourney?.committees?.filter((committee) => {
              committee.chairIds.includes(user.id);
            })[0].name
          }
        </span>{" "}
        committee.
      </h1>

      <CldUploadButton uploadPreset="BackgroundGuide" />
    </>
  );
};

export default tourneyPage;
