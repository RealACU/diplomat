"use server";

import { db } from "@/lib/db";

export default async function addPositionPaper(
  paperLink: string,
  tourneyId: string,
  committeeId: number,
  delegateId: string
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
      delegatesThatSent: {
        push: [delegateId],
      },
    },
  });

  return tourney;
}
