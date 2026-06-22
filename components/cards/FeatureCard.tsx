import type { Feature } from "@/data/home";
import { iconMap } from "@/components/cards/icon-map";

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = iconMap[feature.icon];

  return (
    <article className="rounded-3xl border border-[#B3D4E5] bg-white p-6 shadow-[0_18px_55px_rgba(78,115,199,0.10)] transition duration-200 hover:-translate-y-1 hover:border-[#EDA415]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E2F4FF] text-[#4E73C7]">
        <Icon aria-hidden="true" size={23} />
      </div>
      <h3 className="mt-5 text-lg font-black text-[#4E73C7]">{feature.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#ACACAC]">{feature.description}</p>
    </article>
  );
}
