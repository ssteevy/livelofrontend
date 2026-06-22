import type { Category } from "@/data/home";
import { iconMap } from "@/components/cards/icon-map";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon];

  return (
    <article className="group flex min-h-36 flex-col justify-between rounded-3xl border border-[#B3D4E5] bg-white p-5 shadow-[0_18px_50px_rgba(78,115,199,0.10)] transition duration-200 hover:-translate-y-1 hover:border-[#4E73C7]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E2F4FF] text-[#4E73C7] transition group-hover:bg-[#4E73C7] group-hover:text-white">
        <Icon aria-hidden="true" size={22} />
      </div>
      <div>
        <h3 className="text-base font-bold text-[#4E73C7]">{category.name}</h3>
        <p className="mt-1 text-sm leading-6 text-[#ACACAC]">{category.description}</p>
      </div>
    </article>
  );
}
