import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import getTourneyById from "@/actions/getTourneyById";

const MyTournamentsPage = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Tournaments where I'm a chair</h2>
      {(user?.publicMetadata.cTourneys as string[]).map(async (cTourneyId) => {
        const tourneyInfo = await getTourneyById(cTourneyId);

        if (!tourneyInfo) return null;

        return (
          <Button>
            <Link href={`/my-tournaments/${cTourneyId}`}>
              {tourneyInfo.name}
            </Link>
          </Button>
        );
      })}
      <h2 className="text-xl font-semibold">
        Tournaments where I'm a delegate
      </h2>
    </div>
  );
};

export default MyTournamentsPage;
