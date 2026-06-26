"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, LayoutGrid, MapPin, Package } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { getApiErrorMessage } from "@/lib/api";
import { shopsApi, type ShopOwner } from "@/lib/shops";
import { SellerProducts } from "@/components/seller/SellerProducts";
import { SellerShopForm } from "@/components/seller/SellerShopForm";
import { SellerZones } from "@/components/seller/SellerZones";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState, ErrorState } from "@/components/ui/StateBlocks";

type Tab = "produits" | "boutique" | "livraison";

const TABS: { id: Tab; label: string; icon: typeof Package }[] = [
  { id: "produits", label: "Produits", icon: Package },
  { id: "livraison", label: "Livraison", icon: MapPin },
  { id: "boutique", label: "Ma boutique", icon: LayoutGrid },
];

export function SellerDashboard() {
  const router = useRouter();
  const { status, user, tokens } = useAuth();
  const [shop, setShop] = useState<ShopOwner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("produits");

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/connexion");
  }, [router, status]);

  const load = useCallback(() => {
    if (!tokens) return;
    setLoading(true);
    setError(null);
    shopsApi
      .mine(tokens.access_token)
      .then((shops) => setShop(shops[0] ?? null))
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [tokens]);

  useEffect(() => {
    if (status === "authenticated") void Promise.resolve().then(load);
  }, [status, load]);

  if (status !== "authenticated") return null;

  const token = tokens!.access_token;
  const isSeller = user?.role === "seller" || user?.role === "admin";

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415]">
        <ArrowLeft aria-hidden="true" size={18} />
        Accueil
      </Link>
      <h1 className="text-3xl font-black text-[#4E73C7]">Espace vendeur</h1>

      {loading ? (
        <div className="mt-6 space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : error ? (
        <div className="mt-6">
          <ErrorState message={error} onRetry={load} />
        </div>
      ) : !isSeller ? (
        <div className="mt-6">
          <EmptyState
            title="Accès réservé aux vendeurs"
            message="Votre compte n'est pas un compte vendeur. Déposez une demande pour ouvrir votre boutique."
          />
          <div className="mt-4 text-center">
            <Link href="/devenir-vendeur" className="inline-flex h-12 items-center rounded-xl bg-[#EDA415] px-6 text-sm font-black text-white transition hover:bg-[#EDA415]/90">
              Devenir vendeur
            </Link>
          </div>
        </div>
      ) : !shop ? (
        <div className="mt-6">
          <EmptyState title="Aucune boutique" message="Aucune boutique n'est encore liée à votre compte." />
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#ACACAC]">
              {shop.nom} · <span className="capitalize">{shop.statut}</span>
            </p>
            <Link href={`/boutiques/${shop.id}`} className="inline-flex items-center gap-1 text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415]">
              Voir ma boutique
              <ExternalLink aria-hidden="true" size={15} />
            </Link>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto border-b border-[#B3D4E5]">
            {TABS.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-black transition ${
                    active ? "border-[#EDA415] text-[#EDA415]" : "border-transparent text-[#4E73C7] hover:text-[#EDA415]"
                  }`}
                >
                  <Icon aria-hidden="true" size={17} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {tab === "produits" ? <SellerProducts token={token} shopId={shop.id} /> : null}
            {tab === "livraison" ? <SellerZones token={token} shopId={shop.id} /> : null}
            {tab === "boutique" ? <SellerShopForm token={token} shop={shop} onUpdated={setShop} /> : null}
          </div>
        </>
      )}
    </section>
  );
}
