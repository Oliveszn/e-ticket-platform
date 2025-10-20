import Toggle from "@/components/dashboard/Toggle";

interface MultipleRecipientsSectionProps {
  formik: any;
}

export default function MultipleRecipientsSection({
  formik,
}: MultipleRecipientsSectionProps) {
  const handleToggle = (val: boolean) => {
    formik.setFieldValue("sendToMultipleRecipients", val);

    if (val) {
      const recipientsNeeded = formik.values.numberOfTickets - 1;
      const newRecipients = Array.from({ length: recipientsNeeded }, () => ({
        firstName: "",
        lastName: "",
        email: "",
      }));
      formik.setFieldValue("recipients", newRecipients);
    } else {
      formik.setFieldValue("recipients", undefined);
    }
  };

  return (
    <div className="border rounded bg-white mt-4">
      <div className="p-5">
        {/* Toggle Section */}
        <div className="flex items-center justify-between gap-5 mb-6">
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-1">
              Send Tickets to different email addresses?
            </h3>
            <p className="text-slate-500 text-xs">
              If left blank all tickets will be sent to the email used for
              payment
            </p>
          </div>
          <Toggle
            checked={formik.values.sendToMultipleRecipients}
            onChange={handleToggle}
          />
        </div>

        {/* Recipients List */}
        {formik.values.sendToMultipleRecipients && (
          <div className="space-y-4">
            {Array.from({ length: formik.values.numberOfTickets - 1 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-gray-50 space-y-3"
                >
                  <h4 className="font-semibold text-sm">
                    Attendee {index + 2}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* First Name */}
                    <div>
                      <label
                        htmlFor={`recipients.${index}.firstName`}
                        className="text-sm font-medium text-gray-600 mb-1 block"
                      >
                        First Name
                      </label>
                      <input
                        id={`recipients.${index}.firstName`}
                        name={`recipients.${index}.firstName`}
                        type="text"
                        placeholder="First name"
                        value={
                          formik.values.recipients?.[index]?.firstName || ""
                        }
                        onChange={formik.handleChange}
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                      />
                      {(formik.touched.recipients as any)?.[index]?.firstName &&
                        (formik.errors.recipients as any)?.[index]
                          ?.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {(formik.errors.recipients as any)[index].firstName}
                          </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor={`recipients.${index}.lastName`}
                        className="text-sm font-medium text-gray-600 mb-1 block"
                      >
                        Last Name
                      </label>
                      <input
                        id={`recipients.${index}.lastName`}
                        name={`recipients.${index}.lastName`}
                        type="text"
                        placeholder="Last name"
                        value={
                          formik.values.recipients?.[index]?.lastName || ""
                        }
                        onChange={formik.handleChange}
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                      />
                      {(formik.touched.recipients as any)?.[index]?.lastName &&
                        (formik.errors.recipients as any)?.[index]
                          ?.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {(formik.errors.recipients as any)[index].lastName}
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor={`recipients.${index}.email`}
                      className="text-sm font-medium text-gray-600 mb-1 block"
                    >
                      Email
                    </label>
                    <input
                      id={`recipients.${index}.email`}
                      name={`recipients.${index}.email`}
                      type="email"
                      placeholder="email@example.com"
                      value={formik.values.recipients?.[index]?.email || ""}
                      onChange={formik.handleChange}
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                    />
                    {(formik.touched.recipients as any)?.[index]?.email &&
                      (formik.errors.recipients as any)?.[index]?.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {(formik.errors.recipients as any)[index].email}
                        </p>
                      )}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
