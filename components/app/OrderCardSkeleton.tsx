import { Skeleton } from "@/components/ui/skeleton";

interface OrderCardSkeletonProps {
  count?: number;
}

export function OrderCardSkeleton({ count = 3 }: OrderCardSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex gap-5 p-5">
            <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />

            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="mt-1 h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-20 shrink-0 rounded-full" />
              </div>

              <div className="mt-2 flex items-end justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-7 w-20" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
            <Skeleton className="h-4 w-44" />
            <div className="flex shrink-0 items-center gap-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4 shrink-0 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
