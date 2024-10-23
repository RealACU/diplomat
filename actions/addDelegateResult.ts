"use server";

import { db } from "@/lib/db";

export default async function addDelegateResult(
  delegateId: string,
  feedback: string,
  committeeId: number
) {
  const delegateResource = await db.delegateResult.create({
    data: {
      delegateId,
      feedback,
      Committee: {
        connect: { id: committeeId },
      },
    },
  });

  return delegateResource;
}
