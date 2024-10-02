"use server";

import { db } from "@/lib/db";

export default async function getTourneysByName(query: string) {
  const tourneys = await db.tourney.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      }
    },
    orderBy: {
      startDate: "asc"
    } 
  });
  return tourneys;
}
