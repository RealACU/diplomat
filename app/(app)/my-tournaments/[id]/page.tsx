import React from "react";
import TabsComponent from "@/components/ui/tabs";
import { currentUser } from "@clerk/nextjs/server";
import CommitteeSignUp from "@/components/CommitteeSignUp";
import MunLogoSVG from "@/components/MunLogoSVG";
import UploadButton from "@/components/UploadButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download } from "lucide-react";
import getTourneyById from "@/actions/getTourneyById";
import TournamentInformation from "@/components/TournamentInformation";

const tourneyPage = async ({ params }: { params: { id: string } }) => {
  const tourney = await getTourneyById(params.id);

  if (!tourney) {
    return <div>Tournament not found</div>;
  }

  const user = await currentUser();
  console.log(user);

  const {
    name,
    description,
    startDate,
    endDate,
    committees,
    primaryColorHex,
    secondaryColorHex,
    delegateResources,
  } = tourney;

  const isCreator = user?.id === tourney.creatorId;
  console.log("isCreator", isCreator);

  const isAdmin = user?.publicMetadata.role === "admin";

  const isChair =
    user &&
    committees.some((committee) => committee.chairIds.includes(user?.id));

  const isDelegate =
    user &&
    committees.some((committee) => committee.delegateIds.includes(user?.id));

  const myCommittee = isChair
    ? committees.filter(
        (committee) => user && committee.chairIds.includes(user.id)
      )[0]
    : isDelegate
    ? committees.filter(
        (committee) => user && committee.delegateIds.includes(user.id)
      )[0]
    : null;

  const items = [
    {
      title: "Invitation",
      color: tourney.primaryColorHex,
      content: (
        <div
          className="relative w-full h-auto py-4 sm:py-8 px-4 sm:px-6 text-slate-800 z-20"
          style={{
            background: `
              linear-gradient(130deg, ${tourney.primaryColorHex} 5%, ${tourney.secondaryColorHex} 70%)
            `,
          }}
        >
          <div className="flex-col sm:flex-row sm:flex gap-4 sm:gap-6">
            <div className="bg-slate-300 bg-opacity-75 pb-0  w-full sm:w-2/3 rounded-lg filter drop-shadow-lg">
              <div className="w-full h-10 sm:h-14 rounded-lg flex shadow-md items-center justify-center">
                <p className="text-lg sm:text-xl font-semibold mx-2 sm:mx-8">
                  Invitation Message
                </p>
              </div>
              <div className="w-full h-[300px] sm:h-[465px]">
                <p className="text-sm sm:text-base px-4 py-3 sm:px-6 sm:py-4 whitespace-pre-wrap">
                  {tourney.description}
                </p>
              </div>
            </div>
            <TournamentInformation tourney={tourney} user={user} />
          </div>
        </div>
      ),
    },
    {
      title: "Committees",
      color: tourney.primaryColorHex,
      content: (
        <div
          className="relative w-full h-auto py-8 px-6 text-slate-800 z-20"
          style={{
            background: `
              linear-gradient(80deg, ${tourney.secondaryColorHex} 0%, transparent 15%),
              linear-gradient(300deg, ${tourney.secondaryColorHex} 20%, transparent 85%),
              linear-gradient(180deg, ${tourney.primaryColorHex}, ${tourney.primaryColorHex})
            `,
          }}
        >
          <div className="flex gap-6">
            <div className="bg-slate-300 bg-opacity-75 w-2/3 rounded-lg filter drop-shadow-lg">
              <div className="w-full h-14 rounded-lg flex shadow-md items-center justify-center">
                <p className="text-xl font-semibold">Committee Information</p>
              </div>
              <div className="w-full h-[465px]">
                <div className="text-base px-6 py-4">
                  {committees.length > 0 ? (
                    committees.map((committee) => (
                      <div key={committee.id} className="mb-4">
                        <div className="text-lg font-bold">
                          {committee.name}
                        </div>
                        <div className="text-base font-medium ml-2">
                          {committee.description}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No committees (yet!)</p>
                  )}
                </div>
              </div>
            </div>
            <TournamentInformation tourney={tourney} user={user} />
          </div>
        </div>
      ),
    },
    {
      title: "Register",
      color: tourney.primaryColorHex,
      content: (
        <div
          className="relative w-full h-auto py-8 px-6 text-slate-800 z-20"
          style={{
            background: `
              linear-gradient(70deg, ${tourney.secondaryColorHex} 0%, transparent 30%),
              linear-gradient(310deg, ${tourney.secondaryColorHex} 20%, transparent 70%),
              linear-gradient(180deg, ${tourney.primaryColorHex}, ${tourney.primaryColorHex})
            `,
          }}
        >
          <div className="flex gap-6">
            <div className="bg-slate-300 bg-opacity-75 w-2/3 rounded-lg filter drop-shadow-lg">
              <div className="w-full h-14 rounded-lg flex shadow-md items-center justify-center">
                <p className="text-xl font-semibold">Register</p>
              </div>
              <div className="w-full h-[465px] p-8 space-y-2">
                {isChair && myCommittee && (
                  <>
                    <p>You are a chair for {myCommittee.name}</p>
                    <p>Position papers:</p>
                    {!myCommittee.positionPaperLinks && (
                      <p>No position papers submitted yet.</p>
                    )}
                    {myCommittee.positionPaperLinks.map((positionPaperLink) => {
                      return (
                        <Button key={positionPaperLink} asChild>
                          <Link
                            href={positionPaperLink}
                            download={`${myCommittee.name} position paper`}
                          >
                            <Download />
                            {myCommittee.name} position paper
                          </Link>
                        </Button>
                      );
                    })}
                    {myCommittee.bgGuideLink && (
                      <>
                        <p>Upload background guide</p>
                        <UploadButton
                          type="bg-guide"
                          tourneyId={params.id}
                          committeeId={myCommittee.id}
                          delegateId={user.id}
                        />
                      </>
                    )}
                  </>
                )}
                {isDelegate && myCommittee && (
                  <>
                    <p>You are a delegate for {myCommittee.name}</p>
                    <p>Background guide:</p>
                    {!myCommittee.bgGuideLink && (
                      <p>Chair has not sent a background guide yet.</p>
                    )}
                    {myCommittee.bgGuideLink && (
                      <Button asChild>
                        <Link
                          href={myCommittee.bgGuideLink}
                          download={`${myCommittee.name} background guide`}
                        >
                          <Download />
                          {myCommittee.name} background guide
                        </Link>
                      </Button>
                    )}
                    {!myCommittee.delegatesThatSent.includes(user.id) && (
                      <>
                        <p>Upload position paper</p>
                        <UploadButton
                          type="position-paper"
                          tourneyId={params.id}
                          committeeId={myCommittee.id}
                          delegateId={user?.id}
                        />
                      </>
                    )}
                  </>
                )}
                {!isAdmin && !isChair && !isDelegate && (
                  <div className="flex flex-col gap-4">
                    {committees.map((committee) => (
                      <CommitteeSignUp
                        key={committee.id}
                        tourneyId={params.id}
                        committeeId={committee.id}
                        delegateId={user?.id}
                        committeeName={committee.name}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <TournamentInformation tourney={tourney} user={user} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative">
      <div className="w-full h-[430px] flex">
        <div className="w-full h-[430px] absolute z-0" />

        <MunLogoSVG
          className="absolute mt-6 ml-6 sm:ml-8 opacity-20 sm:opacity-60"
          style={{ color: secondaryColorHex }}
          width="315"
          height="315"
        />

        <div className="absolute py-8 px-12 mt-6 ml-10 sm:ml-40 filter blur-2xl">
          <div className="h-36 w-48 bg-slate-200" />
        </div>

        <div className="w-full flex flex-col z-20 pb-[250px] sm:pb-[80px] ml-8 sm:ml-64 text-navy-100 space-y-6 justify-center">
          <h1 className="sm:text-8xl text-5xl sm:pr-64 font-semibold break-words">
            {tourney.name}
          </h1>
          <div className="flex-col flex gap-y-2 ml-2 font-semibold">
            <h2 className="flex text-2xl">
              {startDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <h2 className="flex text-2xl break-words">
              {tourney.city}, {tourney.state}
            </h2>
          </div>
        </div>
      </div>

      <div className="relative z-30">
        <TabsComponent items={items} />
      </div>
    </div>
  );
};

export default tourneyPage;
