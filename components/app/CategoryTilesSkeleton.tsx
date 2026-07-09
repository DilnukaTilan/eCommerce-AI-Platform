import { Skeleton } from "@/components/ui/skeleton";

export function CategoryTilesSkeleton() {
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto py-4 px-1 -mx-1 scrollbar-hide">
        <div className="shrink-0 overflow-hidden rounded-xl">
          <Skeleton className="h-36 w-56 sm:h-56 sm:w-80" />
        </div>

        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="shrink-0 overflow-hidden rounded-xl">
            <Skeleton className="h-36 w-56 sm:h-56 sm:w-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
