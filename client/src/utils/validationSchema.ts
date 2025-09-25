// this is for the cretain event form
import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string("Name cannot be blank")
    .min(2, { error: "Event name must be at leat 2 characters" }),
  slug: z
    .string(
      "Input should contain only letters, numbers and dash ( - ) (no spaces, slashes, or symbols)."
    )
    .regex(/^[a-zA-Z0-9-]+$/, {
      error:
        "Input should contain only letters, numbers and dash ( - ) (no spaces, slashes, or symbols).",
    }),
  date: z
    .string("Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      error: "Date must be in YYYY-MM-DD format",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      error: "Invalid date",
    }),

  time: z.string("Time is required").regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    error: "Time must be in HH:mm format (24-hour)",
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
