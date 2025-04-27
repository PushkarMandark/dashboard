"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import PageHeader from "@/components/PageHeader";
import ErrorBoundary from "@/components/ErrorBoundary";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased font-poppins`}>
        <ErrorBoundary fallback="An error occurred. Please try again later.">
          <Provider store={store}>
            <div className="sticky top-0 z-50 w-full bg-white">
              <div className="w-full">
                <Header />
                <SubHeader isMobileView={false} />
              </div>
            </div>
            <main className="container-custom">
              <PageHeader />
              {children}
            </main>
          </Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
}





