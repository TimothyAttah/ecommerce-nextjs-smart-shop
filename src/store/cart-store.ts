import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartStore } from "@/types";

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item: CartItem) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: (id: string) =>
        set((state: CartStore) => {
          return {
            items: state.items
              .map((item: CartItem) =>
                item.id === id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              )
              .filter((item: CartItem) => item.quantity > 0),
          };
        }),
      clearCart: () =>
        set(() => {
          return { items: [] };
        }),
    }),
    { name: "cart" },
  ),
);
