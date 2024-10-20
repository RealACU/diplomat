"use server";

import { db } from "@/lib/db";

export default async function signUpDelegate(
  tourneyId: string,
  committeeId: number,
  paperLink: string
) {
  const tourney = await db.committee.update({
    where: {
      id: committeeId,
      tourneyId: tourneyId,
    },
    data: {
      positionPaperLinks: {
        push: [paperLink],
      },
    },
  });

  return tourney;
}
