"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Toggle from "../Toggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface TicketProps {
  formik: any;
}

const Tickets = ({ formik }: TicketProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [newTicket, setNewTicket] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    personsPerTicket: "",
    showVolume: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setNewTicket((prev) => ({ ...prev, [field]: value }));
  };

  const resetNewTicket = () => {
    setNewTicket({
      name: "",
      price: "",
      quantity: "",
      description: "",
      personsPerTicket: "",
      showVolume: false,
    });
  };

  const handleSaveTicket = async () => {
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

  return (
    <div className="space-y-8">
      <div className="pb-5">
        <p className="font-bold text-lg">Let's Create Tickets</p>
        <p className="text-gray-500">
          Click the create ticket button to add a new ticket.
        </p>

        <div className="space-y-8">
          <div className="flex justify-between pt-5 items-center">
            <p className="font-bold">
              Tickets ({formik.values.tickets.length})
            </p>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="bg-blue-500 shadow-lg rounded whitespace-nowrap gap-2 justify-center flex text-white flex items-center py-2.5 px-4 text-sm undefined"
                >
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
                    className="h-5"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                  <span>Create Ticket</span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] ">
                <DialogHeader>
                  <DialogTitle>Create a Ticket</DialogTitle>
                  <DialogDescription>
                    Fill in the details of your ticket. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>

                <div className="max-h-[60vh] overflow-y-auto pr-2">
                  {/* NAME  */}
                  <div className="space-y-3 my-2">
                    <Label
                      htmlFor="ticket-name"
                      className="text-sm font-medium leading-none"
                    >
                      Ticket Name*
                    </Label>
                    <Input
                      id="ticket-name"
                      type="text"
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      value={newTicket.name}
                      onBlur={formik.handleBlur}
                      placeholder="e.g., VIP, General Admission"
                      className="flex h-10 w-full border-slate-200 focus-visible:ring-slate-950 rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm"
                    />
                    <p className="text-slate-500 text-xs">
                      VIP, General, Regular
                    </p>
                  </div>

                  {/* PRICE  */}
                  <div className="space-y-3 my-2">
                    <Label
                      htmlFor="ticket.price"
                      className="text-sm font-medium leading-none"
                    >
                      Ticket Price
                    </Label>
                    <Input
                      id="ticket.price"
                      type="number"
                      placeholder="1000"
                      value={newTicket.price}
                      onChange={(e) =>
                        handleInputChange("price", Number(e.target.value))
                      }
                      onBlur={formik.handleBlur}
                      className="flex h-10 w-full border-slate-200 focus-visible:ring-slate-950 rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm"
                    />
                  </div>

                  {/* QUANTITY  */}
                  <div className="space-y-3 my-2">
                    <Label
                      htmlFor="ticket.quantity"
                      className="text-sm font-medium leading-none"
                    >
                      Number of tickets available
                    </Label>
                    <Input
                      id="ticket.quantity"
                      type="number"
                      value={newTicket.quantity}
                      onChange={(e) =>
                        handleInputChange("quantity", Number(e.target.value))
                      }
                      placeholder="50"
                      onBlur={formik.handleBlur}
                      className="flex h-10 w-full border-slate-200 focus-visible:ring-slate-950 rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm"
                    />
                  </div>

                  {/* DESCRIPTION  */}
                  <div className="space-y-3 my-2">
                    <Label
                      htmlFor="ticket.desciption"
                      className="text-sm font-medium leading-none"
                    >
                      Any added description (optional)
                    </Label>
                    <Input
                      id="ticket.desciption"
                      type="text"
                      value={newTicket.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Additional details about this ticket"
                      onBlur={formik.handleBlur}
                      className="flex h-10 w-full border-slate-200 focus-visible:ring-slate-950 rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm"
                    />
                  </div>

                  {/* PERSONS PER TICKET  */}
                  <div className="space-y-3 my-2">
                    <Label
                      htmlFor="ticket.personsPerTicket"
                      className="text-sm font-medium leading-none"
                    >
                      Number of persons to this ticket
                    </Label>
                    <Input
                      id="ticket.personsPerTicket"
                      type="text"
                      value={newTicket.personsPerTicket}
                      onChange={(e) =>
                        handleInputChange(
                          "personsPerTicket",
                          Number(e.target.value)
                        )
                      }
                      placeholder=""
                      onBlur={formik.handleBlur}
                      className="flex h-10 w-full border-slate-200 focus-visible:ring-slate-950 rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm"
                    />
                    <p className="text-slate-500 text-xs">
                      How many persons does this ticket admit, Example 1, 2, 4
                      persons.
                    </p>
                  </div>

                  {/* VOLUME  */}
                  <div className="space-y-3 flex items-center gap-6 my-2">
                    <div>
                      <label
                        htmlFor="venue-isPublic"
                        className="text-xs font-bold"
                      >
                        Show Volume?
                      </label>
                      <p className="text-xs text-gray-800">
                        Show the number of tickets available to the public
                      </p>
                    </div>
                    <Toggle
                      checked={newTicket.showVolume}
                      onChange={(val) => handleInputChange("showVolume", val)}
                      onLabel="Public"
                      offLabel="Private"
                    />
                  </div>
                </div>

                <DialogFooter>
                  {generalError && (
                    <p className="text-red-500 text-sm mt-2">{generalError}</p>
                  )}
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" onClick={handleSaveTicket}>
                    Save Ticket
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* List of added tickets */}
          {formik.values.tickets.length > 0 && (
            <div className="py-5 space-y-5">
              {formik.values.tickets.map((ticket: any, index: number) => (
                <div
                  key={index}
                  className="border rounded dark:border-gray-600 dark:bg-secondary-alt bg-white text-black dark:text-gray-50"
                >
                  <div className="divide-y shadow-lg">
                    {/* Top Section */}
                    <div className="p-5 flex justify-between">
                      <div className="flex gap-4">
                        <div className="p-4 rounded-full text-yellow-500 bg-blue-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-6"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold">
                            {ticket.name || "Untitled Ticket"} - ₦
                            {ticket.price.toLocaleString()}
                          </p>
                          <span className="text-sm">
                            {formik.values.date
                              ? new Date(formik.values.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "short",
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "Date not set"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedTickets = formik.values.tickets.filter(
                              (_: any, i: number) => i !== index
                            );
                            formik.setFieldValue("tickets", updatedTickets);
                          }}
                        >
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
                            className="text-red-500"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="p-5 grid grid-cols-3">
                      {/* Total Tickets */}
                      <div className="flex gap-2 sm:gap-4">
                        <div className="bg-gray-50 rounded-full p-2 sm:p-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6 text-blue-500"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-xs font-light">
                            Total tickets
                          </span>
                          <b className="text-sm font-semibold">
                            {ticket.quantity}
                          </b>
                        </div>
                      </div>

                      {/* persons per ticket */}
                      <div className="flex gap-2 sm:gap-4">
                        <div className="bg-gray-50 rounded-full p-2 sm:p-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6 text-blue-500"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-xs font-light">
                            Person(s) per ticket
                          </span>
                          <b className="text-sm font-semibold">
                            {ticket.personsPerTicket}
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Validation error for tickets array */}
          {formik.errors.tickets && formik.touched.tickets && (
            <p className="text-red-500 text-sm mt-2">
              {typeof formik.errors.tickets === "string"
                ? formik.errors.tickets
                : "Please add at least one ticket"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
