import { Skeleton } from "@/components/ui/skeleton";

export function CategoryTilesSkeleton() {
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto py-4 px-1 -mx-1 scrollbar-hide">
        <div className="relative h-36 w-56 shrink-0 overflow-hidden rounded-xl sm:h-56 sm:w-80">
          <Skeleton className="h-full w-full" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <Skeleton className="h-5 w-28 opacity-60" />
          </div>
        </div>

        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="relative h-36 w-56 shrink-0 overflow-hidden rounded-xl sm:h-56 sm:w-80"
          >
            <Skeleton className="h-full w-full" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <Skeleton className="h-5 w-20 opacity-60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
