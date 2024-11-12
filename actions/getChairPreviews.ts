"use server";

import { clerkClient } from "@clerk/nextjs/server";

export default async function getChairPreviews(query: string) {
  const { data } = await (await clerkClient).users.getUserList({
    query,
  });

  return JSON.stringify(data);
}
