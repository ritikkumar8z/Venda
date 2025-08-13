import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartStore } from '../type/index';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),

      removeItem: (id: number) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id: number, quantity: number) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.id !== id),
            };
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      hasItem: (id: number) => get().items.some((item) => item.id === id),
    }),
    { name: 'cart-storage' }
  )
);
