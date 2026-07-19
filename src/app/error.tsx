"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <Container size="narrow" className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h1 className="mt-6 text-3xl font-extrabold text-foreground sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again or head back to the homepage.
      </p>
      <Button className="mt-8" onClick={reset}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </Container>
  );
}
