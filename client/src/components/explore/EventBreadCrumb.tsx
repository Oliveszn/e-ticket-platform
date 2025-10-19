"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams, usePathname } from "next/navigation";
import { Fragment } from "react";

interface BreadcrumbConfig {
  label: string;
  href?: string;
}

interface EventBreadCrumbProps {
  eventTitle?: string;
  ticketName?: string;
}
export default function EventBreadCrumb({
  eventTitle,
  ticketName,
}: EventBreadCrumbProps) {
  const params = useParams();
  const pathName = usePathname();
  const slug = params.slug as string;

  //// we firtsdetermine the current page
  const isEventDetail = pathName === `/explore/${slug}`;
  const isTicketPurchase = pathName.includes("/ticket/");

  const breadcrumbs: BreadcrumbConfig[] = [
    { label: "Explore", href: "/explore" },
  ];

  if (slug) {
    breadcrumbs.push({
      label: eventTitle || "Event Details",
      href: isEventDetail ? undefined : `/explore/${slug}`,
    });
  }

  if (isTicketPurchase && ticketName) {
    breadcrumbs.push({
      label: `${ticketName}`,
    });
  }
  return (
    <Breadcrumb className="-mx-6 sm:-mx-8 pb-6">
      <BreadcrumbList className="bg-blue-200 capitalize px-5 sm:px-20 py-6 sm:py-8 sm:text-sm md:text-base font-semibold flex overflow-hidden items-center gap-1 sm:gap-4">
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={index}>
            <BreadcrumbItem className="flex items-center gap-1 sm:gap-4">
              {crumb.href ? (
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
