"use server";

import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";

type UserPublicMetadata = {
  dTourneys?: string[]; 
};

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

  const client = await clerkClient();

  const user = await client.users.getUser(delegateId);

  const publicMetadata = user.publicMetadata as UserPublicMetadata;

  await client.users.updateUserMetadata(delegateId, {
    publicMetadata: {
      dTourneys: [
        ...(publicMetadata.dTourneys || []),
        tourneyId,
      ],
    },
  });

  return tourney;
}
