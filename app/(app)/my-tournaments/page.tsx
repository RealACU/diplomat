import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import getTourneyById from "@/actions/getTourneyById";

const MyTournamentsPage = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-4 py-10 px-8 md:px-32">
      <h2 className="text-xl font-semibold">Tournaments where I'm a chair</h2>
      {(user?.publicMetadata.cTourneys as string[]) &&
        (user?.publicMetadata.cTourneys as string[]).map(async (cTourneyId) => {
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
      {(user?.publicMetadata.dTourneys as string[]) &&
        (user?.publicMetadata.dTourneys as string[]).map(async (dTourneyId) => {
          const tourneyInfo = await getTourneyById(dTourneyId);

          if (!tourneyInfo) return null;

          return (
            <Button>
              <Link href={`/my-tournaments/${dTourneyId}`}>
                {tourneyInfo.name}
              </Link>
            </Button>
          );
        })}
    </div>
  );
};

export default MyTournamentsPage;
