"use server";

import { db } from "@/lib/db";

export default async function getTourneyById(tourneyId: string) {
  const tourney = await db.tourney.findUnique({
    where: {
      id: tourneyId,
    },
    include: {
      committees: true,
      delegateResources: true,
    },
  });

  return tourney;
}
