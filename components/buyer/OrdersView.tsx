"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Package } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { getApiErrorMessage } from "@/lib/api";
import { formatDate, formatHtg } from "@/lib/format";
import { usersApi, type Order } from "@/lib/users";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState, ErrorState } from "@/components/ui/StateBlocks";

const STATUT_LABEL: Record<string, { label: string; className: string }> = {
  pending: { label: "En attente", className: "bg-[#EDA415]/10 text-[#EDA415]" },
  paid: { label: "Payée", className: "bg-[#4E73C7]/10 text-[#4E73C7]" },
  confirmed: { label: "Confirmée", className: "bg-[#4E73C7]/10 text-[#4E73C7]" },
  shipped: { label: "Expédiée", className: "bg-[#4E73C7]/10 text-[#4E73C7]" },
  delivered: { label: "Livrée", className: "bg-[#30BD57]/10 text-[#30BD57]" },
  completed: { label: "Terminée", className: "bg-[#30BD57]/10 text-[#30BD57]" },
  cancelled: { label: "Annulée", className: "bg-red-50 text-red-600" },
};

export function OrdersView() {
  const router = useRouter();
  const { status, tokens } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/connexion");
  }, [router, status]);

  const load = useCallback(() => {
    if (!tokens) return;
    setLoading(true);
    setError(null);
    usersApi
      .orders(tokens.access_token)
      .then(setOrders)
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [tokens]);

  useEffect(() => {
    if (status === "authenticated") void Promise.resolve().then(load);
  }, [status, load]);

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415]">
        <ArrowLeft aria-hidden="true" size={18} />
        Accueil
      </Link>
      <h1 className="text-3xl font-black text-[#4E73C7]">Mes commandes</h1>

      <div className="mt-6 space-y-4">
        {loading ? (
          <>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </>
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : orders.length === 0 ? (
          <EmptyState title="Aucune commande" message="Vous n'avez pas encore passé de commande sur Livelo." />
        ) : (
          orders.map((order) => {
            const meta = STATUT_LABEL[order.statut] ?? { label: order.statut, className: "bg-[#ACACAC]/15 text-[#ACACAC]" };
            return (
              <article key={order.id} className="rounded-2xl border border-[#B3D4E5] bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-black text-[#4E73C7]">
                      <Package aria-hidden="true" size={16} />
                      {order.shop?.nom ?? "Commande"}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#ACACAC]">
                      {formatDate(order.created_at)}
                      {order.delivery_city?.nom ? (
                        <span className="ml-2 inline-flex items-center gap-1">
                          <MapPin aria-hidden="true" size={12} />
                          {order.delivery_city.nom}
                        </span>
                      ) : null}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${meta.className}`}>{meta.label}</span>
                </div>

                {order.order_items && order.order_items.length > 0 ? (
                  <ul className="mt-4 space-y-1.5 border-t border-[#E2F4FF] pt-3">
                    {order.order_items.map((item) => (
                      <li key={item.id} className="flex justify-between gap-3 text-sm">
                        <span className="text-gray-700">
                          {item.quantite} × {item.titre_snapshot}
                        </span>
                        <span className="font-bold text-[#4E73C7]">{formatHtg(item.sous_total)}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-4 space-y-1 border-t border-[#E2F4FF] pt-3 text-sm">
                  <Row label="Produits" value={formatHtg(order.montant_produits)} />
                  <Row label="Livraison" value={formatHtg(order.frais_livraison)} />
                  <Row label="Total" value={formatHtg(order.montant_total)} strong />
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <span className={strong ? "font-black text-[#4E73C7]" : "font-semibold text-[#ACACAC]"}>{label}</span>
      <span className={strong ? "font-black text-[#4E73C7]" : "font-bold text-[#4E73C7]"}>{value}</span>
    </div>
  );
}
