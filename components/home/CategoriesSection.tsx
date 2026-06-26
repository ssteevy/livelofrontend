import Link from "next/link";

import { categories } from "@/data/home";
import { Reveal } from "@/components/ui/Reveal";

export function CategoriesSection() {
  return (
    <section id="categories" className="w-full bg-[#F8FAFC] px-4 pb-6 sm:px-6 lg:px-8">
      <div className="w-full overflow-hidden rounded-2xl border border-[#B3D4E5] bg-white shadow-[0_18px_50px_rgba(78,115,199,0.08)]">
        <Reveal className="flex items-center gap-5 overflow-x-auto px-4 py-4 sm:px-5">
          <p className="shrink-0 text-sm font-black uppercase text-[#EDA415]">Catégories</p>
          <div className="flex min-w-max items-center gap-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/produits?categorie=${encodeURIComponent(category.name)}`}
                className="shrink-0 rounded-full border border-[#B3D4E5] bg-[#F8FAFC] px-4 py-2 text-sm font-black text-[#4E73C7] transition hover:border-[#EDA415] hover:text-[#EDA415]"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
