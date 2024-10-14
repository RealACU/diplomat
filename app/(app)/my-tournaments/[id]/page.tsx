import { db } from "@/lib/db";
import TabsComponent from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import signUpDelegate from "@/actions/signUpDelegate";
import { currentUser } from "@clerk/nextjs/server";
import CommitteeSignUp from "@/components/CommitteeSignUp";
import { CldUploadButton } from 'next-cloudinary';

const tourneyPage = async ({ params }: { params: { id: string } }) => {
  const tourney = await db.tourney.findUnique({
    where: { id: params.id },
    include: {
      committees: true,
    },
  });

  if (!tourney) {
    return <div>Tournament not found</div>;
  }

  const user = await currentUser();

  const { name, description, startDate, endDate, committees, primaryColorHex, secondaryColorHex } = tourney;

  const items = [
    {
      title: "Invitation",
      color: tourney.primaryColorHex,
      content: (
        <div 
          className="relative w-full h-[800px] sm:h-[600px] py-4 sm:py-8 px-4 sm:px-6 text-slate-800 z-20"
          style={{
            background: `
              linear-gradient(130deg, ${tourney.primaryColorHex} 5%, ${tourney.secondaryColorHex} 70%)
            `
          }}
        >
          <div className="flex-col sm:flex-row sm:flex gap-4 sm:gap-6">
            <div className="bg-slate-300 bg-opacity-75 w-full sm:w-2/3 rounded-lg filter drop-shadow-lg">
              <div className="w-full h-10 sm:h-14 rounded-lg flex shadow-md items-center justify-center">
                <p className="text-lg sm:text-xl font-semibold mx-2 sm:mx-8">Invitation Message</p>
              </div>
              <div className="w-full h-[300px] sm:h-[465px]">
                <p className="text-sm sm:text-md px-4 py-3 sm:px-6 sm:py-4 whitespace-pre-wrap">
                  {tourney.description}
                </p>
              </div>
            </div>
            <div className="bg-slate-50 pb-16 sm:pb-0 bg-opacity-85 my-4 sm:my-0 w-full sm:w-1/3 rounded-lg drop-shadow-lg">
              <div className="w-full h-10 sm:h-14 rounded-lg flex shadow-md items-center justify-center mb-5">
                <p className="text-lg sm:text-xl font-semibold mx-8">
                  Tournament Information
                </p>
              </div>
              <div className="bg-slate-300 mx-4 px-4 py-3 my-3 rounded-md font-medium text-md flex overflow-clip break-words">
                <p>
                  {new Date(tourney.startDate).toDateString() ===
                  new Date(tourney.endDate).toDateString()
                    ? "Date"
                    : "Dates"}
                </p>
                <p className="ml-auto text-right">
                  {new Date(tourney.startDate).toDateString() ===
                  new Date(tourney.endDate).toDateString()
                    ? new Date(tourney.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : `${new Date(tourney.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} - ${new Date(tourney.endDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}`}
                </p>
              </div>
              <div className="bg-slate-300 mx-4 px-4 py-3 my-3 rounded-md font-medium text-md flex overflow-clip break-words">
                <p>Location</p>
                <p className="ml-auto text-right">{tourney.school}</p>
              </div>
              <div className="bg-slate-300 mx-4 px-4 py-3 my-3 rounded-md font-medium text-md flex overflow-clip break-words">
                <p>Committees</p>
                <div className="ml-auto text-right">
                  {committees.length > 0 ? (
                    committees.map((committee) => (
                      <div key={committee.id}>{committee.name}</div>
                    ))
                  ) : (
                    <p>No committees (yet!)</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Committees",
      color: tourney.primaryColorHex,
      content: (
        <div 
          className="relative w-full h-[600px] py-8 px-6 text-slate-800 z-20"
          style={{
            background: `
              linear-gradient(80deg, ${tourney.secondaryColorHex} 0%, transparent 15%),
              linear-gradient(300deg, ${tourney.secondaryColorHex} 20%, transparent 85%),
              linear-gradient(180deg, ${tourney.primaryColorHex}, ${tourney.primaryColorHex})
            `
          }}
        >
          <div className="flex gap-6">
            <div className="bg-slate-300 bg-opacity-75 w-2/3 rounded-lg filter drop-shadow-lg">
              <div className="w-full h-14 rounded-lg flex shadow-md items-center justify-center">
                <p className="text-xl font-semibold">Committees</p>
              </div>
              <div className="w-full h-[465px] p-8">
                {user && committees.length > 0 ? (
                  committees.map((committee) => (
                    <CommitteeSignUp
                      tourneyId={params.id}
                      committeeId={committee.id}
                      committeeName={committee.name}
                      delegateId={user.id}
                      signedUp={(
                        user.publicMetadata.dTourneys as string[]
                      ).includes(params.id)}
                    />
                  ))
                ) : (
                  <p>No committees (yet!)</p>
                )}
              </div>
            </div>

            <div className="bg-slate-50 bg-opacity-85 w-1/3 rounded-lg drop-shadow-lg">
              <div className="w-full h-14 rounded-lg flex shadow-md items-center justify-center mb-5">
                <p className="text-xl font-semibold">Tournament Information</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Register",
      color: tourney.primaryColorHex,
      content: (
        <div 
          className="relative w-full h-[600px] py-8 px-6 text-slate-800 z-20"
          style={{
            background: `
              linear-gradient(70deg, ${tourney.secondaryColorHex} 0%, transparent 30%),
              linear-gradient(310deg, ${tourney.secondaryColorHex} 20%, transparent 70%),
              linear-gradient(180deg, ${tourney.primaryColorHex}, ${tourney.primaryColorHex})
            `
          }}
        >
          <div className="flex gap-6">
            <div className="bg-slate-300 bg-opacity-75 w-2/3 rounded-lg filter drop-shadow-lg">
              <div className="w-full h-14 rounded-lg flex shadow-md items-center justify-center">
                <p className="text-xl font-semibold">Register</p>
              </div>
              <div className="w-full h-[465px]">
                <p className="text-md px-6 py-4">hello world!</p>
              </div>
            </div>

            <div className="bg-slate-50 bg-opacity-85 w-1/3 rounded-lg drop-shadow-lg">
              <div className="w-full h-14 rounded-lg flex shadow-md items-center justify-center mb-5">
                <p className="text-xl font-semibold">Tournament Information</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative">
      <div className="w-full h-[260px] flex">
        <div className="w-full h-[260px] bg-docblue-200 z-10 absolute bg-opacity-50 backdrop-filter backdrop-blur-lg" />
        <div className="bg-frontpage w-full h-[260px] bg-top-3 bg-no-repeat bg-cover absolute z-0" />

        <div className="w-full grid grid-cols-2 z-20 pb-[80px] lg:mx-16 mx-8 text-white mt-8 sm:mt-0 sm:items-center">
          <h1 className="lg:text-7xl md:text-6xl text-5xl font-medium break-words">
            {tourney.name}
          </h1>
          <div className="flex-col flex gap-y-2">
            <h2 className="hidden lg:flex justify-end text-2xl">
              {startDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <h2 className="hidden lg:flex justify-end text-2xl break-words">
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
