import { categories } from "@/data/home";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { Reveal } from "@/components/ui/Reveal";

export function CategoriesSection() {
  return (
    <section id="categories" className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#EDA415]">Catégories</p>
            <h2 className="mt-2 text-3xl font-black text-[#4E73C7] sm:text-4xl">Explorez le marché local</h2>
          </div>
          <a href="#produits" className="font-bold text-[#4E73C7] hover:text-[#EDA415]">Voir tout</a>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => (
            <Reveal key={category.name} delay={index * 0.03}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
