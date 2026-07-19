import Link from "next/link";
import { AddToCartButton } from "@/components/app/AddToCartButton";
import { AskAISimilarButton } from "@/components/app/AskAISimilarButton";
import { StockBadge } from "@/components/app/StockBadge";
import { formatPrice } from "@/lib/utils";
import type { PRODUCT_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

interface ProductInfoProps {
  product: NonNullable<PRODUCT_BY_SLUG_QUERY_RESULT>;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const imageUrl = product.images?.[0]?.asset?.url;

  return (
    <div className="flex flex-col">
      {product.category && (
        <Link
          href={`/?category=${product.category.slug}`}
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          {product.category.title}
        </Link>
      )}

      <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {product.name}
      </h1>

      <p className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {formatPrice(product.price)}
      </p>

      {product.description && (
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <StockBadge productId={product._id} stock={product.stock ?? 0} />
        <AddToCartButton
          productId={product._id}
          name={product.name ?? "Unknown Product"}
          price={product.price ?? 0}
          image={imageUrl ?? undefined}
          stock={product.stock ?? 0}
        />
        <AskAISimilarButton productName={product.name ?? "this product"} />
      </div>

      <div className="mt-6 space-y-2 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        {product.material && (
          <div className="flex justify-between gap-4 text-sm">
            <span className="shrink-0 text-zinc-500 dark:text-zinc-400">
              Material
            </span>
            <span className="text-right font-medium capitalize text-zinc-900 dark:text-zinc-100">
              {product.material}
            </span>
          </div>
        )}
        {product.color && (
          <div className="flex justify-between gap-4 text-sm">
            <span className="shrink-0 text-zinc-500 dark:text-zinc-400">
              Color
            </span>
            <span className="text-right font-medium capitalize text-zinc-900 dark:text-zinc-100">
              {product.color}
            </span>
          </div>
        )}
        {product.dimensions && (
          <div className="flex justify-between gap-4 text-sm">
            <span className="shrink-0 text-zinc-500 dark:text-zinc-400">
              Dimensions
            </span>
            <span className="text-right font-medium text-zinc-900 dark:text-zinc-100">
              {product.dimensions}
            </span>
          </div>
        )}
        {product.assemblyRequired !== null && (
          <div className="flex justify-between gap-4 text-sm">
            <span className="shrink-0 text-zinc-500 dark:text-zinc-400">
              Assembly
            </span>
            <span className="text-right font-medium text-zinc-900 dark:text-zinc-100">
              {product.assemblyRequired ? "Required" : "Not required"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
