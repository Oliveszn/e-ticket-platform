import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useLogout } from "@/hooks/endpoints/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";

const Header = () => {
  const { mutate: logout, isPending } = useLogout();
  if (isPending) {
    return <LoadingSpinner />;
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 shadow-md bg-white">
      <SidebarTrigger />
      <div className="flex flex-1 justify-end items-center gap-8">
        <div>
          <Link
            href="/dashboard/events/create"
            className="bg-blue text-secondary shadow-lg rounded whitespace-nowrap py-2.5 px-4 cursor-pointer"
          >
            Create Event
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="cursor-pointer outline-none border-none bg-transparent"
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem>Create Event</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>My Event</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>My Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button onClick={() => logout()} className="text-red-400 ">
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
