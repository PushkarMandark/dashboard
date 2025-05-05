"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
            <Shield className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Unauthorized</h1>
          <div className="flex items-center justify-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="text-xl font-semibold">
              401 - Authentication Required
            </h2>
          </div>
          <p className="text-muted-foreground">
            Please log in to access this page. This area is restricted to authorized users only.
          </p>
        </div>

        <div className="pt-4">
          <Link href="/login">
            <Button className="px-8 py-2">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}