"use server";

import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";

export default async function signUpDelegate(
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
      delegateIds: {
        push: [delegateId],
      },
    },
  });

  const user = await clerkClient.users.getUser(delegateId);

  await clerkClient.users.updateUserMetadata(delegateId, {
    publicMetadata: {
      dTourneys: [...(user.publicMetadata.dTourneys as string[]), tourneyId],
    },
  });

  return tourney;
}
