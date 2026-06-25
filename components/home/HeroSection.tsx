import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { iconMap } from "@/components/cards/icon-map";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/data/home";

export function HeroSection() {
  return (
    <section className="w-full bg-[#F8FAFC] px-4 pb-4 pt-5 sm:px-6 lg:px-8">
      <Reveal className="grid w-full items-stretch gap-5 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="order-2 rounded-2xl border border-[#B3D4E5] bg-white p-3 shadow-[0_20px_55px_rgba(78,115,199,0.10)] lg:order-1 lg:min-h-full lg:p-4">
          <div className="flex items-center justify-between px-2 pb-3">
            <p className="text-sm font-black uppercase text-[#EDA415]">Catalogue</p>
            <a href="#produits" className="text-xs font-black text-[#4E73C7] hover:text-[#EDA415]">
              Tout voir
            </a>
          </div>

          <nav aria-label="Catalogue Livelo" className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
            {categories.map((category) => {
              const Icon = iconMap[category.icon];

              return (
                <a
                  key={category.name}
                  href="#produits"
                  className="group flex min-w-[220px] items-center justify-between gap-3 rounded-xl border border-[#E2F4FF] bg-[#F8FAFC] px-3 py-3 text-left transition hover:border-[#EDA415] hover:bg-white lg:min-w-0 lg:border-transparent lg:bg-white"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E2F4FF] text-[#4E73C7] transition group-hover:bg-[#4E73C7] group-hover:text-white">
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-black text-[#4E73C7]">{category.name}</span>
                      <span className="block truncate text-xs font-semibold text-[#ACACAC]">{category.description}</span>
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" size={16} className="hidden shrink-0 text-[#ACACAC] lg:block" />
                </a>
              );
            })}
          </nav>
        </aside>

        <div className="order-1 overflow-hidden rounded-2xl border border-[#B3D4E5] bg-white shadow-[0_24px_70px_rgba(78,115,199,0.14)] lg:order-2">
          <div className="relative aspect-[1.78] min-h-[300px] w-full sm:min-h-[420px] lg:min-h-[560px]">
            <Image
              src="/livelo-hero-marketplace.png"
              alt="Livelo Haiti, marketplace de produits livrés partout en Haïti"
              fill
              priority
              sizes="(min-width: 1280px) calc(100vw - 384px), (min-width: 1024px) calc(100vw - 344px), 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
