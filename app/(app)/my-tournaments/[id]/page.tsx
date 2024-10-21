import { db } from "@/lib/db";
import TabsComponent from "@/components/ui/tabs";
import { currentUser } from "@clerk/nextjs/server";
import CommitteeSignUpList from "@/components/CommitteeSignUpList";
import MunLogoSVG from "@/components/MunLogoSVG";

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

  const {
    name,
    description,
    startDate,
    endDate,
    committees,
    primaryColorHex,
    secondaryColorHex,
  } = tourney;

  const items = [
    {
      title: "Invitation",
      color: tourney.primaryColorHex,
      content: (
        <div
          className="relative w-full h-[800px] sm:h-[700px] py-4 sm:py-8 px-4 sm:px-6 text-slate-800 z-20"
          style={{
            background: `
              linear-gradient(130deg, ${tourney.primaryColorHex} 5%, ${tourney.secondaryColorHex} 70%)
            `,
          }}
        >
          <div className="flex-col sm:flex-row sm:flex gap-4 sm:gap-6">
            <div className="bg-slate-300 bg-opacity-75 w-full sm:w-2/3 rounded-lg filter drop-shadow-lg">
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
            <div className="bg-slate-50 pb-16 sm:pb-0 bg-opacity-85 my-4 sm:my-0 w-full sm:w-1/3 rounded-lg drop-shadow-lg">
              <div className="w-full h-10 sm:h-14 rounded-lg flex shadow-md items-center justify-center mb-5">
                <p className="text-lg sm:text-xl font-semibold mx-8">
                  Tournament Information
                </p>
              </div>
              <div className="bg-slate-300 mx-4 px-4 py-3 my-3 rounded-md font-medium text-base flex overflow-clip break-words">
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
                    : `${new Date(tourney.startDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )} - ${new Date(tourney.endDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}`}
                </p>
              </div>
              <div className="bg-slate-300 mx-4 px-4 py-3 my-3 rounded-md font-medium text-base flex overflow-clip break-words">
                <p>Location</p>
                <p className="ml-auto text-right">{tourney.school}</p>
              </div>
              <div className="bg-slate-300 mx-4 px-4 py-3 my-3 rounded-md font-medium text-base flex overflow-clip break-words">
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
              <div className="bg-slate-300 mx-4 my-3 rounded-md font-medium text-base flex overflow-clip break-words">
                <div className="h-80 w-full">
                  <div className="px-4 py-3 h-12 w-full flex flex-row relative shadow-md rounded-md">
                    <p className="relative z-10">Delegate resources</p>
                    <p className="ml-auto text-right z-10">stuff</p>
                  </div>
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
          className="relative w-full h-[700px] py-8 px-6 text-slate-800 z-20"
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
                <p className="text-xl font-semibold">Committees</p>
              </div>
              <div className="w-full h-[465px] p-8">
                <CommitteeSignUpList
                  // @ts-ignore
                  userId={user?.id}
                  userDTourneys={user?.publicMetadata.dTourneys as string[]}
                  committees={committees}
                  tourneyId={params.id}
                />
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
          className="relative w-full h-[700px] py-8 px-6 text-slate-800 z-20"
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
              <div className="w-full h-[465px]">
                <p className="text-base px-6 py-4">hello world!</p>
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
      <div className="w-full h-[430px] flex">
        <div className="w-full h-[430px] absolute z-0" />

        <MunLogoSVG
          className="absolute mt-6 ml-8 opacity-60"
          style={{ color: secondaryColorHex }}
          width="315"
          height="315"
        />

        <div className="absolute py-8 px-12 mt-6 ml-40 filter blur-2xl">
          <div className="h-36 w-48 bg-slate-200" />
        </div>

        <div className="w-full flex flex-col z-20 pb-[80px] ml-64 text-navy-100 space-y-6 justify-center">
          <h1 className="sm:text-8xl text-5xl font-semibold break-words">
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
