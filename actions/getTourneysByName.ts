"use server";

import { db } from "@/lib/db";

export default async function getTourneysByName(query: string) {
  const tourneys = await db.tourney.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      committees: true,
      delegateResources: true,
    },
    orderBy: {
      startDate: "asc",
    },
  });
  return tourneys;
}
