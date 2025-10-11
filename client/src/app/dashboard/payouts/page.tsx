const Payouts = () => {
  return (
    <main>
      <div className="space-y-8">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-5"
            >
              <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z"></path>
              <path
                fillRule="evenodd"
                d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold text-xl capitalize">Payouts</span>
          </div>
        </div>
        <div className="border rounded dark:border-gray-600 dark:bg-secondary-alt bg-white text-black dark:text-gray-50 undefined">
          <div className="p-5">
            <div className="sm:flex justify-between items-start">
              <div className="flex gap-2 overflow-x-auto">
                <div className="bg-indigo-500 flex-shrink-0 rounded space-y-4 p-4 text-white">
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col gap-2">
                      <span className="uppercase text-xs">Ledger Balance</span>
                      <span className="text-2xl font-bold">N0</span>
                    </div>
                    <div className="bg-gray-50 bg-opacity-50 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-8 w-8"
                      >
                        <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z"></path>
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-500 flex-shrink-0 rounded space-y-4 p-4 text-white">
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col gap-2">
                      <span className="uppercase text-xs">
                        All Time Payouts
                      </span>
                      <span className="text-2xl font-bold">N0</span>
                    </div>
                    <div className="bg-gray-50 bg-opacity-50 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-8 w-8"
                      >
                        <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z"></path>
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex pt-5 sm:p-0 gap-3 sm:gap-5">
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-blue-500/90 h-10 px-4 py-2 flex-1"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-:ra:"
                  data-state="closed"
                >
                  Add Bank Account
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-blue-500 text-white hover:bg-blue-500/90 dark:bg-blue-50 dark:text-white dark:hover:bg-blue-50/90 h-10 px-4 py-2 flex-1"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-:rd:"
                  data-state="closed"
                >
                  Request Withdrawal
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded dark:border-gray-600 dark:bg-secondary-alt bg-white text-black dark:text-gray-50 undefined">
          <div className="p-5 space-y-5">
            <div className="flex justify-between">
              <p className="font-semibold text-lg">Payout History</p>
              <button
                type="button"
                className="bg-blue-500 shadow-lg rounded whitespace-nowrap gap-2 justify-center flex text-white flex items-center py-2.5 px-4 text-sm undefined"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                    clipRule="evenodd"
                  ></path>
                  <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"></path>
                </svg>
                <span>Download CSV</span>
              </button>
            </div>
            <div>
              <div className="w-full overflow-x-auto relative">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="pr-5 py-3 border-b-2 border-gray-300 text-left text-sm leading-5 font-medium uppercase tracking-wider">
                        Reference
                      </th>
                      <th className="pr-5 py-3 border-b-2 border-gray-300 text-left text-sm leading-5 font-medium uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="pr-5 py-3 border-b-2 border-gray-300 text-left text-sm leading-5 font-medium uppercase tracking-wider">
                        Acct Number
                      </th>
                      <th className="pr-5 py-3 border-b-2 border-gray-300 text-left text-sm leading-5 font-medium uppercase tracking-wider">
                        Bank
                      </th>
                      <th className="pr-5 py-3 border-b-2 border-gray-300 text-left text-sm leading-5 font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th className="pr-5 py-3 border-b-2 border-gray-300 text-left text-sm leading-5 font-medium uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payouts;
