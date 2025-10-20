interface TicketSummaryProps {
  name: string;
  personsPerTicket: number | undefined;
  numberOfTickets: number;
  showVolume: boolean;
  available: number | undefined;
  subTotal: number;
  fees: number;
  isPending: boolean;
}

export default function TicketSummary({
  name,
  personsPerTicket,
  showVolume,
  available,
  numberOfTickets,
  subTotal,
  fees,
  isPending,
}: TicketSummaryProps) {
  return (
    <div className="sm:col-span-4">
      <div className="border rounded">
        <p className="p-5 border-b flex justify-between items-center">
          Ticket Information
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
            {/* {currentTicket?.data.name} */}
            {name}
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
              <span className="text-sm">
                {/* {currentTicket?.data?.personsPerTicket} Person(s) */}
                {personsPerTicket} Person(s)
              </span>
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
                {/* {currentTicket?.data.showVolume ? (
                          <p className="text-sm text-gray-500">
                            {currentTicket?.data.available} Available
                          </p>
                        ) : (
                          <p> Available</p>
                        )} */}
                {showVolume ? (
                  <p className="text-sm text-gray-500">{available} Available</p>
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
              {/* <span>{formik.values.numberOfTickets}</span> */}
              {numberOfTickets}
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
                {subTotal.toLocaleString()}
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
            className="bg-blue-500 shadow-lg rounded whitespace-nowrap gap-2 justify-center flex text-white items-center py-2.5 px-4 text-sm w-full hover:bg-blue-600 cursor-pointer"
          >
            {isPending ? "Processing..." : "Proceed To Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}
