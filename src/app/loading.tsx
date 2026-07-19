import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <Container size="wide" className="py-16">
      <div className="space-y-10">
        {/* Hero skeleton */}
        <div className="space-y-4 text-center">
          <Skeleton className="mx-auto h-10 w-72" />
          <Skeleton className="mx-auto h-5 w-96 max-w-full" />
          <div className="flex justify-center gap-3 pt-2">
            <Skeleton className="h-11 w-36 rounded-full" />
            <Skeleton className="h-11 w-36 rounded-full" />
          </div>
        </div>

        {/* Featured card skeleton */}
        <Skeleton className="h-64 w-full rounded-2xl" />

        {/* Article grid skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-border p-2">
              <Skeleton className="aspect-[16/10] w-full rounded-lg" />
              <Skeleton className="mx-3 h-4 w-20" />
              <Skeleton className="mx-3 h-5 w-full" />
              <Skeleton className="mx-3 h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
