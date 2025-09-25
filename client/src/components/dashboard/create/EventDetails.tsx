"use client";

interface EventDetailsProps {
  formik: any;
}

const EventDetails = ({ formik }: EventDetailsProps) => {
  return (
    <div className="space-y-8">
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
          onBlur={formik.handleBlur}
          placeholder="Enter event name here"
          className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.name && formik.touched.name
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
        />
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          See how your name appears on the event page and a list of all places
          where your event name will be used.
        </p>
        {formik.errors.name && formik.touched.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}
      </div>

      {/* SLUG */}
      <div className="space-y-2 dark:text-gray-200">
        <label htmlFor="slug" className="text-sm font-medium leading-none">
          Give your event a slug.*
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.slug}
          onBlur={formik.handleBlur}
          placeholder="Unique slug for your event"
          className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.slug && formik.touched.slug
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
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
    </div>
  );
};

export default EventDetails;
