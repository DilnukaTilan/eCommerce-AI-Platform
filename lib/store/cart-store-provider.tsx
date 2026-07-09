"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { useStore } from "zustand";
import {
  createCartStore,
  type CartStore,
  type CartState,
  defaultInitState,
} from "./cart-store";

export type CartStoreApi = ReturnType<typeof createCartStore>;

const CartStoreContext = createContext<CartStoreApi | undefined>(undefined);

interface CartStoreProviderProps {
  children: ReactNode;
  initialState?: CartState;
}

export const CartStoreProvider = ({
  children,
  initialState,
}: CartStoreProviderProps) => {
  const storeRef = useRef<CartStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createCartStore(initialState ?? defaultInitState);
  }

  useEffect(() => {
    storeRef.current?.persist.rehydrate();
  }, []);

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);

  if (!cartStoreContext) {
    throw new Error("useCartStore must be used within CartStoreProvider");
  }

  return useStore(cartStoreContext, selector);
};

export const useCartItems = () => useCartStore((state) => state.items);
export const useCartIsOpen = () => useCartStore((state) => state.isOpen);

export const useTotalItems = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

export const useTotalPrice = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

export const useCartItem = (productId: string) =>
  useCartStore((state) =>
    state.items.find((item) => item.productId === productId),
  );

export const useCartActions = () => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);

  return {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };
};
