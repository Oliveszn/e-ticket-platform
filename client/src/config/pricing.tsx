export const pricingPlans = [
  {
    title: "Voting",
    subtitle: "Fee Per Vote",
    price: "8.5%",
    buttonBg: "bg-black",
    features: [
      "Unlimited Contestants",
      "Unlimited Categories",
      "1 Image Per Contestant",
      "Result Public Display",
      "Email Notifications",
      "Public Listing on Pevent",
      "Search Engine Optimization",
    ],
  },
  {
    title: "Ticketing",
    subtitle: "Fee Per Paid Ticket",
    price: "8.5% + N100",
    buttonBg: "bg-blue-500",
    gradient: true, // we can use this to add a special background
    features: [
      "Multiple Ticket Variation",
      "Ticket Inventory",
      "Digital Copy Of Ticket Sales",
      "Discount Codes",
      "Ticket Check-In",
      "Email Notification",
      "Export Of Data",
      "Search Engine Optimization",
    ],
  },
  {
    title: "Custom Services",
    subtitle: "All-Inclusive",
    price: "Custom",
    buttonBg: "bg-black",
    features: [
      "Event wrist tags",
      "Onsite ticketing",
      "Onsite POS systems",
      "Personalized domains",
      "Event promotion",
    ],
  },
];

export const optionsData = [
  {
    svg: (
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
        className="text-blue-400 w-8 h-8"
      >
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
      </svg>
    ),
    title: "Organizer Covers All Fees",
    subtitle: "You can cover all fees for your event.",
  },
  {
    svg: (
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
        className="text-blue-400 w-8 h-8"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: "Attendee Covers the Fees",
    subtitle: "You can transfer the fees to the attendee.",
  },
  {
    svg: (
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
        className="text-blue-400 w-8 h-8"
      >
        <path d="M16 3h5v5"></path>
        <path d="M8 3H3v5"></path>
        <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"></path>
        <path d="m15 9 6-6"></path>
      </svg>
    ),
    title: "Split 50/50",
    subtitle: "You can split the cost with the attendee.",
  },
];
