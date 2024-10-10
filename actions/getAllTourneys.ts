"use server";

import { db } from "@/lib/db";

export default async function getAllTourneys() {
  const tourneys = await db.tourney.findMany({
    include: {
      committees: true,
    },
    orderBy: {
      startDate: "asc",
    },
  });
  return tourneys;
}
