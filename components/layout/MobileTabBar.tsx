"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, Store, UserRound } from "lucide-react";

import { useAuth } from "@/components/auth/AuthProvider";
import { useCart } from "@/components/cart/CartProvider";

export function MobileTabBar() {
  const pathname = usePathname();
  const { status } = useAuth();
  const { count } = useCart();
  const accountHref = status === "authenticated" ? "/profil" : "/connexion";

  const tabs = [
    { label: "Accueil", href: "/", icon: Home, badge: 0, match: (p: string) => p === "/" },
    { label: "Catalogue", href: "/produits", icon: Search, badge: 0, match: (p: string) => p.startsWith("/produits") },
    { label: "Panier", href: "/panier", icon: ShoppingCart, badge: count, match: (p: string) => p.startsWith("/panier") },
    { label: "Vendre", href: "/devenir-vendeur", icon: Store, badge: 0, match: (p: string) => p.startsWith("/devenir-vendeur") || p.startsWith("/vendeur") },
    { label: "Compte", href: accountHref, icon: UserRound, badge: 0, match: (p: string) => p.startsWith("/profil") || p.startsWith("/connexion") || p.startsWith("/commandes") },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#B3D4E5] bg-white/95 backdrop-blur-xl lg:hidden" aria-label="Navigation mobile">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.match(pathname);
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-2 text-[10px] font-bold transition ${active ? "text-[#EDA415]" : "text-[#ACACAC]"}`}
            >
              <span className={`relative flex h-8 w-8 items-center justify-center rounded-xl transition ${active ? "bg-[#EDA415]/10" : ""}`}>
                <Icon aria-hidden="true" size={19} />
                {tab.badge > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#EDA415] px-1 text-[9px] font-black text-white">
                    {tab.badge > 9 ? "9+" : tab.badge}
                  </span>
                ) : null}
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
