"use client";

import React from "react";

import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import SubHeader from "@/components/layout/SubHeader";

const AppLayout = ({
  children,
  showHeader = true,
  showSubHeader = true,
  showPageHeader = true,
  containerClass = "container-custom py-6",
}) => (
  <>
    {(showHeader || showSubHeader) && (
      <div className="sticky top-0 z-50 w-full bg-white">
        <div className="w-full">
          {showHeader && <Header />}
          {showSubHeader && <SubHeader isMobileView={false} />}
        </div>
      </div>
    )}
    <main className={containerClass}>
      {showPageHeader && <PageHeader />}
      {children}
    </main>
  </>
);

export default AppLayout;
