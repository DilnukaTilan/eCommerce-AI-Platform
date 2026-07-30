"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Leaf,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center justify-start sm:justify-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                <Truck className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Free Shipping
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  On all orders over $500
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start sm:justify-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                <Leaf className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Sustainable
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Ethically sourced woods
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start sm:justify-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                <ShieldCheck className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  10-Year Guarantee
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Built to last generations
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start sm:justify-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                <RefreshCw className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  30-Day Trial
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Hassle-free returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-4 lg:col-span-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                The Furniture Store
              </span>
            </Link>
            <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Thoughtfully designed, sustainably crafted furniture created for
              modern living spaces.
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-2">
                Join our newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 bg-white dark:bg-zinc-900 text-sm border-zinc-300 dark:border-zinc-800"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="group h-10 px-4 shrink-0 cursor-pointer"
                >
                  {subscribed ? (
                    <span className="flex items-center gap-1">
                      <Check className="h-4 w-4" /> Joined
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      Subscribe{" "}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:pl-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                Shop
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link
                    href="/?category=beds"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Beds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/?category=chairs"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Chairs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/?category=lighting"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Lighting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/?category=sofas"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Sofas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/?category=storage"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Storage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/?category=tables"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Tables
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    All Products
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                Customer Care
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link
                    href="/orders"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Order Status
                  </Link>
                </li>
                <li>
                  <a
                    href="#shipping"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Shipping & Delivery
                  </a>
                </li>
                <li>
                  <a
                    href="#returns"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a
                    href="#care"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Product Care
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                About
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a
                    href="#story"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="#sustainability"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Sustainability
                  </a>
                </li>
                <li>
                  <a
                    href="#craftsmanship"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Craftsmanship
                  </a>
                </li>
                <li>
                  <a
                    href="#showrooms"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Showrooms
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} The Furniture Store. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
            <a
              href="#privacy"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#cookies"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
