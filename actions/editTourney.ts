// "use server";

// import * as z from "zod";

// import { db } from "@/lib/db";
// import { TourneySchema } from "@/schemas";
// import { clerkClient } from "@clerk/nextjs/server";

// export default async function editTourney(tourneyId: string, values: any) {
//   const data = {
//     committees: values.committees,
//   };

//   const updateTourney = await db.tourney.update({
//     where: {
//       id: tourneyId,
//     },
//     data,
//   });
//   return updateTourney;
// }

// Not yet functional