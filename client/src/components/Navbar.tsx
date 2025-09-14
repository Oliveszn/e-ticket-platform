import Link from "next/link";
import { StagePassLogo } from "./Stagepass-logo";
import { Button } from "./ui/button";

export default function Navbar() {
  let links = [
    { name: "Home", link: "/" },
    { name: "Explore", link: "/explore" },
    { name: "About", link: "/about" },
    { name: "How it works", link: "/works" },
    { name: "Pricing", link: "/pricing" },
  ];
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 sm:px-8 lg:px-10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto py-4 flex justify-between items-center">
        <div className="flex-shrink-0 cursor-pointer">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-gray-700"
          >
            <StagePassLogo size="small" />
          </Link>
        </div>

        <div className="flex items-center justify-between space-x-8">
          {links.map((items) => (
            <Link
              key={items.name}
              href={items.link}
              className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              {items.name}
            </Link>
          ))}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        <div>
          <Link href="/auth/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-4 rounded shadow-lg flex justify-center items-center w-24">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
