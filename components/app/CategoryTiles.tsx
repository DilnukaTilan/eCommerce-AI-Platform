"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Grid2x2, ChevronLeft, ChevronRight } from "lucide-react";
import type { ALL_CATEGORIES_QUERY_RESULT } from "@/sanity.types";

interface CategoryTilesProps {
  categories: ALL_CATEGORIES_QUERY_RESULT;
  activeCategory?: string;
}

export function CategoryTiles({
  categories,
  activeCategory,
}: CategoryTilesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group/scroll">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto py-4 px-1 -mx-1 scrollbar-hide"
      >
        <Link
          href="/"
          className={`group relative shrink-0 rounded-xl transition-all duration-300 ${
            !activeCategory
              ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-zinc-900"
              : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-2 dark:hover:ring-zinc-600 dark:hover:ring-offset-zinc-900"
          }`}
        >
          <div className="relative h-36 w-56 sm:h-56 sm:w-80 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-linear-to-br from-zinc-800 to-zinc-900 dark:from-zinc-700 dark:to-zinc-800" />

            <div className="absolute inset-0 flex items-center justify-center">
              <Grid2x2 className="h-12 w-12 text-white/60 transition-transform duration-300 group-hover:scale-110" />
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="text-base font-semibold text-white drop-shadow-md">
                All Products
              </span>
            </div>
          </div>
        </Link>

        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          const imageUrl = category.image?.asset?.url;

          return (
            <Link
              key={category._id}
              href={`/?category=${category.slug}`}
              className={`group relative shrink-0 rounded-xl transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-zinc-900"
                  : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-2 dark:hover:ring-zinc-600 dark:hover:ring-offset-zinc-900"
              }`}
            >
              <div className="relative h-36 w-56 sm:h-56 sm:w-80 overflow-hidden rounded-xl">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={category.title ?? "Category"}
                    fill
                    sizes="(max-width: 640px) 224px, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-amber-500 to-orange-600" />
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-base font-semibold text-white drop-shadow-md">
                    {category.title}
                  </span>
                </div>

                {isActive && (
                  <div className="absolute top-2 right-2">
                    <span className="flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll categories left"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-lg backdrop-blur-sm border border-zinc-200 transition-all duration-200 hover:bg-white hover:scale-110 hover:shadow-xl dark:bg-zinc-800/90 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800 opacity-0 group-hover/scroll:opacity-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll categories right"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-lg backdrop-blur-sm border border-zinc-200 transition-all duration-200 hover:bg-white hover:scale-110 hover:shadow-xl dark:bg-zinc-800/90 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800 opacity-0 group-hover/scroll:opacity-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
