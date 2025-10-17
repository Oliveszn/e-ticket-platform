// this is for the cretain event form
import { z } from "zod";

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#^()-_.,></?}{$!%*?&])[A-Za-z\d@$!%*?&]/;

export const ticketSchema = z.object({
  name: z.string().min(1, "Ticket name is required"),
  price: z.number().min(1, "Price must be at least 1"),
  quantity: z.number().min(1, "Quantity is required"),
  description: z.string().optional(),
  personsPerTicket: z.number().default(1),
  showVolume: z.boolean().default(false),
});

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
    .union([
      // ✅ Case 1: File object
      z.any().refine(
        (file) => {
          return (
            file &&
            typeof file === "object" &&
            "name" in file &&
            "size" in file &&
            "type" in file &&
            file instanceof File
          );
        },
        { message: "Select at least one image" }
      ),

      // ✅ Case 2: base64 stored object
      z.object({
        base64: z.string(),
        name: z.string(),
        type: z.string(),
        size: z.number(),
      }),
      // ✅ Case 3: already uploaded image URL
      z.string().url().min(1),
    ])
    .optional()
    // ✅ Keep your refinements intact
    .refine(
      (file: any) => {
        if (file?.size) return file.size <= 5 * 1024 * 1024;
        return true;
      },
      { message: "Image must be less than 5MB" }
    )
    .refine(
      (file: any) => {
        if (file?.type)
          return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
        return true;
      },
      { message: "Only JPEG, PNG, and WebP images are allowed" }
    ),

  tickets: z.array(ticketSchema).min(1, "At least one ticket is required"),
});

export type FormSchema = z.infer<typeof formSchema>;

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

////PURCHASING TICKETS
export const ticketPurchaseSchema = z
  .object({
    firstName: z
      .string({ error: "First name is required" })
      .min(1, "First name is required"),
    lastName: z
      .string({ error: "Last name is required" })
      .min(1, "Last name is required"),
    email: z
      .string({ error: "Email is required" })
      .email("Invalid email address"),
    numberOfTickets: z.preprocess((val) => {
      // here we check for values that are not numbers and also convert strings to numbers
      if (val === "" || val === undefined || val === null) return undefined;
      if (typeof val === "string") {
        const num = Number(val);
        return Number.isNaN(num) ? val : num;
      }
      return val;
    }, z.number().int().min(1, "Must purchase at least 1 ticket")),
    info: z.string().optional(),
    sendToMultipleRecipients: z.preprocess((val) => {
      // here we convert string to boolean
      if (typeof val === "string") {
        const lower = val.toLowerCase();
        if (lower === "true") return true;
        if (lower === "false") return false;
      }
      return Boolean(val);
    }, z.boolean()),
    // Validate each recipient's shape; make the whole array optional (we'll handle presence via superRefine)
    // recipients: z
    //   .array(
    //     z.object({
    //       firstName: z
    //         .string({ error: "First name is required" })
    //         .min(1, "Recipient first name is required"),
    //       lastName: z
    //         .string({ error: "Last name is required" })
    //         .min(1, "Recipient last name is required"),
    //       email: z
    //         .string({ error: "Email is required" })
    //         .min(1, "Recipient email is required")
    //         .email("Invalid recipient email"),
    //     })
    //   )
    //   .optional(),
    recipients: z
      .array(
        z.object({
          firstName: z.string().min(1, "Recipient first name is required"),
          lastName: z.string().min(1, "Recipient last name is required"),
          email: z
            .string()
            .min(1, "Recipient email is required")
            .email("Invalid recipient email"),
        })
      )
      .optional()
      .nullable(), // Add nullable here
  })
  .superRefine((data, ctx) => {
    // Only validate if sendToMultipleRecipients is true
    if (data.sendToMultipleRecipients) {
      // Check numberOfTickets is valid
      if (
        typeof data.numberOfTickets !== "number" ||
        data.numberOfTickets <= 1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["numberOfTickets"],
          message:
            "Must purchase at least 2 tickets to send to multiple recipients.",
        });
        return; // Stop further validation
      }

      // Check recipients array exists
      if (!data.recipients || !Array.isArray(data.recipients)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["recipients"],
          message: "Recipients are required when sending to multiple people.",
        });
        return;
      }

      // Check count matches
      const expected = data.numberOfTickets - 1;
      const actual = data.recipients.length;

      if (actual !== expected) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["recipients"],
          message: `Please add ${expected} recipient${
            expected !== 1 ? "s" : ""
          } (you get 1 ticket, ${expected} other${
            expected !== 1 ? "s" : ""
          } needed).`,
        });
      }
    }
  });

export type TicketPurchaseSchema = z.infer<typeof ticketPurchaseSchema>;
