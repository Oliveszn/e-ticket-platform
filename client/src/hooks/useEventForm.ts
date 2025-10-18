import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import {
  useCreateEvent,
  useEditEvent,
  useSinglePromoterEvent,
} from "./endpoints/useEvent";
import { Formik, useFormik } from "formik";
import { useEffect, useMemo } from "react";
import {
  hasNestedError,
  markTouched,
  parseImageFromRedux,
  prepareImageForRedux,
} from "@/utils/formHelpers";
import { FormValues } from "@/utils/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { formSchema } from "@/utils/validationSchema";
import { transformApiEventToFormValues } from "@/utils/eventTransformers";
import { resetForm, saveData, setStep } from "@/store/createevent-slice";

export const useEventForm = (eventId: string | string[]) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const step = useAppSelector((state) => state.form.step);
  const formData = useAppSelector((state) => state.form.data);

  const isCreateMode = eventId === "create";
  const isEditMode = !isCreateMode;

  useEffect(() => {
    if (isCreateMode) {
      dispatch(resetForm());
      dispatch(setStep(0));
    }
  }, [isCreateMode, dispatch]);

  // All your form logic here...
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

  const initialValues = useMemo(
    () => ({
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
      image: parseImageFromRedux(formData.image),

      tickets: formData.tickets || [],
    }),
    [formData]
  );

  const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(formSchema),
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  // Load data from API in edit mode
  useEffect(() => {
    if (isEditMode && data?.data) {
      console.log("API data:", data.data); // 👈 ADD THIS

      const transformedData = transformApiEventToFormValues(data.data);
      console.log("Transformed data:", transformedData);
      formik.setValues(transformedData as FormValues);
      dispatch(saveData(transformedData));
    }
  }, [data?.data, isEditMode]);

  // Handle form submission
  const handleSubmit = async (data: any) => {
    if (isEditMode) {
      editEvent(
        { eventId: String(eventId), form: data },
        {
          onSuccess: () => {
            router.push("/dashboard/events");
            dispatch(resetForm());
          },
        }
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

  // Navigate to next step
  const nextStep = async () => {
    ///here we create a variable that will hold keys from our ts formvalues
    const fieldsToValidate: (keyof FormValues)[] =
      ///here we check and validate the filed by the step we are on
      step === 0
        ? [
            "title",
            "slug",
            "date",
            "time",
            "venue",
            "charge",
            "category",
            "description",
            "image",
          ]
        : ["tickets"];

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

    if (!hasErrors) {
      const dataToSave = { ...formik.values };

      // Convert File to base64 before saving to Redux
      if (formik.values.image instanceof File) {
        dataToSave.image = await prepareImageForRedux(formik.values.image);
      }

      dispatch(saveData(dataToSave));
      dispatch(setStep(Math.min(step + 1, 1))); // Max step is 1
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    dispatch(setStep(Math.max(step - 1, 0)));
  };

  // Handle final submit (from last step)
  const handleFinalSubmit = async () => {
    const errors = await formik.validateForm();
    const errorKeys = Object.keys(errors);

    if (errorKeys.length > 0) {
      const newTouched = errorKeys.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as any);
      formik.setTouched({ ...formik.touched, ...newTouched });
      return;
    }

    formik.handleSubmit();
  };
  return {
    formik,
    step,
    isCreateMode,
    isEditMode,
    isLoading,
    isPending,
    nextStep,
    prevStep,
    handleFinalSubmit,
  };
};
