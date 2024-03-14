import * as z from "zod";

/**
 * Schema for admins creating tournaments
 */
export const TourneySchema = z.object({
  creatorId: z.string().min(1),
  name: z.string({ required_error: "Tournament name is required" }),
  school: z.string({ required_error: "School name is required" }),
  location: z.string({ required_error: "Tournament location is required" }),
  startDate: z.date(),
  endDate: z.date(),
  allChairIds: z.array(z.string()),
});
