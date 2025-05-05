"use client";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import PageHeader from "@/components/PageHeader";

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