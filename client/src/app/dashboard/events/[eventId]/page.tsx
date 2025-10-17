"use client";

import EventDetails from "@/components/dashboard/create/EventDetails";
import Tickets from "@/components/dashboard/create/Tickets";
import { resetForm, saveData, setStep } from "@/store/createevent-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { formSchema } from "@/utils/validationSchema";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useParams, useRouter } from "next/navigation";
import { FormValues } from "@/utils/types";
import {
  base64ToFile,
  convertFileToBase64,
  hasNestedError,
  markTouched,
} from "@/utils/helperFunction";
import {
  useCreateEvent,
  useEditEvent,
  useSinglePromoterEvent,
} from "@/hooks/useEvent";
import { useEffect, useRef } from "react";

const CreateEvent = () => {
  const dispatch = useAppDispatch();
  const { eventId } = useParams();
  const router = useRouter();
  const hasLoadedData = useRef(false);
  const step = useAppSelector((state) => state.form.step);
  const formData = useAppSelector((state) => state.form.data);
  const isCreateMode = eventId === "create";
  const isEditMode = !isCreateMode;

  const { data, isLoading } = useSinglePromoterEvent(
    isEditMode ? String(eventId) : ""
  );
  const {
    mutate: createEvent,
    isPending,
    isError,
    error,
    isSuccess,
  } = useCreateEvent();
  const { mutate: editEvent, error: editError } = useEditEvent();
  const formatDateForInput = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0]; // "2025-10-16"
  };
  console.log("Edit error:", editError);
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
      image: formData.image?.base64
        ? base64ToFile(
            formData.image.base64,
            formData.image.name,
            formData.image.type
          )
        : typeof formData.image === "string" && formData.image.length > 0
        ? formData.image
        : null,

      tickets: formData.tickets || [],
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(formSchema),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (isEditMode && data?.data && !hasLoadedData.current) {
      hasLoadedData.current = true;
      const event = data.data;

      const newValues = {
        title: event.title || "",
        slug: event.slug || "",
        date: event.eventDate ? formatDateForInput(event.eventDate) : "",
        time: event.eventTime || "",
        venue: {
          name: event.venue.name || "",
          address: event.venue.address || "",
          city: event.venue.city || "",
          state: event.venue.state || "",
          isPublic: event.venue.isPublic ?? true,
        },
        charge: event.charge || "Host",
        category: event.category as FormValues["category"],
        description: event.description || "",
        image:
          typeof event.image === "object" &&
          event.image !== null &&
          "url" in event.image
            ? event.image.url
            : typeof event.image === "string"
            ? event.image
            : "",
        tickets: event.tickets || [],
      };

      formik.setValues(newValues);

      // Save to Redux so tickets persist when navigating
      dispatch(saveData(newValues));
    }
  }, [data?.data, isEditMode]);

  useEffect(() => {
    hasLoadedData.current = false;
  }, [eventId]);

  const handleSubmit = async (data: any) => {
    console.log("Submitting data:", data);
    if (isEditMode) {
      editEvent(
        { eventId: String(eventId), form: data },
        { onSuccess: () => router.push("/dashboard/events") }
      );
    } else {
      createEvent(data, {
        onSuccess: () => {
          router.push("/dashboard/events");
          dispatch(resetForm());
        },
      });
    }
  };

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
      fieldsToValidate = ["tickets"];
    }

    ////here validateform validates the field and return the error we set in zod
    ///// haserrors uses ftv up above to check if any field has erors
    const errors = await formik.validateForm();
    const hasErrors = fieldsToValidate.some((field) =>
      hasNestedError(errors[field])
    );

    ///here we map over ftv and set every key to true to set it as touched
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
      // Convert File to base64 before saving to Redux
      const dataToSave = { ...formik.values };
      console.log("Saving to Redux - dataToSave.tickets:", dataToSave.tickets);

      if (formik.values.image instanceof File) {
        const base64 = await convertFileToBase64(formik.values.image);
        dataToSave.image = {
          base64,
          name: formik.values.image.name,
          type: formik.values.image.type,
          size: formik.values.image.size,
        };
      }
      // dispatch(saveData(formik.values));
      dispatch(saveData(dataToSave));
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

  if (isEditMode && isLoading) {
    return <p className="text-center mt-10">Loading event details...</p>;
  }
  return (
    <div className="px-3 py-8 space-y-8">
      <h1 className="text-base md:text-lg font-semibold">
        {isCreateMode ? "Create Your Event" : `Edit ${formik.values.title}`}
      </h1>

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
                  disabled={isPending}
                  type="button"
                  onClick={async () => {
                    console.log(
                      "Image value being validated:",
                      formik.values.image
                    ); // 👈 ADD THIS
                    console.log("Image type:", typeof formik.values.image);
                    const errors = await formik.validateForm();
                    console.log("Validation errors:", errors);
                    // Check all errors
                    const errorKeys = Object.keys(errors);
                    console.log("Error keys:", errorKeys);
                    if (errorKeys.length > 0) {
                      console.log("Has errors, not submitting");
                      // Mark all errored fields as touched
                      const newTouched = errorKeys.reduce((acc, key) => {
                        acc[key] = true;
                        return acc;
                      }, {} as any);
                      formik.setTouched({ ...formik.touched, ...newTouched });
                      return;
                    }
                    console.log("No errors, calling handleSubmit");
                    formik.handleSubmit();
                  }}
                  className="px-6 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  {isPending
                    ? isEditMode
                      ? "Saving..."
                      : "Creating..."
                    : isEditMode
                    ? "Save Changes"
                    : "Create Event"}
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
