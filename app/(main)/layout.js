"use client";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import SubHeader from "@/components/layout/SubHeader";

export default function MainLayout({ children }) {
  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-white">
        <div className="w-full">
          <Header />
          <SubHeader isMobileView={false} />
        </div>
      </div>
      <main className="container-custom py-6">
        <PageHeader />
        {children}
      </main>
    </>
  );
}
