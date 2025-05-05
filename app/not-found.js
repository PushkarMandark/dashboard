"use client";
import { Home, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Optional: Add your logo */}
        <div className="flex justify-center">
          <Image src="/images/logo.png" alt="Logo" width={120} height={36} className="mb-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="default"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Home Page
            </Link>
          </Button>
        </div>

        {/* Optional: Add a search suggestion */}
        <p className="text-sm text-muted-foreground pt-8">
          Looking for something specific? Try using the search at the top of the page.
        </p>
      </div>
    </div>
  );
}
