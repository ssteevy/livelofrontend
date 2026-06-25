import { products } from "@/data/home";
import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export function PopularProducts() {
  return (
    <section id="produits" className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="w-full">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#EDA415]">Produits populaires</p>
            <h2 className="mt-2 text-3xl font-black text-[#4E73C7] sm:text-4xl">Les meilleures offres près de vous</h2>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7">
          {products.map((product, index) => (
            <Reveal key={product.name} delay={index * 0.03}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
