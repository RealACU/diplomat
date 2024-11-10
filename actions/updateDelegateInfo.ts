"use server";

import { db } from "@/lib/db";

export async function updateDelegateInfo(tourneyId: string, committeeId: number, delegateId: string, newAllocation: string) {
  try {
    let delegateInfo = await db.delegateInfo.findFirst({
        where: {
          committeeId: committeeId,
          committee: { tourneyId: tourneyId },
          delegateId,
        }
      });
  
      if (!delegateInfo) {
        delegateInfo = await db.delegateInfo.create({
          data: {
            delegateId,
            committeeId: committeeId,
            allocation: newAllocation,
          }
        });
      } else {
        delegateInfo = await db.delegateInfo.update({
          where: { id: delegateInfo.id },
          data: { allocation: newAllocation },
        });
      }  
  
    return JSON.parse(JSON.stringify({ success: true })); 
  } catch (error) {
    console.error("Error updating allocation:", error);
    return JSON.parse(JSON.stringify({ success: false, error }));
  }
}
