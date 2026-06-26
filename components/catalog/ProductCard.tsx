"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ImageIcon, Plus, Store } from "lucide-react";
import { MouseEvent, useState } from "react";

import type { Product } from "@/lib/products";
import { discountLabel, formatHtg } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";
import { Rating } from "@/components/ui/Rating";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (product.stock <= 0) return;
    add(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  const cover = product.images?.[0];
  const hasPromo = !!product.prix_promo && product.prix_promo < product.prix;
  const displayPrice = hasPromo ? product.prix_promo! : product.prix;
  const discount = discountLabel(product.prix, product.prix_promo);
  const outOfStock = product.stock <= 0;

  return (
    <Link
      href={`/produits/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#B3D4E5]/60 bg-white shadow-[0_2px_10px_rgba(78,115,199,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4E73C7]/40 hover:shadow-[0_18px_40px_rgba(78,115,199,0.16)]"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#E2F4FF] via-white to-[#B3D4E5]/60">
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {discount ? (
            <span className="rounded-full bg-[#EDA415] px-2 py-0.5 text-[11px] font-black leading-none text-white shadow-sm">{discount}</span>
          ) : null}
          {outOfStock ? (
            <span className="rounded-full bg-[#ACACAC] px-2 py-0.5 text-[11px] font-black leading-none text-white">Épuisé</span>
          ) : null}
        </div>

        {cover ? (
          <Image
            src={cover}
            alt={product.titre}
            fill
            sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <ImageIcon aria-hidden="true" className="text-[#4E73C7]/40" size={48} strokeWidth={1.5} />
          </span>
        )}

        {/* Quick-add panier */}
        {!outOfStock ? (
          <button
            type="button"
            onClick={handleAdd}
            aria-label="Ajouter au panier"
            className="absolute bottom-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#4E73C7] text-white shadow-lg transition-all duration-300 hover:bg-[#EDA415] active:scale-90 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
          >
            {added ? <Check aria-hidden="true" size={18} /> : <Plus aria-hidden="true" size={18} />}
          </button>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2">
        <div className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-[#ACACAC]">
          <Store aria-hidden="true" size={11} className="shrink-0 text-[#4E73C7]" />
          <span className="truncate">{product.shops?.nom ?? product.categorie}</span>
        </div>

        <h3 className="line-clamp-2 min-h-9 text-[13px] font-bold leading-[1.15rem] text-[#4E73C7]" title={product.titre}>
          {product.titre}
        </h3>

        <div className="mt-1.5">
          <Rating value={product.note_moyenne} count={product.total_avis} size={12} />
        </div>

        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-base font-black leading-none text-[#4E73C7]">{formatHtg(displayPrice)}</span>
          {hasPromo ? <span className="text-[11px] font-semibold text-[#ACACAC] line-through">{formatHtg(product.prix)}</span> : null}
        </div>
      </div>
    </Link>
  );
}
