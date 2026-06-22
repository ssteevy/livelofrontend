import { Clock3 } from "lucide-react";

import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/data/home";

export function FlashDeals() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-6 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-[#B3D4E5] bg-white shadow-[0_18px_55px_rgba(78,115,199,0.10)]">
        <div className="flex flex-col gap-3 bg-[#EDA415] px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Clock3 aria-hidden="true" size={20} />
            <h2 className="text-lg font-black">Offres du moment</h2>
          </div>
          <a href="#produits" className="text-sm font-black hover:text-[#E2F4FF]">
            Voir toutes les offres
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 p-4 md:grid-cols-3 xl:grid-cols-6">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
