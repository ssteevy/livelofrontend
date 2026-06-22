import { stats } from "@/data/home";
import { Reveal } from "@/components/ui/Reveal";

export function MarketplaceStats() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#B3D4E5] bg-white p-6 shadow-[0_24px_80px_rgba(78,115,199,0.14)] sm:p-8">
        <Reveal className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-sm font-black uppercase text-[#EDA415]">Statistiques marketplace</p>
            <h2 className="mt-2 text-3xl font-black text-[#4E73C7]">Des indicateurs orientés croissance</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-[#F8FAFC] p-5 text-center">
                <p className="text-3xl font-black text-[#4E73C7]">{stat.value}</p>
                <p className="mt-2 text-sm font-bold text-[#ACACAC]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
