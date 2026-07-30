"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartActions } from "@/lib/store/cart-store-provider";
import { AddToCartButton } from "@/components/app/AddToCartButton";
import { StockBadge } from "@/components/app/StockBadge";
import { cn, formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/lib/store/cart-store";
import type { StockInfo } from "@/lib/hooks/useCartStock";

interface CartItemProps {
  item: CartItemType;
  stockInfo?: StockInfo;
}

export function CartItem({ item, stockInfo }: CartItemProps) {
  const { removeItem } = useCartActions();
  const isOutOfStock = stockInfo?.isOutOfStock ?? false;
  const exceedsStock = stockInfo?.exceedsStock ?? false;
  const currentStock = stockInfo?.currentStock ?? 999;
  const hasIssue = isOutOfStock || exceedsStock;

  return (
    <div
      className={cn(
        "flex gap-4 py-4",
        hasIssue && "rounded-lg bg-red-50 p-3 dark:bg-red-950/30",
      )}
    >
      <div
        className={cn(
          "relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800",
          isOutOfStock && "opacity-50",
        )}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2 min-w-0">
          <Link
            href={`/products/${item.productId}`}
            className={cn(
              "font-medium text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300 line-clamp-2 min-w-0",
              isOutOfStock && "text-zinc-400 dark:text-zinc-500",
            )}
          >
            {item.name}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-zinc-400 hover:text-red-500"
            onClick={() => removeItem(item.productId)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove {item.name}</span>
          </Button>
        </div>

        <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {formatPrice(item.price)}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <StockBadge productId={item.productId} stock={currentStock} />
          {!isOutOfStock && (
            <div className="w-28 sm:w-32 shrink-0 ml-auto">
              <AddToCartButton
                productId={item.productId}
                name={item.name}
                price={item.price}
                image={item.image}
                stock={currentStock}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
