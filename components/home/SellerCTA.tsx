import { BarChart3, Boxes, ClipboardList, MapPinned } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const sellerBenefits = [
  { label: "Gestion des produits", icon: Boxes },
  { label: "Gestion des commandes", icon: ClipboardList },
  { label: "Prix de livraison personnalisés", icon: MapPinned },
  { label: "Dashboard complet", icon: BarChart3 },
];

export function SellerCTA() {
  return (
    <section id="vendeur" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] bg-[#4E73C7] p-6 text-white shadow-[0_24px_90px_rgba(78,115,199,0.24)] sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase text-[#E2F4FF]">Espace vendeur</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Développez votre boutique avec Livelo</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#E2F4FF]">
            Créez votre boutique, ajoutez vos produits, définissez vos prix de livraison par ville et gérez vos commandes depuis un dashboard simple.
          </p>
          <Button href="#inscription" variant="accent" className="mt-7">
            Créer ma boutique
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {sellerBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.label} className="rounded-3xl border border-white/35 bg-white/10 p-5">
                <Icon aria-hidden="true" size={24} className="text-[#EDA415]" />
                <p className="mt-4 font-black">{benefit.label}</p>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
