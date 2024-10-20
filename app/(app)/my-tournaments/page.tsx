import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import getTourneyById from "@/actions/getTourneyById";

const MyTournamentsPage = async () => {
  const user = await currentUser();

  const chairTourneys: string[] =
    (user?.publicMetadata.cTourneys as string[]) || [];
  const delegateTourneys: string[] =
    (user?.publicMetadata.dTourneys as string[]) || [];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Tournaments where I'm a chair</h2>
      {chairTourneys &&
        chairTourneys.map(async (cTourneyId) => {
          const tourneyInfo = await getTourneyById(cTourneyId);

          if (!tourneyInfo) return null;

          return (
            <Button key={cTourneyId}>
              <Link href={`/my-tournaments/${cTourneyId}`}>
                {tourneyInfo.name}
              </Link>
            </Button>
          );
        })}
      <h2 className="text-xl font-semibold">
        Tournaments where I'm a delegate
      </h2>
      {delegateTourneys &&
        delegateTourneys.map(async (dTourneyId) => {
          const tourneyInfo = await getTourneyById(dTourneyId);

          if (!tourneyInfo) return null;

          return (
            <Button key={dTourneyId}>
              <Link href={`/my-tournaments/${dTourneyId}`}>
                {tourneyInfo.name}
              </Link>
            </Button>
          );
        })}
      {!delegateTourneys && <div>Nothing</div>}
    </div>
  );
};

export default MyTournamentsPage;
