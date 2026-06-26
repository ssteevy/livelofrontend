"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { getApiErrorMessage } from "@/lib/api";
import { authApi } from "@/lib/auth";

const fieldClass =
  "h-13 w-full rounded-xl border border-[#B3D4E5] bg-[#F8FAFC] pl-11 pr-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] transition focus:border-[#4E73C7] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4E73C7]/10";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const valid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid || submitting) return;
    setError("");
    setSubmitting(true);
    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <AuthShell>
        <div className="text-center lg:text-left">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E2F4FF] text-[#30BD57] lg:mx-0">
            <CheckCircle2 aria-hidden="true" size={34} />
          </span>
          <h1 className="mt-4 text-2xl font-black text-[#4E73C7]">Vérifiez vos emails</h1>
          <p className="mt-2 text-sm font-medium text-[#ACACAC]">
            Si un compte est associé à <span className="font-bold text-[#4E73C7]">{email}</span>, un code de réinitialisation vient d&apos;être envoyé.
          </p>
        </div>
        <Link
          href={`/reinitialiser-mot-de-passe?email=${encodeURIComponent(email)}`}
          className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#EDA415] text-sm font-black text-white shadow-[0_8px_24px_rgba(237,164,21,0.32)] transition hover:-translate-y-0.5 hover:bg-[#EDA415]/90"
        >
          J&apos;ai reçu mon code
          <ArrowRight size={18} />
        </Link>
        <p className="mt-6 text-center text-sm font-medium text-[#4E73C7]">
          <Link href="/connexion" className="font-black text-[#EDA415] hover:underline">
            Retour à la connexion
          </Link>
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-black text-[#4E73C7] sm:text-3xl">Mot de passe oublié ?</h1>
        <p className="mt-2 text-sm font-medium text-[#ACACAC]">
          Entrez votre email, nous vous enverrons un code pour réinitialiser votre mot de passe.
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="relative block">
          <span className="sr-only">Email</span>
          <Mail aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={19} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adresse email" autoComplete="email" className={fieldClass} />
        </label>

        {error ? (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!valid || submitting}
          className="h-13 w-full rounded-xl bg-[#EDA415] text-sm font-black tracking-[0.06em] text-white shadow-[0_8px_24px_rgba(237,164,21,0.32)] transition hover:-translate-y-0.5 hover:bg-[#EDA415]/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#ACACAC]/40 disabled:shadow-none"
        >
          {submitting ? "ENVOI..." : "ENVOYER LE CODE"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm font-medium text-[#4E73C7]">
        <Link href="/connexion" className="font-black text-[#EDA415] hover:underline">
          Retour à la connexion
        </Link>
      </p>
    </AuthShell>
  );
}
