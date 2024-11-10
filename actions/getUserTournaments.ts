"use server";

import { db } from "@/lib/db";

export default async function getUserTournaments(userId: string) {
  const dTourneysData = await db.tourney.findMany({
    where: { 
        committees: { 
            some: { 
                delegateIds: { 
                    has: userId 
                } 
            } 
        } 
    },
    select: { id: true },
  });

  const cTourneysData = await db.tourney.findMany({
    where: { 
        committees: { 
            some: { 
                chairIds: { 
                    has: userId 
                } 
            } 
        } 
    },
    select: { id: true },
  });

  return {
    dTourneys: dTourneysData.map((tourney: any) => tourney.id),
    cTourneys: cTourneysData.map((tourney: any) => tourney.id),
  };
}
