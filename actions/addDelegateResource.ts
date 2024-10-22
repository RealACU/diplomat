"use server";

import { db } from "@/lib/db";

export default async function addDelegateResource(
  paperLink: string,
  tourneyId: string
) {
  const tourney = await db.tourney.update({
    where: {
      id: tourneyId,
    },
    data: {
      delegateResources: {
        push: [paperLink],
      },
    },
  });

  return tourney;
}
