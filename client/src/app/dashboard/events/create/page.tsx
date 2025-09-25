"use client";

import EventDetails from "@/components/dashboard/create/EventDetails";
import Tickets from "@/components/dashboard/create/Tickets";
import { formSchema } from "@/utils/validationSchema";
import { useFormik } from "formik";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

type FormValues = {
  name: string;
  slug: string;
  date: string;
  time: string;
};

const CreateEvent = () => {
  const [step, setStep] = useState(0);
  const formik = useFormik<FormValues>({
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
    console.log("Final form submission ", data);
  };

  const nextStep = async () => {
    ///validate current step before you proceed
    let fieldsToValidate: (keyof FormValues)[] = [];

    if (step === 0) {
      fieldsToValidate = ["name", "slug"];
    } else if (step === 1) {
      fieldsToValidate = ["date", "time"];
    }

    ////validate only the fields for the currenrt step
    const errors = await formik.validateForm();
    const hasErrors = fieldsToValidate.some((field) => errors[field]);

    ///marking fields as touched to sow errors
    const touchedFields = fieldsToValidate.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);

    formik.setTouched({ ...formik.touched, ...touchedFields });

    if (!hasErrors) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const steps = [
    {
      id: 0,
      name: "Event Details",
      component: <EventDetails formik={formik} />,
    },
    { id: 1, name: "Tickets", component: <Tickets formik={formik} /> },
  ];
  return (
    <div className="px-3 py-8 space-y-8">
      <h1 className="text-base md:text-lg font-semibold">Create Your Event</h1>

      <div className="border rounded bg-white text-black sm:w-4/5 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-5">
            {/* Stepper */}
            <div className="flex justify-between items-center mb-6">
              {steps.map((s, i) => (
                <div key={s.id} className="flex flex-col gap-2 items-center">
                  <div
                    className={`h-10 w-10 rounded-full border border-primary flex items-center justify-center ${
                      i === step
                        ? "bg-blue text-white" //current step we are in
                        : i < step
                        ? "bg-blue border-blue-500 text-black" //completed steps
                        : "bg-white border-gray-300 text-gray-400" //upcoming steps
                    }`}
                  >
                    <span className="">{i + 1}</span>
                  </div>
                  <span
                    className={`font-medium text-sm ${
                      i <= step ? "text-blue" : "text-gray-600"
                    }`}
                  >
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <hr />

          {/* Form */}
          <div className="py-5 sm:w-4/5 mx-auto divide-y">
            {steps[step].component}

            {/* Navigation */}
            <div className="flex justify-between mt-10">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={() => alert("Submit form here")}
                  className="px-6 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
