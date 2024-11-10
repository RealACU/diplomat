"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function updateUserSchoolAffiliation(userId: string, schoolAffiliation: string) {
  try {
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        schoolAffiliation: String(schoolAffiliation),
      },
    });
    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Failed to update user ${userId}:`, errorMessage);
    return { success: false, error: errorMessage };
  }
}