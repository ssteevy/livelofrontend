"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, Store, X } from "lucide-react";
import { FormEvent, useState } from "react";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/produits" },
  { label: "Devenir vendeur", href: "/devenir-vendeur" },
  { label: "Suivi commande", href: "/commandes" },
];

export function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();
    router.push(query ? `/produits?search=${encodeURIComponent(query)}` : "/produits");
    setMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-[#B3D4E5] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="relative block h-16 w-24 shrink-0 sm:h-20 sm:w-32 lg:h-24 lg:w-36" aria-label="Livelo Haiti accueil">
          <Image
            src="/livelo-logo-transparent.png"
            alt="Livelo Haiti"
            fill
            priority
            sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 96px"
            className="object-contain"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-bold text-[#4E73C7] transition hover:text-[#EDA415]">
              {item.label}
            </Link>
          ))}
        </div>

        <form onSubmit={submitSearch} className="hidden flex-1 max-w-sm items-center gap-2 lg:flex">
          <div className="relative w-full">
            <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un produit..."
              className="h-11 w-full rounded-2xl border border-[#B3D4E5] bg-[#F8FAFC] pl-10 pr-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Link href="/produits" aria-label="Produits" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#B3D4E5] text-[#4E73C7] transition hover:bg-[#E2F4FF] lg:hidden">
            <Search size={20} />
          </Link>
          <Link href="/devenir-vendeur" aria-label="Devenir vendeur" className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-[#B3D4E5] text-[#4E73C7] transition hover:bg-[#E2F4FF] sm:flex lg:hidden">
            <Store size={20} />
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4E73C7] text-white lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-[#B3D4E5] bg-white px-4 py-4 lg:hidden">
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
        </div>
      ) : null}
    </nav>
  );
}
