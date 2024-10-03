"use server";

import { db } from "@/lib/db";

export default async function getTourneysByName(query: string) {
  const tourneys = await db.tourney.findMany({
    where: {
      name: query,
    },
    include: {
      committees: true,
    },
  });
  return tourneys;
}
