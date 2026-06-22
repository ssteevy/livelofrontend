import { MapPin, Search, SlidersHorizontal } from "lucide-react";

export function SearchBar() {
  return (
    <section id="recherche" className="bg-[#F8FAFC] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto -mt-8 max-w-6xl rounded-3xl border border-[#B3D4E5] bg-white p-4 shadow-[0_24px_80px_rgba(78,115,199,0.16)]">
        <form className="grid gap-3 lg:grid-cols-[1fr_190px_190px_160px_auto]" aria-label="Recherche marketplace Livelo">
          <label className="relative">
            <span className="sr-only">Recherche</span>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4E73C7]" size={20} />
            <input className="h-14 w-full rounded-2xl border border-[#B3D4E5] bg-[#F8FAFC] pl-12 pr-4 text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none" placeholder="Que recherchez-vous aujourd'hui ?" />
          </label>
          {["Catégorie", "Département", "Ville"].map((label) => (
            <label key={label} className="relative">
              <span className="sr-only">{label}</span>
              <select className="h-14 w-full appearance-none rounded-2xl border border-[#B3D4E5] bg-[#F8FAFC] px-4 text-sm font-bold text-[#4E73C7] focus:border-[#4E73C7] focus:outline-none">
                <option>{label}</option>
              </select>
              <MapPin className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={16} />
            </label>
          ))}
          <button className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#EDA415] px-6 text-sm font-black text-white transition hover:bg-[#EDA415]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4E73C7]">
            <SlidersHorizontal aria-hidden="true" size={18} />
            Rechercher
          </button>
        </form>
      </div>
    </section>
  );
}
