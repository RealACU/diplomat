"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MunLogoSVG from "@/components/MunLogoSVG";
import TabsComponent from "@/components/ui/tabs";
import SubTabsComponent from "@/components/ui/subtabs";
import { isBefore, isSameDay, isAfter } from "date-fns";
import { Info, FileUp, ChevronDown, Check, X, Mail, Eye, ExternalLink } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import getAllTourneys from "@/actions/getAllTourneys";
import getTourneyById from "@/actions/getTourneyById";
import getUserTournaments from "@/actions/getUserTournaments";
import { updateUserTourneyData } from "@/actions/updateUserTourneyData";
import { getUser } from "@/actions/getUser";
import { Input } from "@/components/ui/input";
import Loading from "@/app/loading";
import UploadButton from "@/components/UploadButton";
import { updateDelegateInfo } from "@/actions/updateDelegateInfo";
import LoadingSpinner from "@/components/LoadingSpinner";

const MyTournamentsPage = () => {
  //use this when you want to call schoolaffiliation
  //{String(user?.publicMetadata?.schoolAffiliation || 'School affiliation not provided')}
  //or this, depending on the location of the node
  /*{String(
    delegateId === user.id && user.publicMetadata.schoolAffiliation
    ? user.publicMetadata.schoolAffiliation
    : 'School affiliation not provided'
    )}*/
  const { user } = useUser();
  const [tourneys, setTourneys] = useState<any[]>([]);
  const [dTourneys, setDTourneys] = useState<string[]>([]);
  const [cTourneys, setCTourneys] = useState<string[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [chairTournaments, setChairTournaments] = useState<any[]>([]);
  const [chairs, setChairs] = useState<any[]>([]);
  const [delegates, setDelegates] = useState<any[]>([]);
  const [showDelegatesId, setShowDelegatesId] = useState(false);
  const [showLinksId, setShowLinksId] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [delegateInfoValues, setDelegateInfoValues] = useState<{ [key: string]: { allocation: string | undefined; positionPaperLink: string | null; } }>( {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUserTournaments = async () => {
      setLoading(true);
      const { dTourneys, cTourneys } = await getUserTournaments(user.id);
      const tourneys = await getAllTourneys();
      setTourneys(tourneys);
      setDTourneys(dTourneys);
      setCTourneys(cTourneys);
      setLoading(false);
    };

    fetchUserTournaments();
  }, [user]);

  // fetch tournaments and update user metadata
  useEffect(() => {
    if (!user) return;

    const updateUserMetadata = async () => {
      try {
        await updateUserTourneyData(user.id, dTourneys, cTourneys);
        console.log("User metadata updated successfully.");
      } catch (error) {
        console.error("Error updating user metadata:", error);
      }
    };

    updateUserMetadata();
  }, [user, dTourneys, cTourneys]);

  const fetchTournaments = async (tourneyIds: string[]) => {
    const tournamentPromises = tourneyIds.map(async (tourneyId) => {
      const tourneyInfo = await getTourneyById(tourneyId);
      if (!tourneyInfo) return null;

      const delegateInfo = tourneyInfo.committees.flatMap(
        (committee: any) => committee.delegateInfo || []
      );

      return { ...tourneyInfo, delegateInfo };
    });

    const results = await Promise.all(tournamentPromises);
    return results.filter(Boolean);
  };

  useEffect(() => {
    const loadTournaments = async () => {
      setLoading(true);
      const fetchedTournaments = await fetchTournaments(dTourneys);
      const fetchedChairTournaments = await fetchTournaments(cTourneys);

      setTournaments(fetchedTournaments);
      setChairTournaments(fetchedChairTournaments);
      setLoading(false);
    };

    loadTournaments();
  }, [dTourneys, cTourneys]);

  useEffect(() => {
    const chairIds = tourneys.flatMap((tourney) =>
      tourney.committees.flatMap((committee: any) => committee.chairIds)
    );
  
    const delegateIds = tourneys.flatMap((tourney) =>
      tourney.committees.flatMap((committee: any) => committee.delegateIds)
    );  

    console.log('Chair IDs:', chairIds);
    console.log('Delegate IDs:', delegateIds);

    const fetchUsers = async () => {
      const fetchData = async (ids: string[]) => {
        return Promise.all(
          ids.map(async (id) => {
            try {
              const { success, user, error } = await getUser(id); 
              if (success) {
                return user; 
              } else {
                console.error(`Error fetching user with id ${id}:`, error);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching user with id ${id}:`, error);
              return null;
            }
          })
        );
      };
  
      const [chairsData, delegatesData] = await Promise.all([
        fetchData(chairIds),
        fetchData(delegateIds)
      ]);
  
      setChairs(chairsData.filter(Boolean));
      setDelegates(delegatesData.filter(Boolean));

      const initialDelegateInfoValues = delegatesData.reduce((acc, delegate) => {
        if (delegate?.delegateInfo && Array.isArray(delegate.delegateInfo)) {
          delegate.delegateInfo.forEach((info) => {
            if (!user) return;
      
            if (info.committeeId && tourneys.some((tourney: any) =>
              tourney.committees.some((committee: any) =>
                committee.chairIds.includes(user.id) && committee.delegateIds.includes(delegate.id)
              )
            )) {
              const key = `${delegate.id}-${info.committeeId}`;
      
              acc[key] = { allocation: info.allocation, positionPaperLink: info.positionPaperLink ?? null };
            }
          });
        }
      
        return acc;
      }, {} as { [key: string]: { allocation: string | undefined; positionPaperLink: string | null } });
      
      setDelegateInfoValues(initialDelegateInfoValues);      
    };  
  
    if (chairIds.length || delegateIds.length) {
      fetchUsers();
    }  
  }, [tourneys]);  

  if (!user) {
    return <Loading />; 
  }

  const toggleDelegatesVisibility = (tourneyId: any) => {
    setShowDelegatesId((prev) => prev === tourneyId ? null : tourneyId);
  };

  const toggleLinksVisibility = (tourneyId: any) => {
    setShowLinksId((prev) => prev === tourneyId ? null : tourneyId);
  };
  

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>, 
    delegateId: string, 
    tourneyId: string,   
    committeeId: number  
  ) => {
    const newAllocation = e.target.value;
    const key = `${delegateId}-${committeeId}`;

    const delegate = delegates.find(delegate => delegate.id === delegateId);

    if (!delegate || !delegate.delegateInfo) {
      console.error(`Delegate with id ${delegateId} not found or missing delegateInfo.`);
      return;
    }

    const positionPaperLink = delegate.delegateInfo.positionPaperLink || null;

    setDelegateInfoValues(prev => ({
      ...prev,
      [key]: { 
        allocation: newAllocation, 
        positionPaperLink: positionPaperLink 
      }
    }));
  
    const result = await updateDelegateInfo(tourneyId, committeeId, delegateId, newAllocation);
    
    if (result.success) {
      const { success, user, error } = await getUser(delegateId);
      if (success) {
        setDelegates(prevDelegates => 
          prevDelegates.map(delegate => 
            delegate.id === delegateId ? { ...delegate, delegateInfo: user?.delegateInfo } : delegate
          )
        );
      } else {
        console.error("Failed to fetch updated delegate info:", error);
      }
    } else {
      console.error("Failed to save allocation:", result.error);
    }
  };

  const handleUploadComplete = () => {
    setIsUploaded(true);
  };
  
  
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

                          if (loading) {
                            return (
                              <LoadingSpinner/>
                            );
                          }

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
                              <li className="py-4 flex-col sm:flex-row flex justify-center items-center text-center w-full">
                                <p>Sign up for a tournament!</p>
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
                title: "Tournaments I chaired/diased for", 
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
                          const validTournaments = chairTournaments.filter((tourneyInfo): tourneyInfo is NonNullable<typeof tourneyInfo> => 
                            tourneyInfo !== null && isBefore(new Date(tourneyInfo.endDate), new Date())
                          );

                          if (loading) {
                            return (
                              <LoadingSpinner/>
                            );
                          }

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
                              <li className="py-4 px-6 sm:px-0 flex justify-center items-center text-center w-full">
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

                          if (loading) {
                            return (
                              <LoadingSpinner/>
                            );
                          }

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
                              <li className="py-4 flex-col sm:flex-row flex justify-center items-center text-center w-full">
                                <p>Sign up for a tournament!</p>
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
                          const validTournaments = chairTournaments.filter((tourneyInfo): tourneyInfo is NonNullable<typeof tourneyInfo> => 
                            tourneyInfo !== null && isSameDay(new Date(tourneyInfo.endDate), new Date())
                          );

                          if (loading) {
                            return (
                              <LoadingSpinner/>
                            );
                          }

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
                              <li className="py-4 px-6 sm:px-0 flex justify-center items-center text-center w-full">
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
        <div className="relative w-full h-[800px] px-4 sm:px-6 py-4 text-slate-800 z-20 bg-periwinkle-100 bg-opacity-75">
          <SubTabsComponent 
            title="Future Tournaments"
            subTabItems={[
              { 
                title: "Tournaments I will compete in", 
                content: (
                  <div className="bg-slate-50 w-full rounded-lg">
                    <div className="w-full h-[700px] overflow-auto bg-white rounded-md shadow-md">
                      <ul className="bg-slate-300 px-4 py-1 font-bold text-md flex overflow-clip">
                      <div className="w-[60%] sm:w-[30%] break-words pr-8">Name</div>
                      <div className="w-[17%] pr-4">Committee</div>
                      <div className="w-[25%] sm:w-[11%] break-words flex justify-end">City, State</div>
                      <div className="sm:w-[2%]"></div>
                      <div className="w-[25%] sm:w-[7%]">Date</div>
                      <div className="flex flex-grow">
                        <div className="w-auto break-words flex">Allocation</div>
                        <div className="flex-grow break-words flex text-right justify-end">Send Position Paper/View BG Guide</div>
                      </div>
                      </ul>
                      <ul>
                        {(() => {
                        const validTournaments = tournaments
                        .filter((tourneyInfo): tourneyInfo is NonNullable<typeof tourneyInfo> =>
                          tourneyInfo !== null && isAfter(new Date(tourneyInfo.endDate), new Date())
                        )
                        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());  
                        
                          if (loading) {
                            return (
                              <LoadingSpinner/>
                            );
                          }

                          if (validTournaments.length > 0) {
                            return (
                              <>
                              <ul>
                                {validTournaments.map(tourneyInfo => (
                                  <div key={tourneyInfo.id} className="odd:bg-slate-150 even:bg-slate-100">
                                    <li className="transition-all duration-200">
                                      {/*<Link href={`/my-tournaments/${tourneyInfo.id}`}>  odd:hover:bg-periwinkle-50 even:hover:bg-periwinkle-100*/}
                                        <div className="px-4 rounded-md font-medium text-md flex items-center">
                                          <div className="py-6 w-[60%] sm:w-[30%] break-words pr-8 font-semibold">{tourneyInfo.name}</div>
                                          <div className="py-2 w-[17%] pr-4">
                                            {(() => {
                                              const userCommittee = tourneyInfo?.committees?.find((committee: any) =>
                                                committee.delegateIds?.includes(user.id)
                                              );

                                              return userCommittee ? (
                                                <div>
                                                  <span className={userCommittee.name.length > 30 ? "text-xs" : "text-sm"}>
                                                    {userCommittee.name}
                                                  </span>
                                                </div>
                                              ) : (
                                                <div>Committee Name</div>
                                              );
                                            })()}
                                          </div>
                                          <div className="py-6 w-[11%] break-words flex text-right">
                                            <p className="w-full">{tourneyInfo.city}, {tourneyInfo.state}</p>
                                          </div>
                                          <div className="w-[2%] justify-center flex">•</div>
                                          <div className="py-6 w-[6%] text-right pr-4">
                                            {new Date(tourneyInfo.startDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}
                                          </div>
                                          <div className="py-4 flex flex-grow z-20 items-center">
                                            {tourneyInfo.committees.map((committee: any) => {
                                              const isYourCommittee = committee.delegateIds?.includes(user.id);

                                              return (
                                                <div key={committee.id}>
                                                  {isYourCommittee ? (
                                                    committee.delegateIds.map((delegateId: string) => {
                                                      const delegate = delegates.find((d: any) => d.id === delegateId);
                                                      
                                                      if (delegate?.id === user.id) {
                                                        const delegateInfo = committee.delegateInfo?.find((info: any) => info.delegateId === user.id);
                                                        
                                                        return (
                                                          <div
                                                            key={delegate.id}
                                                            className="w-[280px] border-[1px] h-auto border-slate-300 font-bold rounded-sm shadow-sm py-2 -my-2 mr-3 px-3"
                                                          >
                                                            {delegateInfo?.allocation || 'Awaiting allocation'}
                                                          </div>
                                                        );
                                                      }
                                                      return null; 
                                                    })
                                                  ) : null}
                                                </div>
                                              );
                                            })}
                                            <div className="flex flex-grow items-center">
                                              <div 
                                                className="w-auto border-[1px] h-auto border-slate-300 bg-slate-200 duration-200 hover:bg-slate-300 font-semibold rounded-sm shadow-sm py-2 px-3 flex items-center cursor-pointer text-md"
                                                onClick={() => toggleLinksVisibility(tourneyInfo.id)}
                                              >
                                                Send/View
                                                <ChevronDown className={`ml-2 w-5 h-5 transition-transform duration-300 transform ${showLinksId === tourneyInfo.id ? 'rotate-180' : ''}`}/>
                                              </div>
                                              {tourneyInfo.committees.map((committee: any) => {
                                                const isYourCommittee = committee.delegateIds?.includes(user.id);
                                                const hasUploaded = committee.delegatesThatSent?.includes(user.id);

                                                return (
                                                  <div key={committee.id}>
                                                    {isYourCommittee ? (
                                                      hasUploaded ? (
                                                        <Check className="stroke-[#78bd5b] w-8 h-8 ml-2 z-10" />
                                                      ) : (
                                                        <X className="stroke-[#e74646] w-8 h-8 ml-2 z-10" />
                                                      )
                                                    ) : null}
                                                  </div>
                                                );
                                              })}
                                              <div className="relative group">
                                                <Info className="w-4 h-4 -mr-2 stroke-slate-600"/>
                                                <div className="absolute opacity-0 bg-opacity-0 group-hover:opacity-100 group-hover:bg-opacity-75 pointer-events-none transition-opacity duration-150 right-full px-2 py-1 -mt-[36px] w-[300px] text-xs mr-1 text-white bg-periwinkle-300 rounded-md shadow-lg z-50 backdrop-blur-sm">
                                                  <p className="inline">A </p>
                                                  <p className="inline text-[#a1d48c]">green check mark </p>
                                                  <p className="inline">means your position paper is uploaded. A </p>
                                                  <p className="inline text-[#ffc3c3]">red X </p>
                                                  <p className="inline">means you still need to upload. </p>
                                                  <p>A refresh may be necessary to reflect changes.</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      {/*ul under the main ul that allows you to view bg guide and upload position paper*/}
                                      <div
                                        className={`transition-all duration-300 ease-in-out bg-white overflow-hidden
                                          ${showLinksId === tourneyInfo.id ? 'h-auto' : 'h-0'}`}
                                      >
                                        {showLinksId === tourneyInfo.id && (
                                          <ul className="py-4 flex flex-col space-y-2 mx-48">
                                            <div className="flex px-2 font-bold">
                                              <div className="w-[20%]">Committee Name</div>
                                              <div className="w-48">Chair(s)</div>
                                              <div className="w-48">Chair Email(s)</div>
                                            </div>
                                            <div className="flex w-full py-2 px-2 border-[1px] bg-slate-100 border-slate-300 rounded-md text-sm items-center">
                                              {tourneyInfo?.committees?.map((committee: any) => {
                                                if (committee?.chairIds?.includes(user.id)) {
                                                  return (
                                                    <div key={committee.id} className="w-[20%] overflow-hidden text-ellipsis line-clamp-2 pr-8">
                                                      {committee.name}
                                                    </div>
                                                  );
                                                }
                                                return null;
                                              })}
                                              <div className="w-auto flex flex-col space-y-1">
                                                {tourneyInfo?.committees?.map((committee: any) => {
                                                  if (committee?.chairIds?.includes(user.id)) {
                                                    return committee?.delegateIds?.map((delegateIds: any) => {
                                                      const delegate = delegates.find((user: any) => user?.id === delegateIds);

                                                      return (
                                                        <li key={delegateIds} className="flex items-center">
                                                          <div className="w-48 font-semibold flex items-center">
                                                            {delegate
                                                              ? `${delegate.firstName} ${delegate.lastName}`
                                                              : 'Unknown'}
                                                            <div className="relative group">
                                                              <Info className="w-4 h-4 stroke-periwinkle-400 ml-2"/>
                                                              <div className="absolute bg-opacity-0 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-75 pointer-events-none transition-opacity duration-150 left-full px-2 py-1 w-auto text-xs text-white bg-periwinkle-200 rounded-md shadow-lg z-30 -mt-[28px] backdrop-blur-md ml-1">
                                                                <p className="inline font-bold">ID: </p>
                                                                <p className="inline font-medium">{delegateIds}</p>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className="w-48">
                                                            {delegate
                                                              ? `${delegate.email}`
                                                              : 'Unknown'}
                                                          </div>
                                                        </li>
                                                      );
                                                    });
                                                  } else {
                                                    return null;
                                                  }
                                                })}
                                              </div>
                                              <div className="flex flex-grow justify-end items-center space-x-2">
                                                <div className="flex-shrink-0">
                                                  {(() => {
                                                    if (!user?.id || !tourneyInfo?.committees) return null;

                                                    const userCommittee = tourneyInfo?.committees?.find((committee: any) =>
                                                      committee.chairIds?.includes(user.id)
                                                    );

                                                    if (userCommittee && userCommittee.bgGuideLink && userCommittee.bgGuideLink !== null) {
                                                      return (
                                                        <Link 
                                                          href={userCommittee.bgGuideLink}
                                                          target="_blank"
                                                          rel="noopener noreferrer"
                                                          className="w-full h-auto border-[1px] border-periwinkle-100 bg-periwinkle-50 hover:bg-periwinkle-100 duration-200 text-base py-2 px-3 rounded-md font-medium flex items-center"
                                                        >
                                                          BG Guide
                                                          <Eye className="w-5 h-5 ml-2"/>
                                                        </Link>
                                                      )
                                                    } else {
                                                      return (
                                                        <div className="relative group w-full h-auto border-2 border-dashed border-periwinkle-50 bg-slate-150 duration-200 text-base py-[7px] px-3 rounded-md font-medium flex items-center text-periwinkle-50 cursor-not-allowed">
                                                          BG Guide
                                                          <Eye className="w-5 h-5 ml-2 stroke-periwinkle-50"/>
                                                          <div className="w-36 absolute opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity right-full duration-150 bg-periwinkle-200 text-white text-xs rounded-md py-2 px-2 z-50 mr-2">
                                                            Waiting for delegate to add position paper 
                                                          </div>
                                                        </div>
                                                      );
                                                    }
                                                  })()}
                                                </div>
                                                <div className="flex-shrink-0">
                                                  {(() => {
                                                    const userCommittee = tourneyInfo?.committees?.find((committee: any) =>
                                                      committee.chairIds?.includes(user.id)
                                                    );

                                                    if (userCommittee) {
                                                      return (
                                                        <UploadButton
                                                          type="position-paper"
                                                          tourneyId={tourneyInfo.id}
                                                          committeeId={userCommittee.id}
                                                          delegateId={user.id}
                                                          text="Upload Position Paper"
                                                          textAfterUpload="New Paper"
                                                          size={5}
                                                          ml="2"
                                                          onUploadComplete={handleUploadComplete}
                                                        />
                                                      );
                                                    }
                                                    return null;
                                                  })()}
                                                </div>
                                              </div>
                                            </div>
                                          </ul>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </ul>
                              </>
                            );
                          } else {
                            return (
                              <li className="py-4 flex-col sm:flex-row flex justify-center items-center text-center w-full">
                                <p>Sign up for a tournament!</p>
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
                    <div className="w-full h-[700px] overflow-auto bg-white rounded-md shadow-md">
                      <ul className="bg-slate-300 px-4 py-1 font-bold text-md flex overflow-clip">
                        <div className="w-[60%] sm:w-[30%] break-words pr-8">Name</div>
                        <div className="w-[17%] pr-4">Committee</div>
                        <div className="w-[25%] sm:w-[11%] break-words flex justify-end">City, State</div>
                        <div className="sm:w-[2%]"></div>
                        <div className="w-[25%] sm:w-[6%]">Date</div>
                      </ul>

                      <ul>
                        {(() => {
                        const validTournaments = tournaments
                        .filter((tourneyInfo): tourneyInfo is NonNullable<typeof tourneyInfo> =>
                          tourneyInfo !== null && isAfter(new Date(tourneyInfo.endDate), new Date())
                        )
                        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());    
                        
                        if (loading) {
                          return (
                            <LoadingSpinner/>
                          );
                        }

                        if (validTournaments.length > 0) {
                          return (
                            <>
                            <ul>
                              {validTournaments.map(tourneyInfo => (
                                <div key={tourneyInfo.id} className="odd:bg-slate-150 even:bg-slate-100">
                                  <li className="transition-all duration-200">
                                    {/*<Link href={`/my-tournaments/${tourneyInfo.id}`}>  odd:hover:bg-periwinkle-50 even:hover:bg-periwinkle-100*/}
                                    <div className="px-4 rounded-md font-medium text-md flex items-center">
                                      <div className="py-6 w-[60%] sm:w-[30%] break-words pr-8 font-semibold">
                                        {tourneyInfo.name}
                                      </div>
                                      <div className="py-2 w-[17%] pr-4">
                                        {(() => {
                                          const userCommittee = tourneyInfo?.committees?.find(
                                            (committee: any) => committee.chairIds?.includes(user.id)
                                          );

                                          return userCommittee ? (
                                            <div>
                                              <span
                                                className={userCommittee.name.length > 30 ? 'text-xs' : 'text-sm'}
                                              >
                                                {userCommittee.name}
                                              </span>
                                            </div>
                                          ) : (
                                            <div>Committee Name</div>
                                          );
                                        })()}
                                      </div>
                                      <div className="py-6 w-[11%] break-words flex text-right">
                                        <p className="w-full">{tourneyInfo.city}, {tourneyInfo.state}</p>
                                      </div>
                                      <div className="w-[2%] justify-center flex">•</div>
                                      <div className="py-6 w-[6%] text-right pr-4">
                                        {new Date(tourneyInfo.startDate).toLocaleDateString('en-US', {
                                          month: '2-digit',
                                          day: '2-digit',
                                          year: '2-digit',
                                        })}
                                      </div>
                                      <div className="py-4 flex flex-grow z-20">
                                        <div className="w-1/2 flex pr-3 gap-x-2.5">
                                          <div
                                            className="w-full border-[1px] h-auto border-slate-300 bg-slate-200 duration-200 hover:bg-slate-300 font-bold rounded-sm shadow-sm py-2 px-3 flex items-center cursor-pointer"
                                            onClick={() => toggleDelegatesVisibility(tourneyInfo.id)}
                                          >
                                            View your delegates
                                            <ChevronDown
                                              className={`ml-auto w-5 h-5 transition-transform duration-300 transform ${
                                                showDelegatesId === tourneyInfo.id ? 'rotate-180' : ''
                                              }`}
                                            />
                                          </div>
                                        </div>
                                        <div className="w-1/2 flex items-center">
                                          <div className="w-full flex items-center">
                                            {(() => {
                                              const userCommittee = tourneyInfo?.committees?.find(
                                                (committee: any) => committee.chairIds?.includes(user.id)
                                              );

                                              if (userCommittee) {
                                                return (
                                                  <UploadButton
                                                    type="bg-guide"
                                                    tourneyId={tourneyInfo.id}
                                                    committeeId={userCommittee.id}
                                                    delegateId={user.id}
                                                    text="Upload BG Guide"
                                                    textAfterUpload="New BG"
                                                    size={5}
                                                  />
                                                );
                                              }
                                              return null;
                                            })()}
                                          </div>
                                          <div className="relative group">
                                            <Info className="w-5 h-5 ml-2 -mr-2 stroke-slate-600" />
                                            <div className="absolute opacity-0 bg-opacity-0 group-hover:opacity-100 group-hover:bg-opacity-75 pointer-events-none transition-opacity duration-150 right-full px-2 py-1 -mt-[36px] w-[300px] text-xs mr-1 text-white bg-periwinkle-300 rounded-md shadow-lg z-50 backdrop-blur-sm">
                                              <p className="inline">A </p>
                                              <p className="inline text-[#a1d48c]">green check mark </p>
                                              <p className="inline">means your BG Guide is uploaded. A </p>
                                              <p className="inline text-[#ffc3c3]">red X </p>
                                              <p className="inline">means you still need to upload. </p>
                                              <p>A refresh may be necessary to reflect changes.</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  {/* ul under the main ul that allows you to add allocations/view delegates */}
                                  <div
                                    className={`transition-all duration-300 ease-in-out bg-white overflow-hidden ${
                                      showDelegatesId === tourneyInfo.id ? 'h-auto' : 'h-0'
                                    }`}
                                  >
                                    {showDelegatesId === tourneyInfo.id && (
                                      <ul className="my-4 flex flex-col space-y-2 mx-44">
                                        <div className="flex font-bold">
                                          <div className="flex w-full">
                                            <div className="ml-[34px] w-[255px]">Name</div>
                                            <div className="w-[266px]">School Affiliation</div>
                                            <div>Allocation</div>
                                            <div className="flex-grow flex justify-end">
                                              <div
                                                className="w-24 flex cursor-pointer bg-slate-700 hover:bg-slate-800 rounded-md text-white font-semibold justify-center duration-200 text-sm items-center mr-3"
                                                onClick={toggleDelegatesVisibility}
                                              >
                                                Save
                                              </div>
                                            </div>
                                          </div>
                                          <div className="w-[172px]"></div>
                                        </div>
                                        {tourneyInfo?.committees?.map((committee: any) => {
                                          if (committee?.chairIds?.includes(user.id)) {
                                            return committee?.delegateIds?.map((delegateId: any, index: number) => {
                                              const delegate = delegates.find((delegate: any) => delegate?.id === delegateId);
                                              const key = `${delegateId}-${committee.id}`;
                                              
                                              return (
                                                <div className="flex w-full items-center" key={delegateId}>
                                                  <div className="w-8 text-center font-medium">{index + 1}</div>
                                                  <li className="w-full flex py-1 px-2 border-[1px] even:bg-slate-200 odd:bg-transparent border-slate-300 rounded-md text-sm items-center">
                                                    <div className="w-[30%] font-semibold flex items-center">
                                                      {delegate ? `${delegate.firstName} ${delegate.lastName}` : 'Unknown'}
                                                      <div className="relative group">
                                                        <Mail className="w-4 h-4 stroke-periwinkle-400 ml-2" />
                                                        <div className="absolute bg-opacity-0 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-75 pointer-events-none transition-opacity duration-150 left-full px-2 py-1 w-auto text-xs text-white bg-periwinkle-200 rounded-md shadow-lg z-30 -mt-[28px] backdrop-blur-md ml-1">
                                                          <p className="inline font-bold">Email: </p>
                                                          <p className="inline">{delegate ? `${delegate.email}` : 'Unknown'}</p>
                                                        </div>
                                                      </div>
                                                      <div className="relative group">
                                                        <Info className="w-4 h-4 stroke-periwinkle-400 ml-2" />
                                                        <div className="absolute bg-opacity-0 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-75 pointer-events-none transition-opacity duration-150 left-full px-2 py-1 w-auto text-xs text-white bg-periwinkle-200 rounded-md shadow-lg z-30 -mt-[28px] backdrop-blur-md ml-1">
                                                          <p className="inline font-bold">ID: </p>
                                                          <p className="inline">{delegateId}</p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="w-[30%]">
                                                      {String(
                                                        delegateId === user.id && user.publicMetadata.schoolAffiliation
                                                          ? user.publicMetadata.schoolAffiliation
                                                          : 'School affiliation not provided'
                                                      )}
                                                    </div>
                                                    <div className="flex flex-grow justify-end">
                                                      <Input
                                                        type="text"
                                                        placeholder="Enter allocation..."
                                                        className="w-96 h-8 border-slate-300 drop-shadow-sm focus:outline-none transition-all duration-200 focus-visible:ring-gray-300"
                                                        value={delegateInfoValues[key]?.allocation || delegate?.delegateInfo?.allocation || ''}
                                                        onChange={(e) =>
                                                          handleInputChange(e, delegateId, tourneyInfo.id, committee.id)
                                                        }
                                                      />
                                                    </div>
                                                    </li>
                                                    {delegateInfoValues[key]?.positionPaperLink || delegate?.delegateInfo?.positionPaperLink ? (
                                                      <Link
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex w-[172px] rounded-sm text-sm h-full p-2.5 border-[1px] border-periwinkle-100 bg-periwinkle-50 hover:bg-periwinkle-100 cursor-pointer ml-1 items-center font-semibold duration-200"
                                                        href={delegateInfoValues[key]?.positionPaperLink || delegate?.delegateInfo?.positionPaperLink}
                                                      >
                                                        Position Paper
                                                        <ExternalLink className="w-5 h-5 ml-2" />
                                                      </Link>
                                                    ) : (
                                                      <div className="relative group flex w-[172px] rounded-sm text-sm h-full p-2 border-[2px] border-periwinkle-100 border-dashed text-periwinkle-100 bg-slate-100 ml-1 items-center font-semibold duration-200 cursor-not-allowed">
                                                        Position Paper
                                                        <ExternalLink className="w-5 h-5 ml-2 stroke-periwinkle-100" />
                                                        <div className="w-36 absolute opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity left-full duration-150 bg-periwinkle-200 text-white text-xs rounded-md py-2 px-2 z-50 ml-2">
                                                          Waiting for delegate to add position paper 
                                                        </div>
                                                      </div>
                                                    )}
                                                  </div>
                                                );
                                              });
                                            } else {
                                              return null;
                                            }
                                          })}
                                        </ul>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </ul>
                            </>
                          );
                        } else {
                          return (
                            <li className="py-4 px-6 sm:px-0 flex justify-center items-center text-center w-full">
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
