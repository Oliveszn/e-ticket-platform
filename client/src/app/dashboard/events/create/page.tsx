"use client";
import { z } from "zod";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

const CreateEvent = () => {
  const formSchema = z.object({
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

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      date: "",
      time: "",
    },
    validationSchema: toFormikValidationSchema(formSchema),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="px-3 py-8 space-y-8">
      <h1 className="text-base md:text-lg font-semibold">Create Your Event</h1>

      <div className="border rounded bg-white text-black sm:w-4/5 mx-auto">
        <div className="p-5">
          {/* Stepper */}
          <div className="flex justify-between items-center">
            {["Event Details", "Tickets"].map((step, i) => (
              <div key={step} className="flex flex-col gap-2 items-center">
                <div
                  className={`h-10 w-10 rounded-full border border-primary flex items-center justify-center ${
                    i === 0 ? "bg-blue text-white" : "bg-white"
                  }`}
                >
                  <span className="">{i + 1}</span>
                </div>
                <span
                  className={`font-medium text-sm ${
                    i === 0 ? "text-blue" : "text-gray-600"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        <hr />

        {/* Form */}
        <div className="py-5 sm:w-4/5 mx-auto divide-y">
          <form onSubmit={formik.handleSubmit} className="space-y-8">
            {/* Event Name */}
            <div className="space-y-2 dark:text-gray-200">
              <label
                htmlFor="event-name"
                className="text-sm font-medium leading-none"
              >
                Give your event a name.*
              </label>
              <input
                id="event-name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Enter event name here"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:opacity-50 md:text-sm dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              />
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                See how your name appears on the event page and a list of all
                places where your event name will be used.
              </p>
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            {/* SLUG */}
            <div className="space-y-2 dark:text-gray-200">
              <label
                htmlFor="slug"
                className="text-sm font-medium leading-none"
              >
                Give your event a slug.*
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.slug}
                placeholder="Unique slug for your event"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:opacity-50 md:text-sm dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              />
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                This will be part of your event link, e.g.
                <span className="text-blue-500">
                  www.stagepass.com/your-slug-name
                </span>
              </p>
              {formik.errors.slug && formik.touched.slug && (
                <p className="text-red-500 text-sm">{formik.errors.slug}</p>
              )}
            </div>

            {/* DATE */}
            <div className="py-4">
              <p className="text-sm font-bold">When is your event?*</p>
              <p className="text-sm text-gray-800">
                Tell your attendees when your event starts so they can get
                ready.
              </p>
              <div className="grid grid-cols-2 gap-3 py-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-semibold">
                    Event Date*
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.date}
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-slate-950 md:text-sm dark:border-slate-800 dark:bg-slate-950"
                  />
                  {formik.errors.date && formik.touched.date && (
                    <p className="text-red-500 text-sm">{formik.errors.date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-semibold">
                    Time*
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    onChange={formik.handleChange}
                    value={formik.values.time}
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-slate-950 md:text-sm dark:border-slate-800 dark:bg-slate-950"
                  />
                  {formik.errors.time && formik.touched.time && (
                    <p className="text-red-500 text-sm">{formik.errors.time}</p>
                  )}
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 py-5">
              <button
                type="button"
                className="bg-blue-500 px-12 py-2 rounded text-white"
              >
                Previous
              </button>
              <button
                type="submit"
                className="bg-blue-500 px-12 py-2 rounded text-white"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
