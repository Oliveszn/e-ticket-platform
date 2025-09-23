"use client";
import {
  Calendar,
  CircleDollarSign,
  Contact,
  LayoutDashboard,
  MailOpen,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { StagePassLogo } from "../common/Stagepass-logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const MenuItems = [
    {
      title: "Overview",
      links: [
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "My Events",
      links: [
        {
          label: "View All Events",
          icon: Calendar,
          path: "/dashboard/events",
        },
      ],
    },
    {
      title: "Customers",
      links: [
        {
          label: "Contact List",
          icon: Contact,
          path: "/dashboard/contacts",
        },
        {
          label: "Messages",
          icon: MailOpen,
          path: "/dashboard/messages",
        },
      ],
    },
    {
      title: "My Account",
      links: [
        {
          label: "Payout",
          icon: CircleDollarSign,
          path: "/dashboard/payouts",
        },
        {
          label: "Profile",
          icon: Users,
          path: "/dashboard/profile",
        },
      ],
    },
  ];
  const pathname = usePathname();
  return (
    <Sidebar variant="floating">
      <SidebarHeader className="text-2xl mb-6 px-3">
        <div className="flex items-center gap-2">
          <Link href="/">
            <StagePassLogo size="small" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {MenuItems.flatMap((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <div className="mb-3">
                    <h1 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-3 mb-2 ">
                      {item.title}
                    </h1>

                    <div className="space-y-1">
                      {item.links.map((link) => {
                        const isActive = pathname === link.path;

                        return (
                          <SidebarMenuButton asChild key={link.label}>
                            <Link
                              href={link.path}
                              className={`relative flex items-center gap-2 ${
                                isActive ? "bg-blue text-secondary" : ""
                              }`}
                            >
                              <link.icon
                                className={`w-4 h-4 transition-colors ${
                                  isActive
                                    ? "text-sidebar-accent"
                                    : "text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground"
                                }`}
                              />
                              <span className="font-medium md:text-lg">
                                {link.label}
                              </span>
                              <div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-sidebar-ring/20 transition-all duration-200"></div>
                            </Link>
                          </SidebarMenuButton>
                        );
                      })}
                    </div>
                  </div>
                  {/* ///this seperator is to add a line after each section */}
                  {index < MenuItems.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
