const Messages = () => {
  return (
    <main>
      <div className="space-y-8">
        <div>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
              ></path>
            </svg>
            <span className="font-semibold text-xl capitalize">Messages</span>
          </div>
        </div>
        <div className="border rounded dark:border-gray-600 dark:bg-secondary-alt bg-white text-black dark:text-gray-50 undefined">
          <div className="p-5 grid sm:grid-cols-3 gap-4">
            <div className="col-span-3 h-96 flex justify-center items-center">
              <p className="text-center">No messages yet!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Messages;
