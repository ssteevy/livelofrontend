import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";

import type { Product } from "@/lib/products";
import { discountLabel, formatHtg } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images?.[0];
  const hasPromo = !!product.prix_promo && product.prix_promo < product.prix;
  const displayPrice = hasPromo ? product.prix_promo! : product.prix;
  const discount = discountLabel(product.prix, product.prix_promo);

  return (
    <Link
      href={`/produits/${product.id}`}
      className="group flex flex-col bg-white transition duration-200 hover:-translate-y-1"
    >
      <div className="relative flex aspect-[1.18] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#E2F4FF] via-white to-[#B3D4E5]">
        {discount ? (
          <span className="absolute right-1 top-1 z-10 rounded bg-[#EDA415]/10 px-2 py-1 text-xs font-black text-[#EDA415]">
            {discount}
          </span>
        ) : null}
        {cover ? (
          <Image
            src={cover}
            alt={product.titre}
            fill
            sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        ) : (
          <ImageIcon aria-hidden="true" className="text-[#4E73C7]/50" size={52} strokeWidth={1.6} />
        )}
      </div>
      <div className="px-1 pb-2 pt-2">
        <h3 className="line-clamp-2 min-h-11 text-sm font-semibold leading-5 text-[#4E73C7]" title={product.titre}>
          {product.titre}
        </h3>
        <p className="mt-1 text-lg font-black leading-6 text-[#4E73C7]">{formatHtg(displayPrice)}</p>
        {hasPromo ? (
          <p className="text-xs font-semibold text-[#ACACAC] line-through">{formatHtg(product.prix)}</p>
        ) : (
          <p className="text-xs font-semibold text-transparent">.</p>
        )}
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="truncate text-xs font-semibold text-[#ACACAC]">{product.shops?.nom ?? product.categorie}</span>
          {product.stock > 0 ? (
            <span className="shrink-0 rounded-full bg-[#E2F4FF] px-2 py-1 text-[10px] font-black text-[#30BD57]">
              En stock
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-[#ACACAC]/15 px-2 py-1 text-[10px] font-black text-[#ACACAC]">
              Épuisé
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
