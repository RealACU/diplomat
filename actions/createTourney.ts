"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { TourneySchema } from "@/schemas";
import { Committee } from "@/components/CreateTourneyForm";
import { clerkClient } from "@clerk/nextjs/server";
import { createId } from "@paralleldrive/cuid2";
import { States } from "@prisma/client";

export default async function createTourney(
  values: z.infer<typeof TourneySchema>,
  committees: Committee[],
  creatorId: string
) {
  const tourneyId = createId();
  const allChairIds: string[] = [];

  const data = {
    id: tourneyId,
    creatorId,
    name: values.name,
    description: values.description,
    school: values.school,
    address: values.address,
    city: values.city,
    state: values.state as States,
    zip: values.zip,
    // Nevada is UTC-7
    startDate: values.startDate + ":00.000-07:00",
    endDate: values.endDate + ":00.000-07:00",
    primaryColorHex: values.name,
    secondaryColorHex: values.name,
    committees: {
      create: committees.map((committee) => {
        return {
          name: committee.name,
          roomNumber: committee.roomNumber,
          bgGuideLink: "",
          chairIds: committee.chairs.map((chair) => {
            allChairIds.push(chair.id);
            return chair.id;
          }),
        };
      }),
    },
  };

  allChairIds.forEach(async (chairId) => {
    const user = await clerkClient.users.getUser(chairId);

    await clerkClient.users.updateUserMetadata(chairId, {
      publicMetadata: {
        cTourneys: [...(user.publicMetadata.cTourneys as string[]), tourneyId],
      },
    });
  });

  const createTourney = await db.tourney.create({ data });

  return createTourney;
}
