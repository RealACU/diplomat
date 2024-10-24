// @ts-ignore
import { Download, FileText, File, FileChartPie, FileSpreadsheet, FileImage, FileVideo, FileArchive, FileQuestion } from "lucide-react";
import React from 'react';
import UploadButton from "@/components/UploadButton";

const TournamentInformation = ({ tourney, user }: { tourney: any, user: any }) => {
    const {
        committees,
        delegateResources,
    } = tourney;
    
    const isCreator = user?.id === tourney.creatorId;
    console.log("isCreator", isCreator);
    
    const isAdmin = user?.publicMetadata.role === "admin";
    
    const isChair = user && committees.some((committee: { id: string; chairIds: string[]; delegateIds: string[] }) => 
        committee.chairIds.includes(user.id)
    );
    
    const isDelegate = user && committees.some((committee: { id: string; chairIds: string[]; delegateIds: string[] }) => 
        committee.delegateIds.includes(user.id)
    );

    const getFileTypeIcon = (link: string) => {
        const parts = link.split('.');
        const extension = parts.length > 1 ? parts.pop() : '';
    
        //File type icons
        const types: { [key: string]: JSX.Element } = {
        pdf: <FileText/>,
        doc: <File />,
        docx: <File />,
        ppt: <FileChartPie />,
        pptx: <FileChartPie />,
        xls: <FileSpreadsheet />,
        xlsx: <FileSpreadsheet />,
        png: <FileImage />,
        jpg: <FileImage />,
        jpeg: <FileImage />,
        mp4: <FileVideo />,
        zip: <FileArchive />,
        // Add more file types as needed
        };
    
        return extension && extension in types ? types[extension] : <FileQuestion />;
    };    

    return (
        <div className="bg-slate-50 pb-0 bg-opacity-85 my-4 sm:my-0 w-full sm:w-1/3 rounded-lg drop-shadow-lg">
            <div className="w-full h-10 sm:h-14 rounded-lg flex shadow-md items-center justify-center mb-5">
                <p className="text-lg sm:text-xl font-semibold mx-8">
                    Tournament Information
                </p>
            </div>
            <div className="bg-slate-300 mx-4 px-4 py-3 my-3 rounded-md font-medium text-base flex overflow-clip break-words items-center">
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
            <div className="bg-slate-300 mx-4 px-4 py-3 my-3 rounded-md font-medium text-base flex overflow-clip break-words items-center">
                <p>Location</p>
                <p className="ml-auto text-right">{tourney.school}</p>
            </div>
            <div className="bg-slate-300 mx-4 px-4 py-3 my-3 rounded-md font-medium text-base flex overflow-clip break-words items-center">
                <p>Committees</p>
                <div className="ml-4 text-right">
                    {committees.length > 0 ? (
                        committees.map((committee: { id: string; name: string }, index: number) => (
                            <div className="mb-4" key={committee.id}>
                                <span className="font-bold">{index + 1}. </span>
                                {committee.name}
                            </div>
                        ))
                    ) : (
                    <p>No committees (yet!)</p>
                    )}
                </div>
            </div>
            <div className="bg-slate-300 mx-4 my-3 mb-5 rounded-md font-medium text-base flex overflow-clip break-words">
                <div className="h-80 w-full">
                    <div className="px-4 py-3 h-12 w-full flex items-center justify-center relative shadow-md rounded-md">
                        <p className="text-center z-10">Delegate resources</p>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-3 gap-4">
                            {(isDelegate || isChair || isCreator) &&
                                delegateResources.map((delegateResource: { link: string; name: string }, i: number) => {
                                return (
                                    <a
                                        key={i}
                                        href={delegateResource.link}
                                        target="_blank" //open in new tab
                                        rel="noopener noreferrer"
                                        className="w-full aspect-[1/1] flex flex-col items-center justify-center rounded-md border-slate-400 border-2 hover:bg-slate-400 transition-all duration-200"
                                    >
                                        <span className="w-16 h-16">
                                        {React.cloneElement(getFileTypeIcon(delegateResource.link), { size: 64, stroke: '#334155' })}
                                        </span>
                                        <span className="mt-2 text-center text-xs">{delegateResource.name}</span>
                                    </a>
                                );
                            })}
                        </div>
                        {isCreator && (
                            <UploadButton
                            type="delegate-resources"
                            tourneyId={tourney.id}
                            // Zero is fine since the type is "delegate-resources"
                            committeeId={0}
                            delegateId={user.id}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentInformation;
