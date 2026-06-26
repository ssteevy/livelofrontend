import { features } from "@/data/home";
import { iconMap, fallbackIcon } from "@/components/cards/icon-map";
import { Reveal } from "@/components/ui/Reveal";

export function TrustStrip() {
  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon] ?? fallbackIcon;
          return (
            <Reveal key={feature.title} delay={index * 0.05}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-[#B3D4E5] bg-white p-4 transition hover:border-[#4E73C7]/40 hover:shadow-[0_12px_30px_rgba(78,115,199,0.10)]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E2F4FF] text-[#4E73C7]">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <span>
                  <span className="block text-sm font-black text-[#4E73C7]">{feature.title}</span>
                  <span className="mt-0.5 block text-xs font-semibold leading-5 text-[#ACACAC]">{feature.description}</span>
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
