import Link from "next/link";

import { categories } from "@/data/home";
import { iconMap, fallbackIcon } from "@/components/cards/icon-map";
import { Reveal } from "@/components/ui/Reveal";

export function CategoriesSection() {
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

        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-10">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] ?? fallbackIcon;
            return (
              <Reveal key={category.name} delay={index * 0.03}>
                <Link
                  href={`/produits?categorie=${encodeURIComponent(category.name)}`}
                  className="group flex w-20 shrink-0 flex-col items-center gap-2 sm:w-auto"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#B3D4E5] bg-white text-[#4E73C7] shadow-[0_4px_14px_rgba(78,115,199,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#EDA415] group-hover:bg-[#EDA415] group-hover:text-white sm:h-20 sm:w-20">
                    <Icon aria-hidden="true" size={28} strokeWidth={1.8} />
                  </span>
                  <span className="line-clamp-2 text-center text-[11px] font-bold leading-tight text-[#4E73C7] sm:text-xs">
                    {category.name}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
