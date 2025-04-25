"use client";

import { Button } from "@/components/ui/button";
import { useGetExampleQuery } from "@/lib/services/api";

export default function Home() {
  const { data, error, isLoading } = useGetExampleQuery();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <p>Data: {JSON.stringify(data)}</p>
            <Button>Default Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </>
        )}
      </div>
    </main>
  );
}



