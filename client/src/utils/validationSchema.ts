// this is for the cretain event form
import { z } from "zod";

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#^()-_.,></?}{$!%*?&])[A-Za-z\d@$!%*?&]/;

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

  tickets: z
    .array(
      z.object({
        name: z.string({ message: "Ticket name is required" }),
        price: z.number({ message: "Ticket price is required" }),
        quantity: z.number({ message: "Quantity is required" }),
        description: z.string().optional(),
        benefits: z.string().optional(),
        showVolume: z.boolean().default(false),
      })
    )
    .min(1, { message: "At least one ticket must be provided" }),
});

//change password check
export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ error: "Current password is required" })
      .min(1, "Current password is required"),
    newPassword: z
      .string({ error: "New password is required" })
      .min(8, "New password must be at least 8 characters")
      .max(100, "New password must be less than 100 characters")
      .regex(
        strongPasswordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmPassword: z.string({ error: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

///// registre
export const registerSchema = z.object({
  firstName: z
    .string({ error: "First name is required" })
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "First name can only contain letters and spaces")
    .trim(),

  lastName: z
    .string({ error: "Last name is required" })
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name can only contain letters and spaces")
    .trim(),

  businessName: z
    .string({ error: "Business name is required" })
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be less than 100 characters")
    .trim(),

  email: z
    .string({ error: "Email is required" })
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  number: z
    .string({ error: "Phone number is required" })
    .regex(
      phoneRegex,
      "Please enter a valid phone number (e.g., +1234567890 or 1234567890)"
    )
    .transform((val) => val.replace(/\D/g, "")), // Remove non-digits

  address: z
    .string({ error: "Address is required" })
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters")
    .trim(),

  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(
      strongPasswordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

////LOGIN
export const loginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

///// UPDATE PROFILE SCHEMA
export const updateProfileSchema = z.object({
  firstName: z
    .string({ error: "First name is required" })
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "First name can only contain letters and spaces")
    .trim(),

  lastName: z
    .string({ error: "Last name is required" })
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name can only contain letters and spaces")
    .trim(),

  businessName: z
    .string({ error: "Business name is required" })
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be less than 100 characters")
    .trim(),

  number: z
    .string({ error: "Phone number is required" })
    .regex(phoneRegex, "Please enter a valid phone number")
    .transform((val) => val.replace(/\D/g, "")),

  address: z
    .string({ error: "Address is required" })
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters")
    .trim(),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
