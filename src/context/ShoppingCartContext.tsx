import { createContext, useContext, ReactNode } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";

type ShoppingCartContextProps = {
    children: ReactNode;
};

export type CartItem = {
    id: string;
    quantity: number;
};

type ShoppingCartContextType = {
    getQuantity: (id: string) => number;
    addItem: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: (id: string) => void;
    cartQuantity: number;
    cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const useShoppingCart = () => useContext(ShoppingCartContext);

export const ShoppingCartProvider = ({ children }: ShoppingCartContextProps) => {
    const [cartItems, setCartItems] = useSessionStorage<CartItem[]>("cart", []);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const getQuantity = (id: string) => cartItems.find((item) => item.id === id)?.quantity ?? 0;

    const addItem = (id: string) =>
        setCartItems((currentItems) =>
            currentItems.some((item) => item.id === id)
                ? currentItems.map((item) => {
                      if (item.id === id) {
                          return { ...item, quantity: item.quantity + 1 };
                      }
                      return item;
                  })
                : [...currentItems, { id, quantity: 1 }]
        );

    const removeItem = (id: string) =>
        setCartItems((currentItems) =>
            currentItems.find((item) => item.id === id)?.quantity === 1
                ? currentItems.filter((item) => item.id !== id)
                : currentItems.map((item) => {
                      if (item.id === id) {
                          return { ...item, quantity: item.quantity - 1 };
                      }
                      return item;
                  })
        );

    const clearCart = (id: string) => setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));

    return (
        <ShoppingCartContext.Provider
            value={{
                getQuantity,
                addItem,
                removeItem,
                clearCart,
                cartItems,
                cartQuantity,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};
