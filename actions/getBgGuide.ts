"use server";

import { db } from "@/lib/db";

export const getBgGuideLink = async (committeeId: number, tourneyId: string) => {
    try {
        const committee = await db.committee.findUnique({
          where: {
            id: committeeId,
            tourneyId: tourneyId,
          },
          select: {
            bgGuideLink: true,
          },
        });
        return committee ? committee.bgGuideLink : "";
    } catch (error) {
        console.error("Error fetching bgGuideLink:", error);
        return "";
    }
};
