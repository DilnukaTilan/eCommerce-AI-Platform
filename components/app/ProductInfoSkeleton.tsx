import { Skeleton } from "@/components/ui/skeleton";

export function ProductInfoSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-4 w-24" />

      <Skeleton className="mt-2 h-9 w-3/4" />

      <Skeleton className="mt-4 h-8 w-28" />

      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>

      <div className="mt-6 space-y-2 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
