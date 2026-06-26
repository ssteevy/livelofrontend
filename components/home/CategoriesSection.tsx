import Link from "next/link";

import { categories } from "@/data/home";
import { iconMap, fallbackIcon } from "@/components/cards/icon-map";
import { Reveal } from "@/components/ui/Reveal";

export function CategoriesSection() {
  // Dupliqué pour un défilement infini fluide.
  const loop = [...categories, ...categories];

  return (
    <section id="categories" className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#EDA415]">Catégories</p>
            <h2 className="mt-1 text-2xl font-black text-[#4E73C7] sm:text-3xl">Acheter par catégorie</h2>
          </div>
          <Link href="/produits" className="hidden text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415] sm:block">
            Tout voir
          </Link>
        </Reveal>

        {/* Bandeau circulaire défilant (pause au survol) */}
        <div className="group relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#F8FAFC] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#F8FAFC] to-transparent" />

          <div className="flex w-max animate-marquee gap-5 py-2 group-hover:[animation-play-state:paused] sm:gap-7">
            {loop.map((category, index) => {
              const Icon = iconMap[category.icon] ?? fallbackIcon;
              return (
                <Link
                  key={`${category.name}-${index}`}
                  href={`/produits?categorie=${encodeURIComponent(category.name)}`}
                  className="group/item flex w-20 shrink-0 flex-col items-center gap-2 sm:w-24"
                  aria-label={category.name}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#B3D4E5] bg-white text-[#4E73C7] shadow-[0_6px_18px_rgba(78,115,199,0.10)] transition-all duration-300 group-hover/item:-translate-y-1 group-hover/item:border-[#EDA415] group-hover/item:bg-[#EDA415] group-hover/item:text-white sm:h-20 sm:w-20">
                    <Icon aria-hidden="true" size={28} strokeWidth={1.8} />
                  </span>
                  <span className="line-clamp-2 text-center text-[11px] font-bold leading-tight text-[#4E73C7] sm:text-xs">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
