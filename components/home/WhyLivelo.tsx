import { features } from "@/data/home";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";

export function WhyLivelo() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase text-[#EDA415]">Pourquoi Livelo</p>
          <h2 className="mt-2 text-3xl font-black text-[#4E73C7] sm:text-4xl">Une expérience pensée pour Haïti</h2>
          <p className="mt-4 text-base leading-7 text-[#ACACAC]">
            Livelo connecte acheteurs, vendeurs et livreurs avec des prix transparents, un paiement adapté et un suivi de livraison moderne.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.04}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
