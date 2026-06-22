import { MapPin } from "lucide-react";

import { departments } from "@/data/home";
import { Reveal } from "@/components/ui/Reveal";

export function DeliveryCoverage() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="text-sm font-black uppercase text-[#EDA415]">Couverture nationale</p>
          <h2 className="mt-2 text-3xl font-black text-[#4E73C7] sm:text-4xl">Livraison par ville, pensée pour les 10 départements</h2>
          <p className="mt-4 text-base leading-7 text-[#ACACAC]">
            Chaque vendeur configure ses zones et prix de livraison en HTG. Les acheteurs voient uniquement les produits disponibles dans leur ville.
          </p>
          <div className="mt-6 rounded-3xl border border-[#B3D4E5] bg-white p-5">
            <p className="text-sm font-bold text-[#4E73C7]">Villes pilotes</p>
            <p className="mt-2 text-sm leading-7 text-[#ACACAC]">Port-au-Prince, Cap-Haïtien, Les Cayes, Pétion-Ville, Delmas, Jacmel et Gonaïves.</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#B3D4E5] bg-white p-6 shadow-[0_24px_80px_rgba(78,115,199,0.14)]">
            <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[#E2F4FF]" />
            <div className="absolute bottom-8 left-8 h-20 w-20 rounded-full bg-[#EDA415]/20" />
            <div className="relative mx-auto flex min-h-[360px] max-w-lg items-center justify-center">
              <div className="h-72 w-48 rotate-[-10deg] rounded-[48%_52%_55%_45%/42%_47%_53%_58%] border-2 border-[#4E73C7] bg-[#E2F4FF] shadow-[0_18px_55px_rgba(78,115,199,0.18)]" />
              <div className="absolute h-48 w-32 rotate-[13deg] rounded-[45%_55%_50%_50%/55%_45%_55%_45%] border-2 border-[#EDA415] bg-white" />
              {departments.slice(0, 6).map((department, index) => (
                <span
                  key={department}
                  className="absolute rounded-full bg-[#4E73C7] px-3 py-1 text-xs font-black text-white"
                  style={{
                    left: `${18 + (index % 3) * 25}%`,
                    top: `${20 + Math.floor(index / 3) * 28}%`,
                  }}
                >
                  {department}
                </span>
              ))}
            </div>
            <div className="relative grid gap-3 sm:grid-cols-2">
              {departments.map((department) => (
                <div key={department} className="flex items-center gap-2 rounded-2xl border border-[#B3D4E5] bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-[#4E73C7]">
                  <MapPin aria-hidden="true" size={16} className="text-[#EDA415]" />
                  {department}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
