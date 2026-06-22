import Image from "next/image";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";

const navItems = [
  { label: "Accueil", href: "#" },
  { label: "Catégories", href: "#categories" },
  { label: "Boutiques", href: "#boutiques" },
  { label: "Devenir vendeur", href: "#vendeur" },
  { label: "Suivi commande", href: "#suivi" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-[#B3D4E5] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="relative block h-16 w-24 shrink-0 sm:h-20 sm:w-32 lg:h-24 lg:w-36" aria-label="Livelo Haiti accueil">
          <Image
            src="/livelo-logo-transparent.png"
            alt="Livelo Haiti"
            fill
            priority
            sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 96px"
            className="object-contain"
          />
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm font-bold text-[#4E73C7] transition hover:text-[#EDA415]">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#recherche" aria-label="Recherche" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#B3D4E5] text-[#4E73C7] transition hover:bg-[#E2F4FF]">
            <Search size={20} />
          </a>
          <a href="#panier" aria-label="Panier" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#B3D4E5] text-[#4E73C7] transition hover:bg-[#E2F4FF]">
            <ShoppingCart size={20} />
          </a>
          <a href="#profil" aria-label="Profil" className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-[#B3D4E5] text-[#4E73C7] transition hover:bg-[#E2F4FF] sm:flex">
            <CircleUserRound size={20} />
          </a>
          <button aria-label="Ouvrir le menu" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4E73C7] text-white lg:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
