"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, ShoppingBag, Star, Store } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import { formatHtg } from "@/lib/format";
import type { Product } from "@/lib/products";
import { shopsApi, type DeliveryZone, type ShopProduct, type ShopPublic } from "@/lib/shops";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/StateBlocks";

function toProduct(shopId: string, item: ShopProduct): Product {
  return { ...item, shop_id: shopId, statut: "active" };
}

export function ShopView({ shopId }: { shopId: string }) {
  const [shop, setShop] = useState<ShopPublic | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([shopsApi.getOne(shopId), shopsApi.products(shopId), shopsApi.deliveryZones(shopId)])
      .then(([shopData, productData, zoneData]) => {
        setShop(shopData);
        setProducts(productData.map((item) => toProduct(shopId, item)));
        setZones(zoneData);
      })
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [shopId]);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="mt-4 h-8 w-1/3" />
      </section>
    );
  }

  if (error || !shop) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <ErrorState message={error ?? "Boutique introuvable."} onRetry={load} />
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/produits" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415]">
        <ArrowLeft aria-hidden="true" size={18} />
        Retour au catalogue
      </Link>

      <div className="overflow-hidden rounded-3xl border border-[#B3D4E5] bg-white">
        <div className="relative h-40 bg-gradient-to-r from-[#4E73C7] via-[#E2F4FF] to-[#EDA415]">
          {shop.banner_url ? <Image src={shop.banner_url} alt="" fill sizes="100vw" className="object-cover" /> : null}
        </div>
        <div className="p-5 sm:p-6">
          <div className="-mt-16 mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-[#4E73C7] text-white shadow-[0_14px_35px_rgba(78,115,199,0.24)]">
            {shop.logo_url ? (
              <Image src={shop.logo_url} alt={shop.nom} width={80} height={80} className="h-full w-full object-cover" />
            ) : (
              <Store aria-hidden="true" size={32} />
            )}
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#4E73C7]">{shop.nom}</h1>
              <p className="mt-1 text-sm font-semibold text-[#ACACAC]">{shop.categorie_principale}</p>
              {shop.description ? <p className="mt-2 max-w-2xl text-sm text-gray-700">{shop.description}</p> : null}
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E2F4FF] px-3 py-1 text-sm font-bold text-[#EDA415]">
                <Star aria-hidden="true" size={15} fill="currentColor" />
                {shop.note_moyenne ?? "—"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E2F4FF] px-3 py-1 text-sm font-bold text-[#4E73C7]">
                <ShoppingBag aria-hidden="true" size={15} />
                {shop.total_ventes ?? 0} ventes
              </span>
            </div>
          </div>

          {zones.length > 0 ? (
            <div className="mt-5">
              <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase text-[#EDA415]">
                <MapPin aria-hidden="true" size={14} />
                Zones de livraison
              </p>
              <div className="flex flex-wrap gap-2">
                {zones.map((zone) => (
                  <span key={zone.id} className="rounded-full border border-[#B3D4E5] bg-[#F8FAFC] px-3 py-1 text-xs font-semibold text-[#4E73C7]">
                    {zone.cities?.nom ?? "Ville"} · {formatHtg(zone.prix_livraison_htg)}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <h2 className="mb-6 mt-10 text-2xl font-black text-[#4E73C7]">Produits de la boutique</h2>
      <ProductGrid
        products={products}
        emptyTitle="Aucun produit"
        emptyMessage="Cette boutique n'a pas encore publié de produit."
      />
    </section>
  );
}
