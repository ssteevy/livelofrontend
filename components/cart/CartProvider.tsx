"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import type { Product } from "@/lib/products";

export interface CartItem {
  productId: string;
  titre: string;
  image: string | null;
  prix: number;
  shopId: string;
  shopNom: string;
  stock: number;
  quantite: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: Product, quantite?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantite: number) => void;
  clear: () => void;
}

const CART_KEY = "livelo.cart";
const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    void Promise.resolve().then(() => {
      setItems(readCart());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((product: Product, quantite = 1) => {
    const unitPrice = product.prix_promo && product.prix_promo < product.prix ? product.prix_promo : product.prix;
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantite: Math.min(item.stock || 99, item.quantite + quantite) }
            : item,
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          titre: product.titre,
          image: product.images?.[0] ?? null,
          prix: unitPrice,
          shopId: product.shop_id,
          shopNom: product.shops?.nom ?? "Boutique",
          stock: product.stock,
          quantite: Math.min(product.stock || 99, quantite),
        },
      ];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantite: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.productId === productId ? { ...item, quantite } : item))
        .filter((item) => item.quantite > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantite, 0);
    const subtotal = items.reduce((sum, item) => sum + item.prix * item.quantite, 0);
    return { items, count, subtotal, add, remove, setQuantity, clear };
  }, [items, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans CartProvider");
  return context;
}
