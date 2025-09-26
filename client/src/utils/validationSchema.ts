// this is for the cretain event form
import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string("Name cannot be blank")
    .min(2, { error: "Event Title must be at least 2 characters" }),
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

  venue: z.object({
    name: z.string({ error: "Venue name is required" }),
    address: z.string({ error: "Address is required" }),
    city: z.string({ error: "City is required" }),
    state: z.string({ error: "State is required" }),
    isPublic: z.boolean().default(true),
  }),

  charge: z.enum(["Host", "Buyer"], {
    error: "Charge type is required",
  }),

  category: z.enum(
    [
      "Music",
      "Sports",
      "Tech",
      "Education",
      "Health",
      "Seminars",
      "Arts & Culture",
    ],
    { error: "Category is required" }
  ),

  description: z.string().optional(),

  image: z
    .instanceof(File, { message: "Select at least one image" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // 5MB limit
      message: "Image must be less than 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only JPEG, PNG, and WebP images are allowed",
      }
    ),

  ticket: z
    .array(
      z.object({
        name: z.string({ error: "Ticket name is required" }),
        price: z.number({ error: "Ticket price is required" }),
        quantity: z.number({ error: "Quantity is required" }),
        description: z.string().optional(),
        benefits: z.array(z.string()).optional(),
        showVolume: z.boolean().default(false),
      })
    )
    .min(1, { message: "At least one ticket must be provided" }),
});

//change password check
export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
