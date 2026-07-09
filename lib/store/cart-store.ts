import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface CartActions {
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
  items: [],
  isOpen: false,
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set) => ({
        ...initState,

        addItem: (item, quantity = 1) =>
          set((state) => {
            const existing = state.items.find(
              (i) => i.productId === item.productId,
            );
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.productId === item.productId
                    ? { ...i, quantity: i.quantity + quantity }
                    : i,
                ),
              };
            }
            return { items: [...state.items, { ...item, quantity }] };
          }),

        removeItem: (productId) =>
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          })),

        updateQuantity: (productId, quantity) =>
          set((state) => {
            if (quantity <= 0) {
              return {
                items: state.items.filter((i) => i.productId !== productId),
              };
            }
            return {
              items: state.items.map((i) =>
                i.productId === productId ? { ...i, quantity } : i,
              ),
            };
          }),

        clearCart: () => set({ items: [] }),
        toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
        openCart: () => set({ isOpen: true }),
        closeCart: () => set({ isOpen: false }),
      }),
      {
        name: "cart-storage",
        skipHydration: true,
        partialize: (state) => ({ items: state.items }),
      },
    ),
  );
};
