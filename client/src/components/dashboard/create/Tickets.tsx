interface TicketProps {
  formik: any;
}

const Tickets = ({ formik }: TicketProps) => {
  return (
    <div className="space-y-8">
      <div className="py-4">
        <p className="text-sm font-bold">When is your event?*</p>
        <p className="text-sm text-gray-800">
          Tell your attendees when your event starts so they can get ready.
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
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.date && formik.touched.date
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
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
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.time && formik.touched.time
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
            />
            {formik.errors.time && formik.touched.time && (
              <p className="text-red-500 text-sm">{formik.errors.time}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
