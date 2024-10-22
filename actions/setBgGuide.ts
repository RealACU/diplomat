"use server";

import { db } from "@/lib/db";

export default async function setBgGuide(
  paperLink: string,
  tourneyId: string,
  committeeId: number
) {
  const tourney = await db.committee.update({
    where: {
      id: committeeId,
      tourneyId: tourneyId,
    },
    data: {
      bgGuideLink: paperLink,
    },
  });

  return tourney;
}
