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

interface TicketProps {
  formik: any;
}

const Tickets = ({ formik }: TicketProps) => {
  return (
    <div className="space-y-8">
      {/* <div className="py-4">
        <p className="text-sm font-bold">When is your event?*</p>
        <p className="text-sm text-gray-800">
          Tell your attendees when your event starts so they can get ready.
        </p>
        <div className="grid grid-cols-2 gap-3 py-4">
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-semibold">
              Event Date*
            </label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.date}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.date && formik.touched.date
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
            />
            {formik.errors.date && formik.touched.date && (
              <p className="text-red-500 text-sm">{formik.errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="text-sm font-semibold">
              Time*
            </label>
            <input
              id="time"
              name="time"
              type="time"
              onChange={formik.handleChange}
              value={formik.values.time}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm
            ${
              formik.errors.time && formik.touched.time
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-slate-200 focus-visible:ring-slate-950 "
            }`}
            />
            {formik.errors.time && formik.touched.time && (
              <p className="text-red-500 text-sm">{formik.errors.time}</p>
            )}
          </div>
        </div>
      </div> */}

      <div className="pb-5">
        <p className="font-bold text-lg">Let's Create Tickets</p>
        <p className="text-gray-500">
          Click the create ticket button to add a new ticket.
        </p>
        <div className="flex justify-between pt-5">
          <p className="font-bold">Tickets (0)</p>
          <Dialog>
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
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create a Ticket</DialogTitle>
                <DialogDescription>
                  Fill in the details of your ticket. Click save when you’re
                  done.
                </DialogDescription>
              </DialogHeader>

              <div>
                {/* NAME  */}
                <div className="space-y-2">
                  <Label
                    htmlFor="ticket-name"
                    className="text-sm font-medium leading-none"
                  >
                    Ticket Name*
                  </Label>
                  <Input
                    id="ticket-name"
                    name="ticket.0.name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.ticket[0].name}
                    onBlur={formik.handleBlur}
                    placeholder="Enter event name here"
                    className="flex h-10 w-full border-slate-200 focus-visible:ring-slate-950 rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm"
                  />
                  <p className="text-slate-500 text-xs">
                    VIP, General, Regular
                  </p>
                  {formik.errors.ticket?.[0]?.name &&
                    formik.touched.ticket?.[0]?.name && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.ticket?.[0]?.name}
                      </p>
                    )}
                </div>

                {/* PRICE  */}
                <div className="space-y-2">
                  <Label
                    htmlFor="ticket.price"
                    className="text-sm font-medium leading-none"
                  >
                    Ticket Price
                  </Label>
                  <Input
                    id="ticket.price"
                    type="number"
                    name="ticket.0.price"
                    value={formik.values.ticket[0].price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="flex h-10 w-full border-slate-200 focus-visible:ring-slate-950 rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm"
                  />
                  {formik.touched.ticket?.[0]?.price &&
                    formik.errors.ticket?.[0]?.price && (
                      <p className="text-sm text-red-500">
                        {formik.errors.ticket?.[0]?.price}
                      </p>
                    )}
                </div>

                {/* QUANTITY  */}
                <div className="space-y-2">
                  <Label
                    htmlFor="ticket.quantity"
                    className="text-sm font-medium leading-none"
                  >
                    Number of tickets available
                  </Label>
                  <Input
                    id="ticket.quantity"
                    type="number"
                    name="ticket.0.quantity"
                    value={formik.values.ticket[0].quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="flex h-10 w-full border-slate-200 focus-visible:ring-slate-950 rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm"
                  />
                  {formik.touched.ticket?.[0].quantity &&
                    formik.errors.ticket?.[0].quantity && (
                      <p className="text-sm text-red-500">
                        {formik.errors.ticket?.[0].quantity}
                      </p>
                    )}
                </div>

                {/* DESCRIPTION  */}
                <div className="space-y-2">
                  <Label
                    htmlFor="ticket.desciption"
                    className="text-sm font-medium leading-none"
                  >
                    Any added description
                  </Label>
                  <Input
                    id="ticket.desciption"
                    type="text"
                    name="ticket.0.desciption"
                    value={formik.values.ticket.desciption}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="flex h-10 w-full border-slate-200 focus-visible:ring-slate-950 rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm"
                  />
                </div>

                {/* BENEFITS  */}
                <div className="space-y-2">
                  <Label
                    htmlFor="ticket.benefits"
                    className="text-sm font-medium leading-none"
                  >
                    Ticket benefits
                  </Label>
                  <Input
                    id="ticket.benefits"
                    type="text"
                    name="ticket.0.benefits"
                    value={formik.values.ticket[0].benefits}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="flex h-10 w-full border-slate-200 focus-visible:ring-slate-950 rounded-md border bg-white px-3 py-2 text-base placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 md:text-sm"
                  />
                </div>

                {/* VOLUME  */}
                <div className="space-y-2 flex items-center gap-6">
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
                    checked={formik.values.venue.isPublic}
                    onChange={(val) =>
                      formik.setFieldValue("ticket.0.showVolume", val)
                    }
                    onLabel="Public"
                    offLabel="Private"
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit">Save Ticket</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
