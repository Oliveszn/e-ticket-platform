"use client";

import EventDetails from "@/components/dashboard/create/EventDetails";
import Tickets from "@/components/dashboard/create/Tickets";
import { resetForm, saveData, setStep } from "@/store/createevent-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { formSchema } from "@/utils/validationSchema";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";
import { FormValues } from "@/utils/types";

const CreateEvent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const step = useAppSelector((state) => state.form.step);
  const formData = useAppSelector((state) => state.form.data);
  const formik = useFormik<FormValues>({
    initialValues: {
      title: formData.title || "",
      slug: formData.slug || "",
      date: formData.date || "",
      time: formData.time || "",
      venue: {
        name: formData.venue?.name || "",
        address: formData.venue?.address || "",
        city: formData.venue?.city || "",
        state: formData.venue?.state || "",
        isPublic: formData.venue?.isPublic ?? true,
      },
      charge: formData.charge || "Host",
      category: formData.category || "",
      description: formData.description || "",
      image: null as any,
      ticket: formData.ticket || [
        {
          name: "",
          price: 0,
          quantity: 0,
          description: "",
          benefits: [],
          showVolume: false,
        },
      ],
    },
    validationSchema: toFormikValidationSchema(formSchema),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (data: any) => {
    console.log("Final form submission ", data);
    dispatch(resetForm());
    router.push("/dashboard/events");
  };

  function hasNestedError(obj: any): boolean {
    if (!obj) return false;
    if (typeof obj === "string") return true;
    if (typeof obj === "object") {
      return Object.values(obj).some((value) => hasNestedError(value));
    }
    return false;
  }

  function markTouched(fields: any): any {
    if (typeof fields === "string" || typeof fields === "number") {
      return true;
    }
    if (Array.isArray(fields)) {
      return fields.map((item) => markTouched(item));
    }
    if (typeof fields === "object" && fields !== null) {
      return Object.keys(fields).reduce((acc, key) => {
        acc[key] = markTouched(fields[key]);
        return acc;
      }, {} as any);
    }
    return true;
  }

  const nextStep = async () => {
    ///here we create a variable that will hold keys from our ts formvalues
    let fieldsToValidate: (keyof FormValues)[] = [];

    ///here we check and validate the filed by the step we are on
    if (step === 0) {
      fieldsToValidate = [
        "title",
        "slug",
        "date",
        "time",
        "venue",
        "charge",
        "category",
        "description",
        "image",
      ];
    } else if (step === 1) {
      fieldsToValidate = ["ticket"];
    }

    ////here validateform validates the field and return the error we set in zod
    ///// haserrors uses ftv up above to check if any field has erors
    const errors = await formik.validateForm();
    const hasErrors = fieldsToValidate.some((field) =>
      hasNestedError(errors[field])
    );

    ///here we map over ftv and set every key to true to set it as touched
    // const touchedFields = fieldsToValidate.reduce((acc, field) => {
    //   acc[field] = true;
    //   return acc;
    // }, {} as Record<string, boolean>);
    const touchedFields = fieldsToValidate.reduce((acc, field) => {
      if (errors[field]) {
        acc[field] = markTouched(errors[field]);
      } else {
        acc[field] = true;
      }
      return acc;
    }, {} as Record<string, any>);

    ////here we are forcing formik to mark all as touched so it can show all errors (normally formik will only show errors of wats been touched)
    formik.setTouched({ ...formik.touched, ...touchedFields });

    //if theres are no errors
    if (!hasErrors) {
      dispatch(saveData(formik.values));
      dispatch(setStep(Math.min(step + 1, steps.length - 1)));
    }
  };

  const prevStep = () => dispatch(setStep(Math.max(step - 1, 0)));

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
