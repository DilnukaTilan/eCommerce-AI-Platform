import { Skeleton } from "@/components/ui/skeleton";

export function ProductGallerySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-square w-full rounded-lg" />

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
