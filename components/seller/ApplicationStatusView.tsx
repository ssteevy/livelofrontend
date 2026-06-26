"use client";

import Link from "next/link";
import { Clock, Search, ShieldCheck, XCircle } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { shopsApi, type ApplicationStatus } from "@/lib/shops";

const STATUS_META: Record<ApplicationStatus["statut"], { label: string; className: string; icon: typeof Clock }> = {
  pending: { label: "En attente", className: "bg-[#EDA415]/10 text-[#EDA415]", icon: Clock },
  approved: { label: "Approuvée", className: "bg-[#30BD57]/10 text-[#30BD57]", icon: ShieldCheck },
  rejected: { label: "Rejetée", className: "bg-red-50 text-red-600", icon: XCircle },
};

export function ApplicationStatusView({ initialId }: { initialId: string }) {
  const [id, setId] = useState(initialId);
  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const lookup = useCallback((applicationId: string) => {
    if (!applicationId.trim()) return;
    setLoading(true);
    setError("");
    setStatus(null);
    shopsApi
      .applicationStatus(applicationId.trim())
      .then(setStatus)
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (initialId) void Promise.resolve().then(() => lookup(initialId));
  }, [initialId, lookup]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    lookup(id);
  }

  const meta = status ? STATUS_META[status.statut] : null;
  const MetaIcon = meta?.icon ?? Clock;

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black text-[#4E73C7]">Suivi de ma demande</h1>
      <p className="mt-2 text-sm font-semibold text-[#ACACAC]">Entrez le numéro de suivi reçu lors de votre candidature.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <input
          value={id}
          onChange={(event) => setId(event.target.value)}
          placeholder="Numéro de suivi"
          className="h-12 flex-1 rounded-xl border border-[#B3D4E5] bg-white px-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 items-center gap-2 rounded-xl bg-[#4E73C7] px-5 text-sm font-black text-white transition hover:bg-[#4E73C7]/90 disabled:opacity-50"
        >
          <Search size={18} />
          Vérifier
        </button>
      </form>

      {error ? (
        <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}

      {status && meta ? (
        <div className="mt-6 rounded-2xl border border-[#B3D4E5] bg-white p-6">
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-black ${meta.className}`}>
            <MetaIcon aria-hidden="true" size={16} />
            {meta.label}
          </span>
          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Soumise le" value={formatDate(status.created_at)} />
            {status.reviewed_at ? <Row label="Traitée le" value={formatDate(status.reviewed_at)} /> : null}
            {status.motif_rejet ? <Row label="Motif du rejet" value={status.motif_rejet} /> : null}
          </dl>
          {status.statut === "approved" ? (
            <div className="mt-5 rounded-xl bg-[#E2F4FF] px-4 py-3 text-sm font-bold text-[#4E73C7]">
              Votre boutique est active ! Connectez-vous avec votre email et mot de passe pour gérer votre{" "}
              <Link href="/vendeur" className="font-black text-[#EDA415]">
                espace vendeur
              </Link>
              .
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="font-semibold text-[#ACACAC]">{label}</dt>
      <dd className="text-right font-bold text-[#4E73C7]">{value}</dd>
    </div>
  );
}
