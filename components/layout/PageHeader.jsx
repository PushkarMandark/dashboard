"use client";

import { usePathname } from "next/navigation";

import Breadcrumb from "@/components/features/Breadcrumb";
import { getNavigationInfo } from "@/utils/navigation";

const PageHeader = () => {
  const pathname = usePathname();
  const navInfo = getNavigationInfo(pathname);

  if (!navInfo) return null;

  return (
    <div className="flex items-center justify-between  mb-6  ">
      <h1 className="text-2xl font-semibold text-gray-900">{navInfo.title}</h1>
      <Breadcrumb items={navInfo.breadcrumbs} />
    </div>
  );
};

export default PageHeader;
