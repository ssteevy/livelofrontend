import { Laptop, Monitor, Shirt, Smartphone, SprayCan, Utensils, Wind } from "lucide-react";

import type { Product } from "@/data/home";

const productVisuals: Record<Product["imageStyle"], { icon: typeof Smartphone; label: string }> = {
  appliance: { icon: Utensils, label: "Kitchen" },
  baby: { icon: Shirt, label: "Baby" },
  beauty: { icon: SprayCan, label: "Care" },
  fan: { icon: Wind, label: "Solar" },
  fashion: { icon: Shirt, label: "Mode" },
  grocery: { icon: Utensils, label: "Local" },
  home: { icon: Monitor, label: "Power" },
  laptop: { icon: Laptop, label: "Asus" },
  phone: { icon: Smartphone, label: "Mobile" },
  shoe: { icon: Shirt, label: "Sport" },
  sport: { icon: Shirt, label: "Sport" },
  tv: { icon: Monitor, label: "65 pouces" },
};

export function ProductCard({ product }: { product: Product }) {
  const VisualIcon = productVisuals[product.imageStyle].icon;
  const visualLabel = productVisuals[product.imageStyle].label;

  return (
    <article className="group bg-white transition duration-200 hover:-translate-y-1">
      <div className="relative flex aspect-[1.18] items-center justify-center overflow-hidden bg-white">
        <span className="absolute right-1 top-1 z-10 bg-[#EDA415]/10 px-2 py-1 text-xs font-black text-[#EDA415]">
          {product.discount}
        </span>
        <div className="relative flex h-[78%] w-[82%] items-center justify-center rounded-2xl bg-gradient-to-br from-[#E2F4FF] via-white to-[#B3D4E5]">
          <div className="absolute left-3 top-3 rounded-md bg-[#4E73C7] px-2 py-1 text-[10px] font-black text-white">
            {visualLabel}
          </div>
          <VisualIcon aria-hidden="true" className="text-[#4E73C7]" size={58} strokeWidth={1.8} />
          <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-[#EDA415]" />
        </div>
      </div>
      <div className="px-1 pb-2">
        <h3 className="line-clamp-2 min-h-11 text-sm font-semibold leading-5 text-[#4E73C7]" title={product.name}>
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-black leading-6 text-[#4E73C7]">{product.price}</p>
        <p className="text-xs font-semibold text-[#ACACAC] line-through">{product.oldPrice}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="truncate text-xs font-semibold text-[#ACACAC]">{product.city}</span>
          <span className="rounded-full bg-[#E2F4FF] px-2 py-1 text-[10px] font-black text-[#30BD57]">
            Livrable
          </span>
        </div>
      </div>
    </article>
  );
}
