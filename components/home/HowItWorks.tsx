import { CreditCard, PackageCheck, ShoppingBag, Truck } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { title: "Choisir un produit", description: "Parcourez les offres disponibles dans votre ville.", icon: ShoppingBag },
  { title: "Commander", description: "Validez le panier avec le total produit et livraison.", icon: PackageCheck },
  { title: "Payer via MonCash", description: "Le paiement est sécurisé dans l'escrow Livelo.", icon: CreditCard },
  { title: "Recevoir la livraison", description: "Suivez le livreur puis confirmez la réception.", icon: Truck },
];

export function HowItWorks() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase text-[#EDA415]">Comment ça fonctionne</p>
          <h2 className="mt-2 text-3xl font-black text-[#4E73C7] sm:text-4xl">Du catalogue à la livraison en 4 étapes</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 0.05}>
                <article className="relative h-full rounded-3xl border border-[#B3D4E5] bg-[#F8FAFC] p-6">
                  <span className="absolute right-5 top-5 text-5xl font-black text-[#E2F4FF]">{index + 1}</span>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4E73C7] text-white">
                    <Icon aria-hidden="true" size={22} />
                  </div>
                  <h3 className="relative mt-6 text-lg font-black text-[#4E73C7]">{step.title}</h3>
                  <p className="relative mt-2 text-sm leading-6 text-[#ACACAC]">{step.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
