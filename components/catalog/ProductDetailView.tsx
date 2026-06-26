"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ImageIcon, MapPin, Store, Truck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import { useSelectedCity } from "@/lib/city";
import { discountLabel, formatHtg } from "@/lib/format";
import { productsApi, type ProductDetail } from "@/lib/products";
import type { City } from "@/lib/auth";
import { CitySelect } from "@/components/catalog/CitySelect";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/StateBlocks";

export function ProductDetailView({ productId }: { productId: string }) {
  const { city, setCity } = useSelectedCity();
  const [cityId, setCityId] = useState("");
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (city) void Promise.resolve().then(() => setCityId(city.id));
  }, [city]);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    productsApi
      .getOne(productId, cityId || undefined)
      .then(setProduct)
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [productId, cityId]);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  function handleCityChange(value: string, selected: City | null) {
    setCityId(value);
    setCity(selected ? { id: selected.id, nom: selected.nom } : null);
  }

  if (loading) {
    return (
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Skeleton className="aspect-square w-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <ErrorState message={error ?? "Produit introuvable."} onRetry={load} />
      </section>
    );
  }

  const hasPromo = !!product.prix_promo && product.prix_promo < product.prix;
  const displayPrice = hasPromo ? product.prix_promo! : product.prix;
  const discount = discountLabel(product.prix, product.prix_promo);
  const images = product.images ?? [];
  const cover = images[activeImage];
  const livraison = product.livraison_ville;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/produits" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415]">
        <ArrowLeft aria-hidden="true" size={18} />
        Retour au catalogue
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-[#B3D4E5] bg-gradient-to-br from-[#E2F4FF] via-white to-[#B3D4E5]">
            {discount ? (
              <span className="absolute right-3 top-3 z-10 rounded-lg bg-[#EDA415] px-3 py-1 text-sm font-black text-white">
                {discount}
              </span>
            ) : null}
            {cover ? (
              <Image src={cover} alt={product.titre} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
            ) : (
              <ImageIcon aria-hidden="true" className="text-[#4E73C7]/40" size={80} strokeWidth={1.4} />
            )}
          </div>
          {images.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((url, index) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 ${
                    index === activeImage ? "border-[#EDA415]" : "border-[#B3D4E5]"
                  }`}
                >
                  <Image src={url} alt={`${product.titre} ${index + 1}`} fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-[#E2F4FF] px-3 py-1 text-xs font-black text-[#4E73C7]">{product.categorie}</span>
          <h1 className="text-3xl font-black text-[#4E73C7]">{product.titre}</h1>

          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-[#4E73C7]">{formatHtg(displayPrice)}</span>
            {hasPromo ? <span className="pb-1 text-base font-semibold text-[#ACACAC] line-through">{formatHtg(product.prix)}</span> : null}
          </div>

          <p className="text-sm font-bold">
            {product.stock > 0 ? (
              <span className="text-[#30BD57]">En stock ({product.stock} disponible{product.stock > 1 ? "s" : ""})</span>
            ) : (
              <span className="text-[#ACACAC]">Épuisé</span>
            )}
          </p>

          {product.description ? (
            <p className="whitespace-pre-line text-sm leading-6 text-gray-700">{product.description}</p>
          ) : null}

          {product.shops ? (
            <Link
              href={`/boutiques/${product.shop_id}`}
              className="flex w-fit items-center gap-3 rounded-2xl border border-[#B3D4E5] bg-white p-3 transition hover:bg-[#E2F4FF]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4E73C7] text-white">
                <Store aria-hidden="true" size={20} />
              </span>
              <span>
                <span className="block text-xs font-black uppercase text-[#EDA415]">Boutique</span>
                <span className="block text-sm font-black text-[#4E73C7]">{product.shops.nom}</span>
              </span>
            </Link>
          ) : null}

          <div className="rounded-2xl border border-[#B3D4E5] bg-[#F8FAFC] p-4">
            <p className="flex items-center gap-2 text-sm font-black text-[#4E73C7]">
              <Truck aria-hidden="true" size={18} />
              Livraison
            </p>
            <p className="mt-1 mb-3 text-xs font-semibold text-[#ACACAC]">
              Choisissez votre ville pour connaître la disponibilité et le prix de livraison.
            </p>
            <CitySelect value={cityId} onChange={handleCityChange} placeholder="Choisir ma ville" />
            {cityId && livraison ? (
              livraison.disponible ? (
                <p className="mt-3 flex items-center gap-2 rounded-xl bg-[#E2F4FF] px-3 py-2 text-sm font-black text-[#30BD57]">
                  <MapPin aria-hidden="true" size={16} />
                  Livrable — {formatHtg(livraison.prix_livraison)}
                </p>
              ) : (
                <p className="mt-3 rounded-xl bg-[#ACACAC]/15 px-3 py-2 text-sm font-black text-[#ACACAC]">
                  Cette boutique ne livre pas encore dans cette ville.
                </p>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
