import {
  ArrowRight,
  Building2,
  ChevronRight,
  Headphones,
  MapPin,
  ShieldCheck,
  Store,
  Truck,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/data/home";

const heroStats = [
  { value: "1000+", label: "Produits" },
  { value: "100+", label: "Boutiques" },
  { value: "10", label: "Départements" },
  { value: "24h", label: "Suivi livraison" },
];

export function HeroSection() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-4 lg:grid-cols-[240px_1fr_260px]">
          <aside className="hidden rounded-2xl border border-[#B3D4E5] bg-white p-3 shadow-[0_18px_55px_rgba(78,115,199,0.10)] lg:block">
            <p className="px-3 pb-2 text-sm font-black uppercase text-[#4E73C7]">Catalogue</p>
            <div className="space-y-1">
              {categories.slice(0, 9).map((category) => (
                <a
                  key={category.name}
                  href="#categories"
                  className="flex min-h-10 items-center justify-between rounded-xl px-3 text-sm font-semibold text-[#4E73C7] transition hover:bg-[#E2F4FF]"
                >
                  <span className="truncate">{category.name}</span>
                  <ChevronRight aria-hidden="true" size={15} className="text-[#ACACAC]" />
                </a>
              ))}
            </div>
          </aside>

          <div className="overflow-hidden rounded-2xl bg-[#4E73C7] text-white shadow-[0_24px_80px_rgba(78,115,199,0.18)]">
            <div className="grid min-h-[360px] gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_260px] lg:p-10">
              <div className="flex flex-col justify-center">
                <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-white/10 px-4 py-2 text-sm font-bold text-[#E2F4FF]">
                  <ShieldCheck aria-hidden="true" size={17} />
                  Paiement MonCash sécurisé
                </p>
                <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
                  Achetez partout en Haïti, simplement et en toute confiance.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[#E2F4FF]">
                  Des boutiques locales, des prix de livraison par ville et un suivi temps réel, dans une marketplace pensée pour le marché haïtien.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button href="#produits" variant="accent">
                    Acheter maintenant
                    <ArrowRight aria-hidden="true" size={18} />
                  </Button>
                  <Button href="#vendeur" variant="ghost" className="border border-white/50">
                    Devenir vendeur
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/35 bg-white/10 p-4">
                    <p className="text-2xl font-black">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold text-[#E2F4FF]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              { title: "Centre d'aide", text: "Support acheteurs et vendeurs", icon: Headphones },
              { title: "Livraison par ville", text: "Prix transparents avant paiement", icon: Truck },
              { title: "Vendre sur Livelo", text: "Créez votre boutique locale", icon: Store },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.title === "Vendre sur Livelo" ? "#vendeur" : "#support"}
                  className="rounded-2xl border border-[#B3D4E5] bg-white p-5 shadow-[0_18px_55px_rgba(78,115,199,0.10)] transition hover:-translate-y-1 hover:border-[#EDA415]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E2F4FF] text-[#4E73C7]">
                    <Icon aria-hidden="true" size={21} />
                  </div>
                  <h2 className="mt-4 text-base font-black text-[#4E73C7]">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-[#ACACAC]">{item.text}</p>
                </a>
              );
            })}
          </aside>
        </Reveal>

        <Reveal delay={0.08} className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "MonCash", value: "Paiement mobile", icon: Wallet },
            { label: "10 départements", value: "Couverture nationale", icon: MapPin },
            { label: "Boutiques vérifiées", value: "Vendeurs locaux", icon: Building2 },
            { label: "Livraison suivie", value: "Tracking temps réel", icon: Truck },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-[#B3D4E5] bg-white p-4 shadow-[0_14px_40px_rgba(78,115,199,0.08)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E2F4FF] text-[#4E73C7]">
                  <Icon aria-hidden="true" size={19} />
                </span>
                <div>
                  <p className="text-sm font-black text-[#4E73C7]">{item.label}</p>
                  <p className="text-xs font-semibold text-[#ACACAC]">{item.value}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
