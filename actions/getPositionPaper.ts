"use server";

import { db } from "@/lib/db";

export const getPositionPaperLink = async (committeeId: number, tourneyId: string, userId: string) => {
    try {
        const committee = await db.committee.findUnique({
            where: {
                id: committeeId,
                tourneyId: tourneyId,
            },
            select: {
                positionPaperLinks: true,
                delegatesThatSent: true,
            },
        });

        if (committee && committee.delegatesThatSent.includes(userId)) {
            const index = committee.delegatesThatSent.indexOf(userId);
            return committee.positionPaperLinks[index] || "";
        }

        return "";
    } catch (error) {
        console.error("Error fetching position paper link:", error);
        return "";
    }
};