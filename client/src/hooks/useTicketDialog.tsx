import { FormValues, Ticket } from "@/utils/types";
import { formSchema } from "@/utils/validationSchema";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const useTicketDialog = (formik: any) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    personsPerTicket: 1,
    showVolume: false,
  });
  const [generalError, setGeneralError] = useState("");

  const handleSaveTicket = () => {
    if (!newTicket.name || !newTicket.price || !newTicket.quantity) {
      toast.error("Please fill in ticket name, price, and quantity.");
      setGeneralError("Please fill in ticket name, price, and quantity.");
      return;
    }

    // add ticket into Formik
    const currentTickets = formik.values.tickets;
    formik.setFieldValue("tickets", [...currentTickets, newTicket]);

    //reset local state and close dialog
    resetNewTicket();
    setIsDialogOpen(false);

    toast.success("Ticket saved!");
  };

  const handleInputChange = (field: keyof Ticket, value: any) => {
    setNewTicket((prev) => ({ ...prev, [field]: value }));
  };

  const resetNewTicket = () => {
    setNewTicket({
      name: "",
      price: "",
      quantity: "",
      description: "",
      personsPerTicket: 1,
      showVolume: false,
    });
    setGeneralError("");
  };

  const handleDeleteTicket = (index: number) => {
    const updatedTickets = formik.values.tickets.filter(
      (_: any, i: number) => i !== index
    );
    formik.setFieldValue("tickets", updatedTickets);
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    newTicket,
    setNewTicket,
    generalError,
    setGeneralError,
    handleSaveTicket,
    resetNewTicket,
    handleDeleteTicket,
    handleInputChange,
  };
};
