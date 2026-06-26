"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, ImageIcon, Minus, Plus, ShoppingBag, Store, Trash2, Truck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { useCart } from "@/components/cart/CartProvider";
import { getApiErrorMessage } from "@/lib/api";
import { useSelectedCity } from "@/lib/city";
import { formatHtg } from "@/lib/format";
import { productsApi, type AvailabilityItem } from "@/lib/products";
import type { City } from "@/lib/auth";
import { CitySelect } from "@/components/catalog/CitySelect";
import { EmptyState } from "@/components/ui/StateBlocks";

export function CartView() {
  const router = useRouter();
  const { items, subtotal, count, setQuantity, remove, clear } = useCart();
  const { status } = useAuth();
  const { city, setCity } = useSelectedCity();

  const [cityId, setCityId] = useState("");
  const [availability, setAvailability] = useState<Record<string, AvailabilityItem>>({});
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (city) void Promise.resolve().then(() => setCityId(city.id));
  }, [city]);

  const checkAvailability = useCallback(() => {
    if (!cityId || items.length === 0) {
      setAvailability({});
      return;
    }
    setChecking(true);
    setError("");
    productsApi
      .checkAvailability(items.map((item) => item.productId), cityId)
      .then((result) => {
        const map: Record<string, AvailabilityItem> = {};
        for (const entry of result) map[entry.product_id] = entry;
        setAvailability(map);
      })
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setChecking(false));
  }, [cityId, items]);

  useEffect(() => {
    void Promise.resolve().then(checkAvailability);
  }, [checkAvailability]);

  function handleCity(value: string, selected: City | null) {
    setCityId(value);
    setCity(selected ? { id: selected.id, nom: selected.nom } : null);
  }

  // Frais de livraison : un par boutique livrable.
  const deliveryByShop = new Map<string, number>();
  if (cityId) {
    for (const item of items) {
      const av = availability[item.productId];
      if (av?.disponible && av.prix_livraison !== null) deliveryByShop.set(item.shopId, av.prix_livraison);
    }
  }
  const deliveryTotal = [...deliveryByShop.values()].reduce((sum, p) => sum + p, 0);
  const hasUnavailable = cityId ? items.some((item) => !availability[item.productId]?.disponible) : false;
  const total = subtotal + deliveryTotal;

  function checkout() {
    setInfo("");
    if (status !== "authenticated") {
      router.push("/connexion");
      return;
    }
    if (!cityId) {
      setError("Choisissez votre ville de livraison.");
      return;
    }
    if (hasUnavailable) {
      setError("Certains produits ne sont pas livrables dans votre ville. Retirez-les pour continuer.");
      return;
    }
    setInfo("Disponibilité confirmée ✅ Le paiement MonCash sera disponible très bientôt.");
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/produits" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415]">
          <ArrowLeft aria-hidden="true" size={18} />
          Continuer mes achats
        </Link>
        <EmptyState title="Votre panier est vide" message="Parcourez le catalogue et ajoutez vos produits favoris." />
        <div className="mt-5 text-center">
          <Link href="/produits" className="inline-flex h-12 items-center rounded-2xl bg-[#EDA415] px-6 text-sm font-black text-white transition hover:bg-[#EDA415]/90">
            Découvrir le catalogue
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-[#4E73C7] sm:text-3xl">Mon panier ({count})</h1>
        <button type="button" onClick={clear} className="text-sm font-black text-[#ACACAC] transition hover:text-red-600">
          Vider
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          {items.map((item) => {
            const av = cityId ? availability[item.productId] : undefined;
            const unavailable = cityId ? !av?.disponible : false;
            return (
              <article key={item.productId} className="flex gap-3 rounded-2xl border border-[#B3D4E5] bg-white p-3">
                <Link href={`/produits/${item.productId}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#E2F4FF]">
                  {item.image ? (
                    <Image src={item.image} alt={item.titre} fill sizes="80px" className="object-cover" />
                  ) : (
                    <span className="flex h-full items-center justify-center">
                      <ImageIcon aria-hidden="true" className="text-[#4E73C7]/40" size={24} />
                    </span>
                  )}
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/produits/${item.productId}`} className="line-clamp-2 text-sm font-black text-[#4E73C7] hover:text-[#EDA415]">
                    {item.titre}
                  </Link>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-[#ACACAC]">
                    <Store aria-hidden="true" size={11} />
                    {item.shopNom}
                  </p>
                  {unavailable ? (
                    <p className="mt-1 inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-600">
                      <AlertTriangle size={11} /> Non livrable ici
                    </p>
                  ) : null}
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center rounded-xl border border-[#B3D4E5]">
                      <button type="button" aria-label="Diminuer" onClick={() => setQuantity(item.productId, item.quantite - 1)} className="flex h-9 w-9 items-center justify-center text-[#4E73C7] transition hover:bg-[#E2F4FF]">
                        <Minus size={15} />
                      </button>
                      <span className="w-8 text-center text-sm font-black text-[#4E73C7]">{item.quantite}</span>
                      <button type="button" aria-label="Augmenter" onClick={() => setQuantity(item.productId, Math.min(item.stock || 99, item.quantite + 1))} className="flex h-9 w-9 items-center justify-center text-[#4E73C7] transition hover:bg-[#E2F4FF]">
                        <Plus size={15} />
                      </button>
                    </div>
                    <span className="text-sm font-black text-[#4E73C7]">{formatHtg(item.prix * item.quantite)}</span>
                  </div>
                </div>
                <button type="button" aria-label="Retirer" onClick={() => remove(item.productId)} className="flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </article>
            );
          })}
        </div>

        {/* Récapitulatif */}
        <aside className="h-fit rounded-2xl border border-[#B3D4E5] bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-black text-[#4E73C7]">Récapitulatif</h2>

          <div className="mt-4">
            <label className="mb-1 flex items-center gap-1 text-xs font-black uppercase text-[#EDA415]">
              <Truck size={13} /> Ville de livraison
            </label>
            <CitySelect value={cityId} onChange={handleCity} placeholder="Choisir ma ville" />
          </div>

          <dl className="mt-4 space-y-2 border-t border-[#E2F4FF] pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="font-semibold text-[#ACACAC]">Sous-total</dt>
              <dd className="font-bold text-[#4E73C7]">{formatHtg(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold text-[#ACACAC]">Livraison</dt>
              <dd className="font-bold text-[#4E73C7]">
                {!cityId ? "—" : checking ? "..." : formatHtg(deliveryTotal)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-[#E2F4FF] pt-2">
              <dt className="font-black text-[#4E73C7]">Total</dt>
              <dd className="text-lg font-black text-[#4E73C7]">{formatHtg(total)}</dd>
            </div>
          </dl>

          {error ? (
            <p role="alert" className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{error}</p>
          ) : null}
          {info ? (
            <p className="mt-3 rounded-xl bg-[#E2F4FF] px-3 py-2 text-xs font-semibold text-[#30BD57]">{info}</p>
          ) : null}

          <button
            type="button"
            onClick={checkout}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#EDA415] text-sm font-black text-white shadow-[0_8px_24px_rgba(237,164,21,0.32)] transition hover:-translate-y-0.5 hover:bg-[#EDA415]/90 active:scale-[0.99]"
          >
            <ShoppingBag size={18} />
            {status === "authenticated" ? "Passer la commande" : "Se connecter pour commander"}
          </button>
          <Link href="/produits" className="mt-2 block text-center text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415]">
            Continuer mes achats
          </Link>
        </aside>
      </div>
    </section>
  );
}
