"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ExternalLink, ShieldX, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { getApiErrorMessage } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { adminApi, type ApplicationDetail, type ApplicationListItem, type ApplicationStatut } from "@/lib/admin";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState, ErrorState } from "@/components/ui/StateBlocks";

const FILTERS: { id: ApplicationStatut | ""; label: string }[] = [
  { id: "pending", label: "En attente" },
  { id: "approved", label: "Approuvées" },
  { id: "rejected", label: "Rejetées" },
  { id: "", label: "Toutes" },
];

const STATUT_BADGE: Record<ApplicationStatut, string> = {
  pending: "bg-[#EDA415]/10 text-[#EDA415]",
  approved: "bg-[#30BD57]/10 text-[#30BD57]",
  rejected: "bg-red-50 text-red-600",
};

export function AdminApplications() {
  const router = useRouter();
  const { status, user, tokens } = useAuth();

  const [filter, setFilter] = useState<ApplicationStatut | "">("pending");
  const [items, setItems] = useState<ApplicationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<ApplicationDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [motif, setMotif] = useState("");
  const [actionError, setActionError] = useState("");
  const [acting, setActing] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/connexion");
  }, [router, status]);

  const token = tokens?.access_token;
  const isAdmin = user?.role === "admin";

  const load = useCallback(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    adminApi
      .listApplications(token, filter || undefined)
      .then(setItems)
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [token, filter]);

  useEffect(() => {
    if (status === "authenticated" && isAdmin) void Promise.resolve().then(load);
  }, [status, isAdmin, load]);

  const openDetail = useCallback(
    (id: string) => {
      if (!token) return;
      setDetailLoading(true);
      setActionError("");
      setMotif("");
      adminApi
        .getApplication(token, id)
        .then(setSelected)
        .catch((err) => setActionError(getApiErrorMessage(err)))
        .finally(() => setDetailLoading(false));
    },
    [token],
  );

  async function approve() {
    if (!token || !selected) return;
    setActing(true);
    setActionError("");
    try {
      await adminApi.approveApplication(token, selected.id);
      setSelected(null);
      load();
    } catch (err) {
      setActionError(getApiErrorMessage(err));
    } finally {
      setActing(false);
    }
  }

  async function reject() {
    if (!token || !selected) return;
    if (motif.trim().length < 3) {
      setActionError("Le motif de rejet est requis (min. 3 caractères).");
      return;
    }
    setActing(true);
    setActionError("");
    try {
      await adminApi.rejectApplication(token, selected.id, motif.trim());
      setSelected(null);
      load();
    } catch (err) {
      setActionError(getApiErrorMessage(err));
    } finally {
      setActing(false);
    }
  }

  if (status !== "authenticated") return null;

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415]">
        <ArrowLeft aria-hidden="true" size={18} />
        Accueil
      </Link>
      <h1 className="text-3xl font-black text-[#4E73C7]">Demandes vendeur</h1>

      {!isAdmin ? (
        <div className="mt-6">
          <EmptyState title="Accès refusé" message="Cet espace est réservé aux administrateurs." />
        </div>
      ) : (
        <>
          <div className="mt-5 flex gap-2 overflow-x-auto border-b border-[#B3D4E5]">
            {FILTERS.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`shrink-0 border-b-2 px-4 py-3 text-sm font-black transition ${
                    active ? "border-[#EDA415] text-[#EDA415]" : "border-transparent text-[#4E73C7] hover:text-[#EDA415]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : error ? (
              <ErrorState message={error} onRetry={load} />
            ) : items.length === 0 ? (
              <EmptyState title="Aucune demande" message="Aucune demande ne correspond à ce filtre." />
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openDetail(item.id)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[#B3D4E5] bg-white p-4 text-left transition hover:bg-[#E2F4FF]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-[#4E73C7]">{item.nom_boutique}</p>
                      <p className="truncate text-xs font-semibold text-[#ACACAC]">
                        {item.prenom} {item.nom} · {item.email} · {formatDate(item.created_at)}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${STATUT_BADGE[item.statut]}`}>
                      {item.statut}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4" onClick={() => setSelected(null)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-[#4E73C7]">Détail de la demande</h2>
              <button type="button" onClick={() => setSelected(null)} aria-label="Fermer" className="text-[#ACACAC] hover:text-[#4E73C7]">
                <X size={20} />
              </button>
            </div>

            {detailLoading ? (
              <Skeleton className="h-40 w-full" />
            ) : (
              <>
                <dl className="space-y-2 text-sm">
                  <DetailRow label="Boutique" value={selected.nom_boutique} />
                  <DetailRow label="Candidat" value={`${selected.prenom} ${selected.nom}`} />
                  <DetailRow label="Email" value={selected.email} />
                  <DetailRow label="Téléphone" value={selected.telephone} />
                  <DetailRow label="Catégorie" value={selected.categorie_principale} />
                  <DetailRow label="MonCash" value={`${selected.moncash_numero} (${selected.moncash_type})`} />
                  {selected.description ? <DetailRow label="Description" value={selected.description} /> : null}
                  <DetailRow label="Statut" value={selected.statut} />
                  {selected.motif_rejet ? <DetailRow label="Motif rejet" value={selected.motif_rejet} /> : null}
                </dl>

                {selected.identite_url ? (
                  <a href={selected.identite_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-black text-[#4E73C7] hover:text-[#EDA415]">
                    Voir la pièce d&apos;identité
                    <ExternalLink aria-hidden="true" size={15} />
                  </a>
                ) : null}

                {selected.statut === "pending" ? (
                  <div className="mt-6 space-y-3 border-t border-[#E2F4FF] pt-4">
                    <textarea
                      value={motif}
                      onChange={(e) => setMotif(e.target.value)}
                      placeholder="Motif de rejet (si rejet)"
                      className="h-20 w-full rounded-xl border border-[#B3D4E5] bg-white px-4 py-3 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none"
                    />
                    {actionError ? (
                      <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                        {actionError}
                      </p>
                    ) : null}
                    <div className="flex gap-3">
                      <button type="button" onClick={approve} disabled={acting} className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#30BD57] text-sm font-black text-white transition hover:bg-[#30BD57]/90 disabled:opacity-50">
                        <Check aria-hidden="true" size={18} />
                        Approuver
                      </button>
                      <button type="button" onClick={reject} disabled={acting} className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 text-sm font-black text-white transition hover:bg-red-700 disabled:opacity-50">
                        <ShieldX aria-hidden="true" size={18} />
                        Rejeter
                      </button>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="font-semibold text-[#ACACAC]">{label}</dt>
      <dd className="text-right font-bold text-[#4E73C7]">{value}</dd>
    </div>
  );
}
