"use server";

import { db } from "@/lib/db";

export default async function getTourneyById(tourneyId: string) {
  if (!tourneyId || tourneyId.length === 0) {
    console.error("No tourney ID");
    return;
  }

  const tourney = await db.tourney.findUnique({
    where: {
      id: tourneyId,
    },
    include: {
      committees: true,
    },
  });

  return tourney;
}
