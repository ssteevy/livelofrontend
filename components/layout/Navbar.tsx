"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, LogIn, Menu, Search, ShoppingCart, Store, UserRound, X } from "lucide-react";
import { FormEvent, useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { useCart } from "@/components/cart/CartProvider";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/produits" },
  { label: "Devenir vendeur", href: "/devenir-vendeur" },
  { label: "Suivi commande", href: "/commandes" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { status, user } = useAuth();
  const { count } = useCart();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthed = status === "authenticated";
  const initials = [user?.prenom?.[0], user?.nom?.[0]].filter(Boolean).join("").toUpperCase() || "L";

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();
    router.push(query ? `/produits?search=${encodeURIComponent(query)}` : "/produits");
    setMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-[#B3D4E5] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6 lg:px-8">
        <Link href="/" className="relative block h-12 w-20 shrink-0 sm:h-14 sm:w-24 lg:h-16 lg:w-28" aria-label="Livelo Haiti accueil">
          <Image src="/livelo-logo-transparent.png" alt="Livelo Haiti" fill priority sizes="112px" className="object-contain" />
        </Link>

        {/* Recherche — pièce maîtresse, centrée */}
        <form onSubmit={submitSearch} className="relative hidden flex-1 lg:block">
          <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={20} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher un produit, une marque, une boutique..."
            className="h-12 w-full rounded-2xl border border-[#B3D4E5] bg-[#F8FAFC] pl-12 pr-28 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] transition focus:border-[#4E73C7] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4E73C7]/10"
          />
          <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-xl bg-[#EDA415] px-4 py-2 text-xs font-black text-white transition hover:bg-[#EDA415]/90">
            Rechercher
          </button>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/panier"
            aria-label="Panier"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#B3D4E5] text-[#4E73C7] transition hover:bg-[#E2F4FF]"
          >
            <ShoppingCart size={20} />
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EDA415] px-1 text-[10px] font-black text-white">
                {count > 99 ? "99+" : count}
              </span>
            ) : null}
          </Link>
          {isAuthed ? (
            <Link href="/profil" className="hidden items-center gap-2 rounded-2xl border border-[#B3D4E5] bg-white px-3 py-2 text-sm font-black text-[#4E73C7] transition hover:bg-[#E2F4FF] sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4E73C7] text-xs font-black text-white">{initials}</span>
              <span className="max-w-24 truncate">{user?.prenom || "Mon compte"}</span>
            </Link>
          ) : (
            <>
              <Link href="/connexion" className="hidden rounded-2xl border border-[#B3D4E5] bg-white px-4 py-2.5 text-sm font-black text-[#4E73C7] transition hover:bg-[#E2F4FF] sm:inline-flex">
                Connexion
              </Link>
              <Link href="/inscription" className="hidden rounded-2xl bg-[#EDA415] px-4 py-2.5 text-sm font-black text-white shadow-[0_8px_24px_rgba(237,164,21,0.32)] transition hover:bg-[#EDA415]/90 sm:inline-flex">
                Inscription
              </Link>
            </>
          )}

          {/* Compte mobile */}
          <Link
            href={isAuthed ? "/profil" : "/connexion"}
            aria-label={isAuthed ? "Mon compte" : "Connexion"}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#B3D4E5] text-[#4E73C7] transition hover:bg-[#E2F4FF] sm:hidden"
          >
            {isAuthed ? <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4E73C7] text-xs font-black text-white">{initials}</span> : <UserRound size={20} />}
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4E73C7] text-white transition active:scale-95 lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Liens — desktop */}
      <div className="mx-auto hidden max-w-7xl items-center gap-1 px-8 pb-2 lg:flex">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative rounded-xl px-3 py-1.5 text-sm font-bold transition ${
                active ? "text-[#EDA415]" : "text-[#4E73C7] hover:text-[#EDA415]"
              }`}
            >
              {item.label}
              {active ? <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[#EDA415]" /> : null}
            </Link>
          );
        })}
      </div>

      {/* Drawer mobile animé */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[#B3D4E5] bg-white lg:hidden"
          >
            <div className="px-4 py-4">
              <form onSubmit={submitSearch} className="relative mb-3">
                <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Rechercher un produit..."
                  className="h-11 w-full rounded-2xl border border-[#B3D4E5] bg-[#F8FAFC] pl-10 pr-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none"
                />
              </form>
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-bold text-[#4E73C7] transition hover:bg-[#E2F4FF]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              {!isAuthed ? (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link href="/connexion" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 rounded-2xl border border-[#B3D4E5] py-3 text-sm font-black text-[#4E73C7]">
                    <LogIn size={17} /> Connexion
                  </Link>
                  <Link href="/inscription" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 rounded-2xl bg-[#EDA415] py-3 text-sm font-black text-white">
                    <Store size={17} /> Inscription
                  </Link>
                </div>
              ) : (
                <Link href="/profil" onClick={() => setMenuOpen(false)} className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-[#4E73C7] py-3 text-sm font-black text-white">
                  <LayoutGrid size={17} /> Mon espace
                </Link>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
