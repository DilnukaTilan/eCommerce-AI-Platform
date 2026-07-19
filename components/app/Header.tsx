"use client";

import Link from "next/link";
import { Package, ShoppingBag, Sparkles, User } from "lucide-react";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";
import { useChatActions, useIsChatOpen } from "@/lib/store/chat-store-provider";

export function Header() {
  const { openCart } = useCartActions();
  const { openChat } = useChatActions();
  const isChatOpen = useIsChatOpen();
  const totalItems = useTotalItems();
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/40 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-950/40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 truncate">
            The Furniture Store
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isSignedIn && (
            <Button asChild className="w-8 p-0 sm:w-auto sm:px-2.5">
              <Link
                href="/orders"
                className="flex items-center justify-center gap-0 sm:gap-2"
              >
                <Package className="h-5 w-5" />
                <span className="hidden sm:inline text-sm font-medium">
                  My Orders
                </span>
              </Link>
            </Button>
          )}

          {!isChatOpen && (
            <Button
              onClick={openChat}
              className="group w-8 p-0 gap-0 sm:w-auto sm:px-2.5 sm:gap-2 bg-linear-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-30" />
              <span className="hidden sm:inline text-sm font-medium">
                Ask AI
              </span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="relative cursor-pointer"
            onClick={openCart}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
            <span className="sr-only">Open cart ({totalItems} items)</span>
          </Button>

          {isSignedIn ? (
            <UserButton
              afterSwitchSessionUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Orders"
                  labelIcon={<Package className="h-4 w-4" />}
                  href="/orders"
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <SignInButton mode="modal">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
