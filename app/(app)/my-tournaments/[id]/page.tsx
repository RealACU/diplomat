import React from "react";
import TabsComponent from "@/components/ui/tabs";
import { currentUser } from "@clerk/nextjs/server";
import CommitteeSignUp from "@/components/CommitteeSignUp";
import MunLogoSVG from "@/components/MunLogoSVG";
import UploadButton from "@/components/UploadButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, File } from "lucide-react";
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

  const isSignedIn = user ? true : false;

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

  const isSchoolAffiliated = user?.publicMetadata.schoolAffiliation
    ? true
    : false;

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
              <div className="w-full h-auto">
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
          <div className="flex-col sm:flex-row sm:flex gap-4 sm:gap-6">
            <div className="bg-slate-300 bg-opacity-75 w-full sm:w-2/3 rounded-lg filter drop-shadow-lg">
              <div className="w-full h-14 rounded-lg flex shadow-md items-center justify-center">
                <p className="text-xl font-semibold">Committee Information</p>
              </div>
              <div className="w-full h-auto">
                <div className="text-base px-6 py-4">
                  {committees.length > 0 ? (
                    committees
                      .sort((a, b) => a.id - b.id)
                      .map((committee) => (
                        <div
                          key={committee.id}
                          className="flex flex-row items-center"
                        >
                          <div className="mb-4">
                            <div className="flex flex-row">
                              <div className="text-lg font-bold">
                                {committee.name}
                              </div>
                              <div className="sm:hidden w-full h-auto flex flex-col justify-end items-end mb-2">
                                {(myCommittee || isCreator) && (
                                  <>
                                    <div className="w-16 h-20 flex">
                                      {isCreator ? (
                                        <UploadButton
                                          type="bg-guide"
                                          tourneyId={params.id}
                                          committeeId={committee.id}
                                          delegateId={user.id}
                                        />
                                      ) : (
                                        isChair &&
                                        myCommittee &&
                                        myCommittee.id === committee.id && (
                                          <UploadButton
                                            type="bg-guide"
                                            tourneyId={params.id}
                                            committeeId={committee.id}
                                            delegateId={user.id}
                                          />
                                        )
                                      )}
                                    </div>
                                  </>
                                )}
                                <a
                                  href={committee.bgGuideLink}
                                  target="_blank" //open in new tab
                                  rel="noopener noreferrer"
                                  download={committee.bgGuideLink}
                                  className="w-16 aspect-square flex flex-col items-center justify-center rounded-md border-slate-400 border-2 hover:bg-slate-400 transition-all duration-200"
                                >
                                  <span className="w-9 h-10">
                                    <File size={36} stroke="#334155" />
                                  </span>
                                  <span className="mt-2 text-center text-xs">
                                    View BG Guide
                                  </span>
                                </a>
                              </div>
                            </div>
                            <div className="text-base font-medium ml-2">
                              {committee.description}
                            </div>
                          </div>
                          <div className="hidden sm:flex w-full h-auto flex-col justify-end items-end mb-2">
                            {(myCommittee || isCreator) && (
                              <>
                                <div className="w-32 h-20 flex">
                                  {isCreator ? (
                                    <UploadButton
                                      type="bg-guide"
                                      tourneyId={params.id}
                                      committeeId={committee.id}
                                      delegateId={user.id}
                                    />
                                  ) : (
                                    isChair &&
                                    myCommittee &&
                                    myCommittee.id === committee.id && (
                                      <UploadButton
                                        type="bg-guide"
                                        tourneyId={params.id}
                                        committeeId={committee.id}
                                        delegateId={user.id}
                                      />
                                    )
                                  )}
                                </div>
                              </>
                            )}
                            <a
                              href={committee.bgGuideLink}
                              target="_blank" //open in new tab
                              rel="noopener noreferrer"
                              download={committee.bgGuideLink}
                              className="w-32 aspect-square flex flex-col items-center justify-center rounded-md border-slate-400 border-2 hover:bg-slate-400 transition-all duration-200"
                            >
                              <span className="w-12 h-12">
                                <File size={48} stroke="#334155" />
                              </span>
                              <span className="mt-2 text-center text-xs">
                                View Background Guide
                              </span>
                            </a>
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
          <div className="flex-col sm:flex-row sm:flex gap-4 sm:gap-6">
            <div className="bg-slate-300 bg-opacity-75 w-full sm:w-2/3 rounded-lg filter drop-shadow-lg">
              <div className="w-full h-14 rounded-lg flex shadow-md items-center justify-center">
                <p className="text-xl font-semibold">Register</p>
              </div>
              <div className="w-full h-auto py-6 px-8 space-y-2">
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
                {isSignedIn &&
                  !isAdmin &&
                  !isChair &&
                  !isDelegate &&
                  (isSchoolAffiliated ? (
                    <div className="flex flex-col gap-3">
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
                  ) : (
                    <p>
                      Before you sign up for a committee, please tell us which{" "}
                      <Link
                        href="/sign-up/school-affiliation"
                        className="text-blue-500 underline"
                      >
                        school
                      </Link>{" "}
                      you are affiliated with.
                    </p>
                  ))}
                {!isSignedIn && (
                  <div>
                    Please{" "}
                    <Link href="/sign-up" className="text-blue-500 underline">
                      sign up
                    </Link>{" "}
                    or{" "}
                    <Link href="/sign-in" className="text-blue-500 underline">
                      sign in
                    </Link>{" "}
                    to register for a committee.
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
