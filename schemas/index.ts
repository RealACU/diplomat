import * as z from "zod";

/**
 * Schema for admins creating tournaments
 */
export const TourneySchema = z.object({
  creatorId: z.string().min(1),
  name: z.string().min(1, { message: "Tournament name is required" }),
  school: z.string().min(1, { message: "School name is required" }),
  location: z.string().min(1, { message: "Tournament location is required" }),
  startDate: z.date(),
  endDate: z.date(),
  allChairIds: z.array(z.string()),
});
