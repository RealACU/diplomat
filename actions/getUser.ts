"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function getUser(userId: string) {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const allDelegateInfo = await db.delegateInfo.findMany();

    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: Array.isArray(user.emailAddresses) && user.emailAddresses.length > 0
        ? user.emailAddresses[0].emailAddress
        : 'Unknown',
      delegateInfo: allDelegateInfo.filter(info => info.delegateId === user.id) || [],
      publicMetadata: user.publicMetadata || {},
    };

    return { success: true, user: userData };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Failed to get user ${userId}:`, errorMessage);
    return { success: false, error: errorMessage };
  }
}
