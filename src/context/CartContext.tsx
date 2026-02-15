"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ShopifyProduct } from "@/lib/shopify";

interface CartItem extends ShopifyProduct {
    quantity: number;
}

interface CartContextType {
    isCartOpen: boolean;
    toggleCart: () => void;
    cart: CartItem[];
    addToCart: (product: ShopifyProduct) => void;
    removeFromCart: (productId: string) => void;
    itemCount: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    // Determine if we need to persist state (optional for now)
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    const addToCart = (product: ShopifyProduct) => {
        setCart((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Calculate subtotal assuming price is in 'amount' string
    const subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.priceRange.minVariantPrice.amount);
        return total + price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                isCartOpen,
                toggleCart,
                cart,
                addToCart,
                removeFromCart,
                itemCount,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
