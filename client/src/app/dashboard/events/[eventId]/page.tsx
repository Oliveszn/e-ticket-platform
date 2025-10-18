"use client";

import EventDetails from "@/components/dashboard/create/EventDetails";
import Tickets from "@/components/dashboard/create/Tickets";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useEventForm } from "@/hooks/useEventForm";
import EventFormLayout from "@/components/dashboard/create/EventFormLayout";

const CreateEvent = () => {
  const { eventId } = useParams();
  const {
    formik,
    step,
    isCreateMode,
    isEditMode,
    isLoading,
    isPending,
    nextStep,
    prevStep,
    handleFinalSubmit,
  } = useEventForm(eventId as string);

  const steps = useMemo(
    () => [
      {
        id: 0,
        name: "Event Details",
        component: <EventDetails formik={formik} />,
      },
      { id: 1, name: "Tickets", component: <Tickets formik={formik} /> },
    ],
    [formik]
  );

  if (isEditMode && isLoading) {
    return <p className="text-center mt-10">Loading event details...</p>;
  }
  return (
    <EventFormLayout
      title={isCreateMode ? "Create Your Event" : `Edit ${formik.values.title}`}
      steps={steps}
      currentStep={step}
      formik={formik}
      onNext={nextStep}
      onPrev={prevStep}
      onSubmit={handleFinalSubmit}
      isPending={isPending}
      isEditMode={isEditMode}
    />
  );
};

export default CreateEvent;
