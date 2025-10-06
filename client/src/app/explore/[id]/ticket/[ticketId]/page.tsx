"use client";
import PurchaseForm from "@/components/explore/PurchaseForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getSingleTickets } from "@/store/tickets-slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  ticketPurchaseSchema,
  TicketPurchaseSchema,
} from "@/utils/validationSchema";
import Toggle from "@/components/dashboard/Toggle";

const TicketPurchaePage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { currentTicket, status, error } = useAppSelector(
    (state) => state.ticket
  );

  const eventId = params.id as string;
  const ticketId = params.ticketId as string;

  const formik = useFormik<TicketPurchaseSchema>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      numberOfTickets: 1,
      info: "",
      sendToMultipleRecipients: false,
      recipients: [
        {
          firstName: "",
          lastName: "",
          email: "",
        },
      ],
    },
    validationSchema: toFormikValidationSchema(ticketPurchaseSchema),
    onSubmit: (values) => {
      console.log("✅ SUBMITTING", values);
      console.log(formik.errors);
      handleSubmit(values);
    },
  });

  const handleSubmit = async (data: TicketPurchaseSchema) => {
    console.log(data);
    console.log(formik.errors);
  };

  const fees = 250 * formik.values.numberOfTickets;
  const subTotal = (currentTicket?.price ?? 0) * formik.values.numberOfTickets;
  useEffect(() => {
    if (eventId && ticketId) {
      dispatch(getSingleTickets({ id: eventId, ticketId }));
    }
  }, [dispatch, eventId, ticketId]);

  if (status === "loading") {
    return <div>Loading ticket details...</div>;
  }

  if (!currentTicket) {
    return <div>Ticket not found</div>;
  }
  return (
    // <div className="container mx-auto px-4 py-8">
    //   <div className="grid md:grid-cols-2 gap-8">
    //     {/* Left: Ticket Details */}
    //     <div className="bg-white p-6 rounded-lg shadow">
    //       <h1 className="text-2xl font-bold mb-4">{currentTicket.name}</h1>
    //       <div className="space-y-3">
    //         <div>
    //           <span className="text-gray-600">Price:</span>
    //           <span className="ml-2 text-xl font-bold">
    //             ${currentTicket.price}
    //           </span>
    //         </div>
    //         <div>
    //           <span className="text-gray-600">Available:</span>
    //           <span className="ml-2">{currentTicket.available} tickets</span>
    //         </div>
    //         {currentTicket.benefits && (
    //           <div>
    //             <span className="text-gray-600">Benefits:</span>
    //             <p className="mt-1">{currentTicket.benefits}</p>
    //           </div>
    //         )}
    //         {currentTicket.description && (
    //           <div>
    //             <span className="text-gray-600">Description:</span>
    //             <p className="mt-1">{currentTicket.description}</p>
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     {/* Right: Purchase Form */}
    //     <div className="bg-white p-6 rounded-lg shadow">
    //       <h2 className="text-xl font-bold mb-4">Purchase Ticket</h2>
    //       <PurchaseForm
    //         ticketId={ticketId}
    //         eventId={eventId}
    //         price={currentTicket.price}
    //       />
    //     </div>
    //   </div>
    // </div>
    <form onSubmit={formik.handleSubmit}>
      <div className="grid sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8">
          <div className="border rounded">
            <p className="p-5 border-b">Your Information</p>
            <div className="px-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 py-5">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="firstName"
                  >
                    First Name*
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="John"
                    id="firstName"
                    aria-describedby="firstName-description"
                    aria-invalid="false"
                    name="firstName"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.firstName && formik.touched.firstName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2 py-5">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="lastName"
                  >
                    Last Name*
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    placeholder="Doe"
                    id="lastName"
                    aria-describedby="lastName-description"
                    aria-invalid="false"
                    name="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.lastName && formik.touched.lastName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="relative w-full">
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="flex h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full"
                      placeholder="Enter your email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="numberOfTickets"
                  >
                    Number of ticket
                  </label>
                  <select
                    id="numberOfTickets"
                    name="numberOfTickets"
                    value={formik.values.numberOfTickets}
                    onChange={(e) => {
                      const newCount = parseInt(e.target.value);
                      formik.setFieldValue("numberOfTickets", newCount);

                      // Sync recipients array when sendToMultipleRecipients is true
                      if (formik.values.sendToMultipleRecipients) {
                        const recipientsNeeded = newCount - 1;
                        const currentRecipients =
                          formik.values.recipients || [];

                        // Create new array with correct length
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
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>

              <div className="py-4 border-t mt-4">
                <h3 className="font-semibold mb-4">Additional Information</h3>
                <div className="mb-4">
                  <div className="space-y-2">
                    <label
                      className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-700"
                      htmlFor="info"
                    >
                      +234<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      placeholder=""
                      id="info"
                      value={formik.values.info}
                      onChange={formik.handleChange}
                      aria-describedby="info-description"
                      aria-invalid="false"
                      name="info"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-2 flex flex-row-reverse items-center justify-end gap-5 py-5">
                  <div className="space-y-0.5">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor=":Rd6jddd6rja:-form-item"
                    >
                      Send Tickets to different email addresses?
                    </label>
                    <p
                      id=":Rd6jddd6rja:-form-item-description"
                      className="text-slate-500 text-xs"
                    >
                      If left blank all tickets will be sent to the email used
                      for payment
                    </p>
                  </div>

                  <Toggle
                    checked={formik.values.sendToMultipleRecipients}
                    onChange={(val) => {
                      formik.setFieldValue("sendToMultipleRecipients", val);

                      if (val) {
                        // set recipients array when toggling on
                        const recipientsNeeded =
                          formik.values.numberOfTickets - 1;
                        const newRecipients = Array.from(
                          { length: recipientsNeeded },
                          () => ({
                            firstName: "",
                            lastName: "",
                            email: "",
                          })
                        );
                        formik.setFieldValue("recipients", newRecipients);
                      } else {
                        // clear recipients when toggling off
                        formik.setFieldValue("recipients", undefined);
                      }
                    }}
                  />
                </div>
              </div>

              {formik.values.sendToMultipleRecipients && (
                <div className="space-y-2 py-5">
                  {Array.from({
                    length: formik.values.numberOfTickets - 1,
                  }).map((_, index) => (
                    <div key={index} className="space-y-2 border-b pb-4">
                      <p className="font-semibold text-sm">
                        Attendee {index + 2} - Early bird
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-500"
                            htmlFor={`recipients.${index}.firstName`}
                          >
                            First Name
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                            autoComplete="off"
                            placeholder="Your name..."
                            id={`recipients.${index}.firstName`}
                            aria-describedby={`recipients.${index}.firstName-description`}
                            aria-invalid="false"
                            type="text"
                            name={`recipients.${index}.firstName`}
                            value={formik.values.recipients?.[index]?.firstName}
                            onChange={formik.handleChange}
                          />
                          {(formik.touched.recipients as any)?.[index]
                            ?.firstName &&
                            (formik.errors.recipients as any)?.[index]
                              ?.firstName && (
                              <p className="text-red-500 text-sm">
                                {
                                  (formik.errors.recipients as any)[index]
                                    .firstName
                                }
                              </p>
                            )}
                        </div>
                        <div>
                          <label
                            className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-500"
                            htmlFor={`recipients.${index}.lastName`}
                          >
                            Last Name
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                            autoComplete="off"
                            placeholder=""
                            id={`recipients.${index}.lastName`}
                            aria-describedby={`recipients.${index}.lastName-description`}
                            aria-invalid="false"
                            type="text"
                            name={`recipients.${index}.lastName`}
                            value={formik.values.recipients?.[index]?.lastName}
                            onChange={formik.handleChange}
                          />
                          {(formik.touched.recipients as any)?.[index]
                            ?.lastName &&
                            (formik.errors.recipients as any)?.[index]
                              ?.lastName && (
                              <p className="text-red-500 text-sm">
                                {
                                  (formik.errors.recipients as any)[index]
                                    .lastName
                                }
                              </p>
                            )}
                        </div>
                      </div>

                      <div>
                        <label
                          className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-500"
                          htmlFor={`recipients.${index}.email`}
                        >
                          Email
                        </label>
                        <input
                          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                          autoComplete="email"
                          placeholder=""
                          id={`recipients.${index}.email`}
                          aria-describedby={`recipients.${index}.email-description`}
                          aria-invalid="false"
                          type="email"
                          name={`recipients.${index}.email`}
                          value={formik.values.recipients?.[index]?.email}
                          onChange={formik.handleChange}
                        />
                        {(formik.touched.recipients as any)?.[index]?.email &&
                          (formik.errors.recipients as any)?.[index]?.email && (
                            <p className="text-red-500 text-sm">
                              {(formik.errors.recipients as any)[index].email}
                            </p>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sm:col-span-4">
          <div className="border rounded">
            <p className="p-5 border-b flex justify-between items-center">
              Ticket Information{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-10 w-10 text-blue-500 bg-blue-100 rounded-full p-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                ></path>
              </svg>
            </p>

            <div className="p-5 space-y-4">
              <p className="font-bold text-lg uppercase">
                {currentTicket.name}
              </p>
              <p className="text-sm text-gray-500">
                Gate pass and access to general dance floor
              </p>

              <div className="flex gap-4">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-blue-500 bg-blue-100 rounded-full p-2"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="text-sm">1 Person(s)</span>
                </div>

                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-10 w-10 text-blue-500 bg-blue-100 rounded-full p-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                    ></path>
                  </svg>
                  <span className="text-sm">
                    {currentTicket.showVolume ? (
                      <p className="text-sm text-gray-500">
                        {currentTicket.available} Available
                      </p>
                    ) : (
                      <p> Available</p>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Quantity</span>
                  <span>{formik.values.numberOfTickets}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fees</span>
                  <span>
                    <span>₦</span>
                    {fees.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sub Total</span>
                  <span>
                    <span>₦</span>
                    {subTotal
                      // currentTicket.price * formik.values.numberOfTickets
                      .toLocaleString()}
                  </span>
                </div>
              </div>
              <hr />
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-bold text-xl">
                  <span>₦</span>
                  {(subTotal + fees).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="px-5 space-y-4 pb-5">
              <button
                type="submit"
                className="bg-blue-500 shadow-lg rounded whitespace-nowrap gap-2 justify-center flex text-white items-center py-2.5 px-4 text-sm w-full"
              >
                <span>Proceed To Payment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TicketPurchaePage;
