"use server";

import { db } from "@/lib/db";

export default async function addPositionPaper(
  paperLink: string,
  tourneyId: string,
  committeeId: number,
  delegateId: string
) {
  const committee = await db.committee.findUnique({
    where: {
      id: committeeId,
      tourneyId: tourneyId,
    },
    include: {
      delegateInfo: true,
    },
  });

  if (!committee) {
    throw new Error("Error: committee not found");
  }

  //all of this stuff up here is basically deletion logic

  let newPositionPaperLinks = [...committee.positionPaperLinks];

  if (paperLink) {
    newPositionPaperLinks.push(paperLink);
  } else {
    newPositionPaperLinks = newPositionPaperLinks.filter(link => link !== paperLink);
  }

  let newDelegatesThatSent = [...committee.delegatesThatSent];

  if (paperLink) {
    if (!newDelegatesThatSent.includes(delegateId)) {
      newDelegatesThatSent.push(delegateId);
    }
  } else {
    newDelegatesThatSent = newDelegatesThatSent.filter(delegate => delegate !== delegateId);
  }

  const delegateInfo = committee.delegateInfo.find(
    (info) => info.delegateId === delegateId
  );

  if (!delegateInfo) {
    await db.delegateInfo.create({
      data: {
        allocation: '',
        committeeId: committeeId,
        delegateId: delegateId,
        positionPaperLink: paperLink || null, 
      },
    });
  } else {
    await db.delegateInfo.update({
      where: {
        id: delegateInfo.id,
      },
      data: {
        positionPaperLink: paperLink || null, 
      },
    });
  }

  const tourney = await db.committee.update({
    where: {
      id: committeeId,
      tourneyId: tourneyId,
    },
    data: {
      positionPaperLinks: newPositionPaperLinks,
      delegatesThatSent: newDelegatesThatSent,
    },
  });

  return tourney;
}
