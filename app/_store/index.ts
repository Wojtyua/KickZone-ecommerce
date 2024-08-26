import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  id: string;
  model: string;
  price: number;
  size: number;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Store
export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      items: [],
      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.size === item.size
          );
          if (existingItem) {
            // Jeśli przedmiot już istnieje, zwiększ jego ilość
            console.log("Updating existing item quantity", existingItem, item);
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          console.log("Adding new item to cart", item);
          // Dodaj nowy przedmiot do koszyka
          return { items: [...state.items, item] };
        });
      },
      removeItem: (id: string) => {
        console.log("Removing item from cart", id);
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id: string, quantity: number) => {
        console.log("Updating item quantity", id, quantity);
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => {
        console.log("Clearing cart");
        set({ items: [] });
      },
    }),
    {
      name: "cartStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
