import * as z from "zod";

import { stateAbbreviations } from "@/lib/stateAbbreviations";

/**
 * Schema for admins creating tournaments
 */
export const TourneySchema = z.object({
  creatorId: z.string().min(1),
  name: z.string({ required_error: "Please enter tournament name" }),
  description: z
    .string({ required_error: "Please enter description" })
    .max(500, { message: "Description cannot be longer than 500 characters" }),
  school: z.string({ required_error: "Please enter school name" }),
  address: z.string({ required_error: "Please enter first address line" }),
  city: z.string({ required_error: "Please enter city" }),
  state: z.enum([stateAbbreviations[0], ...stateAbbreviations.slice(1)], {
    errorMap: () => {
      return { message: "Please select a state" };
    },
  }),
  zip: z.string({ required_error: "Please enter zip code" }),
  startDate: z.string({ required_error: "Please enter start date" }),
  endDate: z.string({ required_error: "Please enter end date" }),
});
