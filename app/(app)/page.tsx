import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries/categories";

export default async function HomePage() {
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  return (
    <div className="">
      Hello, World!
      <Button>Click me</Button>
    </div>
  );
}
