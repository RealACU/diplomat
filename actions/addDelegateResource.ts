"use server";

import { db } from "@/lib/db";

export default async function addDelegateResource(
  resourceLink: string,
  resourceName: string,
  tourneyId: string
) {
  const delegateResource = await db.delegateResource.create({
    data: {
      name: resourceName,
      link: resourceLink,
      Tourney: {
        connect: { id: tourneyId },
      },
    },
  });

  return delegateResource;
}
