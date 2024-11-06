import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server"; 

export const updateTourneyAndUser = async (tourneyId: string, updatedDelegateIDs: string[], updatedChairIDs: string[]) => {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found');
  }

  // Update the tournament's committee delegateIds and chairIds
  const updatedTournament = await db.tourney.update({
    where: { id: tourneyId },
    data: {
      committees: {
        updateMany: {
          where: {},  // You can add conditions here if you want to update specific committees
          data: {
            delegateIds: updatedDelegateIDs,  // Update delegateIds
            chairIds: updatedChairIDs,        // Update chairIds
          },
        },
      },
    },
  });

  // Update the user's dTourneys and cTourneys arrays
  const updatedUserMetadata = user.publicMetadata || {}; // Assuming user metadata contains these properties
  const dTourneys = Array.isArray(updatedUserMetadata.dTourneys) ? updatedUserMetadata.dTourneys : [];
  const cTourneys = Array.isArray(updatedUserMetadata.cTourneys) ? updatedUserMetadata.cTourneys : [];

  // Here, we don't need to update the User model in Prisma since Clerk's user metadata handles it
  const updatedUser = {
    ...user,
    publicMetadata: {
      ...updatedUserMetadata,
      dTourneys: dTourneys.includes(tourneyId) ? dTourneys : [...dTourneys, tourneyId], // Ensure tourneyId is added to dTourneys
      cTourneys: cTourneys.includes(tourneyId) ? cTourneys : [...cTourneys, tourneyId], // Ensure tourneyId is added to cTourneys
    },
  };

  return {
    updatedTournament,
    updatedUser, // We're returning the updated Clerk user object
  };
};