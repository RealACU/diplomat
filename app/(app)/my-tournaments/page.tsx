import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import getTourneyById from "@/actions/getTourneyById";
import MunLogoSVG from "@/components/MunLogoSVG";
import TabsComponent from "@/components/ui/tabs";
import SubTabsComponent from "@/components/ui/subtabs";
import { isBefore, isSameDay, isAfter } from "date-fns";

const MyTournamentsPage = async () => {
  const user = await currentUser();
  //use this when you want to call schoolaffiliation
  //{String(user?.publicMetadata?.schoolAffiliation || 'School affiliation not provided')}

  const dTourneys: string[] = Array.isArray(user?.publicMetadata.dTourneys) ? user.publicMetadata.dTourneys : [];
  const cTourneys: string[] = Array.isArray(user?.publicMetadata.cTourneys) ? user.publicMetadata.cTourneys : [];
  
  const fetchTournaments = async (tourneyIds: string[]) => {
    const tournamentPromises = tourneyIds.map(async (tourneyId: string) => {
      const tourneyInfo = await getTourneyById(tourneyId);
      return tourneyInfo || null;
    });
  
    const results = await Promise.all(tournamentPromises);
    return results.filter(Boolean); 
  };

  const tournaments = await fetchTournaments(dTourneys);
  const chairedTournaments = await fetchTournaments(cTourneys);

  const items = [
    {
      //COMMENTING THIS OUT FOR NOW BECAUSE IT RUINS THE UI. WILL ADD IT BACK LATER ONCE FINISHED, BUT FOR FIRST DEPLOYMENT ITS UGLY
      //title: "Edit Your Tournaments",
      /*content: (
        <div className="relative w-full h-[800px] sm:h-[700px] px-4 sm:px-6 py-4 text-slate-800 z-20 bg-periwinkle-100 bg-opacity-75">
          <SubTabsComponent
            title="Edit Your Tournaments"
            subTabItems={[
              {
                title: "Tournaments I'm competing in",
                content: (
                  <div>
                    <div className="bg-slate-50 w-full rounded-lg">
                      <div className="w-full h-[465px] overflow-auto bg-white rounded-md shadow-md">
                        <ul className="bg-slate-300 px-4 py-1 font-bold text-md flex overflow-clip">
                          <div className="w-[60%] break-words pr-8">Name</div>
                          <div className="w-[25%] break-words flex">
                            <p className="w-5/6">City</p>
                            <p className="w-1/6">State</p>
                          </div>
                          <div className="ml-auto text-right w-[15%]">
                            Start Date
                          </div>
                        </ul>
                        <ul>
                          {Array.isArray(user?.publicMetadata.dTourneys) &&
                          user.publicMetadata.dTourneys.length > 0 ? (
                            user.publicMetadata.dTourneys.map(
                              async (dTourneyId) => {
                                const tourneyInfo = await getTourneyById(
                                  dTourneyId
                                );

                                if (
                                  !tourneyInfo ||
                                  !isSameDay(
                                    new Date(tourneyInfo.endDate),
                                    new Date()
                                  )
                                )
                                  return null;

                                return (
                                  <li
                                    key={tourneyInfo.id}
                                    className="odd:bg-slate-100 even:bg-slate-200 odd:hover:bg-periwinkle-50 even:hover:bg-periwinkle-100 transition-all duration-200"
                                  >
                                    <Link
                                      href={`/my-tournaments/${dTourneyId}`}
                                    >
                                      <div className="px-4 py-3 rounded-md font-semibold text-md flex overflow-clip">
                                        <div className="w-[60%] break-words pr-8">
                                          {tourneyInfo.name}
                                        </div>
                                        <div className="w-[25%] break-words flex">
                                          <p className="w-5/6">
                                            {tourneyInfo.city}
                                          </p>
                                          <p className="w-1/6">
                                            {tourneyInfo.state}
                                          </p>
                                        </div>
                                        <div className="ml-auto text-right w-[15%]">
                                          {tourneyInfo.startDate.toLocaleDateString(
                                            "en-US",
                                            {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              }
                            )
                          ) : (
                            <li className="py-4 flex justify-center items-center text-center w-full">
                              Sign up for a tournament!
                              <Link
                                href="/view-tournaments"
                                className="text-blue-500 font-semibold hover:underline ml-2"
                              >
                                View tournaments
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: "Tournaments I'm chairing/diasing for",
                content: (
                  <div>
                    <div className="bg-slate-50 w-full rounded-lg">
                      <div className="w-full h-[465px] overflow-auto bg-white rounded-md shadow-md">
                        <ul className="bg-slate-300 px-4 py-1 font-bold text-md flex overflow-clip">
                          <div className="w-[60%] break-words pr-8">Name</div>
                          <div className="w-[25%] break-words flex">
                            <p className="w-5/6">City</p>
                            <p className="w-1/6">State</p>
                          </div>
                          <div className="ml-auto text-right w-[15%]">
                            Start Date
                          </div>
                        </ul>
                        <ul>
                          {Array.isArray(user?.publicMetadata.cTourneys) &&
                          user.publicMetadata.cTourneys.length > 0 ? (
                            user.publicMetadata.cTourneys.map(
                              async (cTourneyId) => {
                                const tourneyInfo = await getTourneyById(
                                  cTourneyId
                                );

                                if (
                                  !tourneyInfo ||
                                  !isSameDay(
                                    new Date(tourneyInfo.endDate),
                                    new Date()
                                  )
                                )
                                  return null;

                                return (
                                  <li
                                    key={tourneyInfo.id}
                                    className="odd:bg-slate-100 even:bg-slate-200 odd:hover:bg-periwinkle-50 even:hover:bg-periwinkle-100 transition-all duration-200"
                                  >
                                    <Link
                                      href={`/my-tournaments/${cTourneyId}`}
                                    >
                                      <div className="px-4 py-3 rounded-md font-semibold text-md flex overflow-clip">
                                        <div className="w-[60%] break-words pr-8">
                                          {tourneyInfo.name}
                                        </div>
                                        <div className="w-[25%] break-words flex">
                                          <p className="w-5/6">
                                            {tourneyInfo.city}
                                          </p>
                                          <p className="w-1/6">
                                            {tourneyInfo.state}
                                          </p>
                                        </div>
                                        <div className="ml-auto text-right w-[15%]">
                                          {tourneyInfo.startDate.toLocaleDateString(
                                            "en-US",
                                            {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              }
                            )
                          ) : (
                            <li className="py-4 flex justify-center items-center text-center w-full">
                              {
                                "Talk to your advisor about chairing at your school's tournament!"
                              }
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    {*/
      title: "Results",
      content: (
        <div className="relative w-full h-[800px] sm:h-[700px] px-4 sm:px-6 py-4 text-slate-800 z-20 bg-periwinkle-100 bg-opacity-75">
          <SubTabsComponent 
            title="Past Tournaments"
            subTabItems={[
              {
                title: "Tournaments I competed in",
                content: (
                  <div className="bg-slate-50 w-full rounded-lg">
                    <div className="w-full h-[465px] overflow-auto bg-white rounded-md shadow-md">
                      <ul className="bg-slate-300 px-4 py-1 font-bold text-md flex overflow-clip">
                        <div className="w-[50%] sm:w-[60%] break-words pr-8">Name</div>
                        <div className="w-[25%] break-words flex">
                          <p className="w-full block sm:hidden">City, State</p>
                          <p className="w-0 sm:w-5/6 hidden sm:block">City</p>
                          <p className="w-0 sm:w-1/6 hidden sm:block">State</p>
                        </div>
                        <div className="ml-auto text-right w-0 sm:w-[15%] hidden sm:block">Start Date</div>
                        <div className="ml-auto text-right w-[25%] sm:w-0 block sm:hidden">Date</div>
                      </ul>
                      <ul>
                        {(() => {
                          const validTournaments = tournaments.filter((tourneyInfo): tourneyInfo is NonNullable<typeof tourneyInfo> => 
                            tourneyInfo !== null && isBefore(new Date(tourneyInfo.endDate), new Date())
                          );                      

                          if (validTournaments.length > 0) {
                            return validTournaments.map(tourneyInfo => (
                              <li key={tourneyInfo.id} className="odd:bg-slate-100 even:bg-slate-200 odd:hover:bg-periwinkle-50 even:hover:bg-periwinkle-100 transition-all duration-200">
                                <Link href={`/my-tournaments/${tourneyInfo.id}`}>
                                  <div className="px-4 py-3 rounded-md font-semibold text-md flex overflow-clip">
                                    <div className="w-[50%] sm:w-[60%] break-words pr-8">{tourneyInfo.name}</div>
                                    <div className="w-[25%] break-words flex">
                                      <p className="w-full block sm:hidden">{tourneyInfo.city}, {tourneyInfo.state}</p>
                                      <p className="w-0 sm:w-5/6 hidden sm:block">{tourneyInfo.city}</p>
                                      <p className="w-0 sm:w-1/6 hidden sm:block">{tourneyInfo.state}</p>
                                    </div>
                                    <div className="ml-auto text-right w-[15%]">
                                      {new Date(tourneyInfo.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ));
                          } else {
                            return (
                              <li className="py-4 flex justify-center items-center text-center w-full">
                                Sign up for a tournament! 
                                <Link href="/view-tournaments" className="text-blue-500 font-semibold hover:underline ml-2">View tournaments</Link>
                              </li>
                            );
                          }
                        })()}
                      </ul>
                    </div>
                  </div>
                ),
              },
              { 
                title: "Tournaments I completed in", 
                content: (
                  <div className="bg-slate-50 w-full rounded-lg">
                    <div className="w-full h-[465px] overflow-auto bg-white rounded-md shadow-md">
                      <ul className="bg-slate-300 px-4 py-1 font-bold text-md flex overflow-clip">
                        <div className="w-[50%] sm:w-[60%] break-words pr-8">Name</div>
                        <div className="w-[25%] break-words flex">
                          <p className="w-full block sm:hidden">City, State</p>
                          <p className="w-0 sm:w-5/6 hidden sm:block">City</p>
                          <p className="w-0 sm:w-1/6 hidden sm:block">State</p>
                        </div>
                        <div className="ml-auto text-right w-0 sm:w-[15%] hidden sm:block">Start Date</div>
                        <div className="ml-auto text-right w-[25%] sm:w-0 block sm:hidden">Date</div>
                      </ul>
                      <ul>
                        {(() => {
                          const validTournaments = chairedTournaments.filter((tourneyInfo): tourneyInfo is NonNullable<typeof tourneyInfo> => 
                            tourneyInfo !== null && isBefore(new Date(tourneyInfo.endDate), new Date())
                          );                      

                          if (validTournaments.length > 0) {
                            return validTournaments.map(tourneyInfo => (
                              <li key={tourneyInfo.id} className="odd:bg-slate-100 even:bg-slate-200 odd:hover:bg-periwinkle-50 even:hover:bg-periwinkle-100 transition-all duration-200">
                                <Link href={`/my-tournaments/${tourneyInfo.id}`}>
                                  <div className="px-4 py-3 rounded-md font-semibold text-md flex overflow-clip">
                                    <div className="w-[50%] sm:w-[60%] break-words pr-8">{tourneyInfo.name}</div>
                                    <div className="w-[25%] break-words flex">
                                      <p className="w-full block sm:hidden">{tourneyInfo.city}, {tourneyInfo.state}</p>
                                      <p className="w-0 sm:w-5/6 hidden sm:block">{tourneyInfo.city}</p>
                                      <p className="w-0 sm:w-1/6 hidden sm:block">{tourneyInfo.state}</p>
                                    </div>
                                    <div className="ml-auto text-right w-[15%]">
                                      {new Date(tourneyInfo.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ));
                          } else {
                            return (
                              <li className="py-4 flex justify-center items-center text-center w-full">
                                {"Talk to your advisor about chairing at your school's tournament!"}
                              </li>
                            );
                          }
                        })()}
                      </ul>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Current Tournaments",
      content: (
        <div className="relative w-full h-[800px] sm:h-[700px] px-4 sm:px-6 py-4 text-slate-800 z-20 bg-periwinkle-100 bg-opacity-75">
          <SubTabsComponent 
            title="Current Tournaments"
            subTabItems={[
              { 
                title: "Tournaments I'm competing in", 
                content: (
                  <div className="bg-slate-50 w-full rounded-lg">
                    <div className="w-full h-[465px] overflow-auto bg-white rounded-md shadow-md">
                      <ul className="bg-slate-300 px-4 py-1 font-bold text-md flex overflow-clip">
                        <div className="w-[50%] sm:w-[60%] break-words pr-8">Name</div>
                        <div className="w-[25%] break-words flex">
                          <p className="w-full block sm:hidden">City, State</p>
                          <p className="w-0 sm:w-5/6 hidden sm:block">City</p>
                          <p className="w-0 sm:w-1/6 hidden sm:block">State</p>
                        </div>
                        <div className="ml-auto text-right w-0 sm:w-[15%] hidden sm:block">Start Date</div>
                        <div className="ml-auto text-right w-[25%] sm:w-0 block sm:hidden">Date</div>
                      </ul>
                      <ul>
                        {(() => {
                          const validTournaments = tournaments.filter((tourneyInfo): tourneyInfo is NonNullable<typeof tourneyInfo> => 
                            tourneyInfo !== null && isSameDay(new Date(tourneyInfo.endDate), new Date())
                          );                      

                          if (validTournaments.length > 0) {
                            return validTournaments.map(tourneyInfo => (
                              <li key={tourneyInfo.id} className="odd:bg-slate-100 even:bg-slate-200 odd:hover:bg-periwinkle-50 even:hover:bg-periwinkle-100 transition-all duration-200">
                                <Link href={`/my-tournaments/${tourneyInfo.id}`}>
                                  <div className="px-4 py-3 rounded-md font-semibold text-md flex overflow-clip">
                                    <div className="w-[50%] sm:w-[60%] break-words pr-8">{tourneyInfo.name}</div>
                                    <div className="w-[25%] break-words flex">
                                      <p className="w-full block sm:hidden">{tourneyInfo.city}, {tourneyInfo.state}</p>
                                      <p className="w-0 sm:w-5/6 hidden sm:block">{tourneyInfo.city}</p>
                                      <p className="w-0 sm:w-1/6 hidden sm:block">{tourneyInfo.state}</p>
                                    </div>
                                    <div className="ml-auto text-right w-[15%]">
                                      {new Date(tourneyInfo.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ));
                          } else {
                            return (
                              <li className="py-4 flex justify-center items-center text-center w-full">
                                Sign up for a tournament! 
                                <Link href="/view-tournaments" className="text-blue-500 font-semibold hover:underline ml-2">View tournaments</Link>
                              </li>
                            );
                          }
                        })()}
                      </ul>
                    </div>
                  </div>
                ),
              },
              { 
                title: "Tournaments I'm chairing/diasing for", 
                content: (
                  <div className="bg-slate-50 w-full rounded-lg">
                    <div className="w-full h-[465px] overflow-auto bg-white rounded-md shadow-md">
                      <ul className="bg-slate-300 px-4 py-1 font-bold text-md flex overflow-clip">
                        <div className="w-[60%] break-words pr-8">Name</div>
                        <div className="w-[25%] break-words flex">
                          <p className="w-5/6">City</p>
                          <p className="w-1/6">State</p>
                        </div>
                        <div className="ml-auto text-right w-[15%]">Start Date</div>
                      </ul>
                      <ul>
                        {(() => {
                          const validTournaments = chairedTournaments.filter((tourneyInfo): tourneyInfo is NonNullable<typeof tourneyInfo> => 
                            tourneyInfo !== null && isSameDay(new Date(tourneyInfo.endDate), new Date())
                          );                      

                          if (validTournaments.length > 0) {
                            return validTournaments.map(tourneyInfo => (
                              <li key={tourneyInfo.id} className="odd:bg-slate-100 even:bg-slate-200 odd:hover:bg-periwinkle-50 even:hover:bg-periwinkle-100 transition-all duration-200">
                                <Link href={`/my-tournaments/${tourneyInfo.id}`}>
                                  <div className="px-4 py-3 rounded-md font-semibold text-md flex overflow-clip">
                                    <div className="w-[50%] sm:w-[60%] break-words pr-8">{tourneyInfo.name}</div>
                                    <div className="w-[25%] break-words flex">
                                      <p className="w-full block sm:hidden">{tourneyInfo.city}, {tourneyInfo.state}</p>
                                      <p className="w-0 sm:w-5/6 hidden sm:block">{tourneyInfo.city}</p>
                                      <p className="w-0 sm:w-1/6 hidden sm:block">{tourneyInfo.state}</p>
                                    </div>
                                    <div className="ml-auto text-right w-[15%]">
                                      {new Date(tourneyInfo.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ));
                          } else {
                            return (
                              <li className="py-4 flex justify-center items-center text-center w-full">
                                {"Talk to your advisor about chairing at your school's tournament!"}
                              </li>
                            );
                          }
                        })()}
                      </ul>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Future Sessions",
      content: (
        <div className="relative w-full h-[800px] sm:h-[700px] px-4 sm:px-6 py-4 text-slate-800 z-20 bg-periwinkle-100 bg-opacity-75">
          <SubTabsComponent 
            title="Past Tournaments"
            subTabItems={[
              { 
                title: "Tournaments I will compete in", 
                content: (
                  <div className="bg-slate-50 w-full rounded-lg">
                    <div className="w-full h-[465px] overflow-auto bg-white rounded-md shadow-md">
                      <ul className="bg-slate-300 px-4 py-1 font-bold text-md flex overflow-clip">
                        <div className="w-[50%] sm:w-[60%] break-words pr-8">Name</div>
                        <div className="w-[25%] break-words flex">
                          <p className="w-full block sm:hidden">City, State</p>
                          <p className="w-0 sm:w-5/6 hidden sm:block">City</p>
                          <p className="w-0 sm:w-1/6 hidden sm:block">State</p>
                        </div>
                        <div className="ml-auto text-right w-0 sm:w-[15%] hidden sm:block">Start Date</div>
                        <div className="ml-auto text-right w-[25%] sm:w-0 block sm:hidden">Date</div>
                      </ul>
                      <ul>
                        {(() => {
                          const validTournaments = tournaments.filter((tourneyInfo): tourneyInfo is NonNullable<typeof tourneyInfo> => 
                            tourneyInfo !== null && isAfter(new Date(tourneyInfo.endDate), new Date())
                          );                      

                          if (validTournaments.length > 0) {
                            return validTournaments.map(tourneyInfo => (
                              <li key={tourneyInfo.id} className="odd:bg-slate-100 even:bg-slate-200 odd:hover:bg-periwinkle-50 even:hover:bg-periwinkle-100 transition-all duration-200">
                                <Link href={`/my-tournaments/${tourneyInfo.id}`}>
                                  <div className="px-4 py-3 rounded-md font-semibold text-md flex overflow-clip">
                                    <div className="w-[50%] sm:w-[60%] break-words pr-8">{tourneyInfo.name}</div>
                                    <div className="w-[25%] break-words flex">
                                      <p className="w-full block sm:hidden">{tourneyInfo.city}, {tourneyInfo.state}</p>
                                      <p className="w-0 sm:w-5/6 hidden sm:block">{tourneyInfo.city}</p>
                                      <p className="w-0 sm:w-1/6 hidden sm:block">{tourneyInfo.state}</p>
                                    </div>
                                    <div className="ml-auto text-right w-[15%]">
                                      {new Date(tourneyInfo.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ));
                          } else {
                            return (
                              <li className="py-4 flex justify-center items-center text-center w-full">
                                Sign up for a tournament! 
                                <Link href="/view-tournaments" className="text-blue-500 font-semibold hover:underline ml-2">View tournaments</Link>
                              </li>
                            );
                          }
                        })()}
                      </ul>
                    </div>
                  </div>
                ),
              },
              { 
                title: "Tournaments I will chair/dias for", 
                content: (
                  <div className="bg-slate-50 w-full rounded-lg">
                    <div className="w-full h-[465px] overflow-auto bg-white rounded-md shadow-md">
                      <ul className="bg-slate-300 px-4 py-1 font-bold text-md flex overflow-clip">
                        <div className="w-[60%] break-words pr-8">Name</div>
                        <div className="w-[25%] break-words flex">
                          <p className="w-5/6">City</p>
                          <p className="w-1/6">State</p>
                        </div>
                        <div className="ml-auto text-right w-[15%]">Start Date</div>
                      </ul>
                      <ul>
                        {(() => {
                          const validTournaments = chairedTournaments.filter((tourneyInfo): tourneyInfo is NonNullable<typeof tourneyInfo> => 
                            tourneyInfo !== null && isAfter(new Date(tourneyInfo.endDate), new Date())
                          );                      

                          if (validTournaments.length > 0) {
                            return validTournaments.map(tourneyInfo => (
                              <li key={tourneyInfo.id} className="odd:bg-slate-100 even:bg-slate-200 odd:hover:bg-periwinkle-50 even:hover:bg-periwinkle-100 transition-all duration-200">
                                <Link href={`/my-tournaments/${tourneyInfo.id}`}>
                                  <div className="px-4 py-3 rounded-md font-semibold text-md flex overflow-clip">
                                    <div className="w-[50%] sm:w-[60%] break-words pr-8">{tourneyInfo.name}</div>
                                    <div className="w-[25%] break-words flex">
                                      <p className="w-full block sm:hidden">{tourneyInfo.city}, {tourneyInfo.state}</p>
                                      <p className="w-0 sm:w-5/6 hidden sm:block">{tourneyInfo.city}</p>
                                      <p className="w-0 sm:w-1/6 hidden sm:block">{tourneyInfo.state}</p>
                                    </div>
                                    <div className="ml-auto text-right w-[15%]">
                                      {new Date(tourneyInfo.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ));
                          } else {
                            return (
                              <li className="py-4 flex justify-center items-center text-center w-full">
                                {"Talk to your advisor about chairing at your school's tournament!"}
                              </li>
                            );
                          }
                        })()}
                      </ul>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="relative">
      <div className="w-full h-[360px] flex">
        <div className="w-full h-[360px] absolute z-0" />

        <MunLogoSVG
          className="absolute w-full justify-center opacity-30 -mt-32"
          style={{ color: "#92A8CE" }}
          width="800"
          height="800"
        />

        <div className="hidden sm:block absolute py-8 px-12 mt-16 ml-48 filter blur-2xl">
          <div className="h-36 w-80 bg-slate-200"/>
        </div>
        <div className="hidden sm:block absolute py-8 px-12 mt-8 ml-[1050px] filter blur-2xl">
          <div className="h-48 w-80 bg-slate-200"/>
        </div>

        <div className="w-full flex flex-col z-20 pb-[200px] sm:pb-[80px] ml-10 sm:ml-20 text-navy-100 space-y-6 justify-center">
          <div className="flex flex-col sm:gap-y-2">
            <h2 className="sm:text-4xl text-2xl ml-2 font-semibold break-words">
              Welcome,
            </h2>
            <h1 className="sm:text-8xl text-5xl font-semibold break-words">
              {user ? `${user.firstName} ${user.lastName ? user.lastName.charAt(0) + '.' : ''}` : 'User'}
            </h1>
          </div>
          <div className="flex-col flex gap-y-2 ml-2 font-semibold">
            <h2 className="flex text-2xl"></h2>
            <h2 className="flex text-2xl break-words"></h2>
          </div>
        </div>
      </div>

      <div className="relative z-30">
        <TabsComponent items={items} marginTop="-mt-[150px] sm:-mt-[230px]"/>
      </div>

      {(user?.publicMetadata.role as string) === "admin" && (
        <>
          <div className="w-full bg-periwinkle-100 opacity-75">
            <h1 className="opacity-0">{"Tournaments I've created"}</h1>
            <Button className="opacity-0">
              <Link href={``}></Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyTournamentsPage;
