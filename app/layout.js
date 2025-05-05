"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

import ErrorBoundary from "@/components/ErrorBoundary";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased font-poppins bg-background min-h-screen`}>
        <ErrorBoundary fallback="An error occurred. Please try again later.">
          <Provider store={store}>
            {children}
          </Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
}





