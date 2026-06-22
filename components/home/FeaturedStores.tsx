import { stores } from "@/data/home";
import { StoreCard } from "@/components/cards/StoreCard";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedStores() {
  return (
    <section id="boutiques" className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm font-black uppercase text-[#EDA415]">Boutiques en vedette</p>
          <h2 className="mt-2 text-3xl font-black text-[#4E73C7] sm:text-4xl">Des vendeurs locaux prêts à livrer</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {stores.map((store, index) => (
            <Reveal key={store.name} delay={index * 0.05}>
              <StoreCard store={store} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
