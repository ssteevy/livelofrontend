import { MapPin, Star, Store } from "lucide-react";

import type { StoreItem } from "@/data/home";
import { Button } from "@/components/ui/Button";

export function StoreCard({ store }: { store: StoreItem }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-[#B3D4E5] bg-white shadow-[0_18px_55px_rgba(78,115,199,0.12)] transition duration-200 hover:-translate-y-1">
      <div className="h-24 bg-gradient-to-r from-[#4E73C7] via-[#E2F4FF] to-[#EDA415]" />
      <div className="p-5">
        <div className="-mt-12 mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border-4 border-white bg-[#4E73C7] text-white shadow-[0_14px_35px_rgba(78,115,199,0.24)]">
          <Store aria-hidden="true" size={26} />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-[#4E73C7]">{store.name}</h3>
            <p className="mt-1 text-sm text-[#ACACAC]">{store.specialty}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E2F4FF] px-3 py-1 text-sm font-bold text-[#EDA415]">
            <Star aria-hidden="true" size={15} fill="currentColor" />
            {store.rating}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#ACACAC]">
          <span className="flex items-center gap-2">
            <MapPin aria-hidden="true" size={16} className="text-[#4E73C7]" />
            {store.city}
          </span>
          <span>{store.products}</span>
        </div>
        <Button href="#boutiques" variant="outline" className="mt-5 w-full">
          Voir la boutique
        </Button>
      </div>
    </article>
  );
}
