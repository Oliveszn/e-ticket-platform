import FormInput from "@/components/common/FormInputs";

interface PersonalInfoSectionProps {
  formik: any;
}

export default function PersonalInfoSection({
  formik,
}: PersonalInfoSectionProps) {
  return (
    <div className="border rounded bg-white">
      <h2 className="p-5 border-b font-semibold">Your Information</h2>
      <div className="px-5 py-5 space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="John"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
            required
          />
          <FormInput
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
            required
          />
        </div>

        {/* Email */}
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
          required
        />

        {/* Number of Tickets */}
        <div className="space-y-2">
          <label
            htmlFor="numberOfTickets"
            className="text-sm font-medium leading-none"
          >
            Number of tickets
          </label>
          <select
            id="numberOfTickets"
            name="numberOfTickets"
            value={formik.values.numberOfTickets}
            onChange={(e) => {
              const newCount = parseInt(e.target.value);
              formik.setFieldValue("numberOfTickets", newCount);

              if (formik.values.sendToMultipleRecipients) {
                const recipientsNeeded = newCount - 1;
                const currentRecipients = formik.values.recipients || [];
                const newRecipients = Array.from(
                  { length: recipientsNeeded },
                  (_, i) =>
                    currentRecipients[i] || {
                      firstName: "",
                      lastName: "",
                      email: "",
                    }
                );
                formik.setFieldValue("recipients", newRecipients);
              }
            }}
            className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label htmlFor="info" className="text-sm font-medium text-gray-700">
            Phone Number (+234)
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="info"
            name="info"
            value={formik.values.info}
            onChange={formik.handleChange}
            placeholder="8012345678"
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 md:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
