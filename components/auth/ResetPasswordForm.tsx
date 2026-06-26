"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, KeyRound, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { getApiErrorMessage } from "@/lib/api";
import { authApi } from "@/lib/auth";

const fieldClass =
  "h-13 w-full rounded-xl border border-[#B3D4E5] bg-[#F8FAFC] pl-11 pr-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] transition focus:border-[#4E73C7] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4E73C7]/10";

export function ResetPasswordForm({ initialEmail = "" }: { initialEmail?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const rules = useMemo(
    () => [
      { label: "8 caractères minimum", valid: password.length >= 8 },
      { label: "1 majuscule", valid: /[A-Z]/.test(password) },
      { label: "1 minuscule", valid: /[a-z]/.test(password) },
      { label: "1 chiffre", valid: /\d/.test(password) },
      { label: "1 symbole", valid: /[^A-Za-z0-9]/.test(password) },
    ],
    [password],
  );

  const passwordValid = rules.every((r) => r.valid);
  const match = password.length > 0 && password === confirm;
  const canSubmit = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && otp.trim().length >= 4 && passwordValid && match;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || submitting) return;
    setError("");
    setSubmitting(true);
    try {
      await authApi.resetPassword(email, otp.trim(), password, confirm);
      router.push("/connexion");
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-black text-[#4E73C7] sm:text-3xl">Nouveau mot de passe</h1>
        <p className="mt-2 text-sm font-medium text-[#ACACAC]">Entrez le code reçu par email et choisissez un nouveau mot de passe.</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="relative block">
          <span className="sr-only">Email</span>
          <Mail aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={19} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adresse email" autoComplete="email" className={fieldClass} />
        </label>

        <label className="relative block">
          <span className="sr-only">Code reçu par email</span>
          <KeyRound aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={19} />
          <input value={otp} onChange={(e) => setOtp(e.target.value)} inputMode="numeric" placeholder="Code de vérification" className={`${fieldClass} tracking-[0.3em]`} />
        </label>

        <label className="relative block">
          <span className="sr-only">Nouveau mot de passe</span>
          <LockKeyhole aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={19} />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
            autoComplete="new-password"
            className={`${fieldClass} pr-11`}
          />
          <button type="button" aria-label={showPassword ? "Masquer" : "Afficher"} onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#ACACAC] transition hover:text-[#4E73C7]">
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </label>

        <label className="relative block">
          <span className="sr-only">Confirmer le mot de passe</span>
          <LockKeyhole aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={19} />
          <input
            type={showPassword ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirmer le mot de passe"
            autoComplete="new-password"
            className={`${fieldClass} ${confirm && !match ? "border-[#EDA415]" : ""}`}
          />
        </label>

        <div className="grid grid-cols-2 gap-1 text-xs">
          {rules.map((rule) => (
            <p key={rule.label} className={`flex items-center gap-1 ${rule.valid ? "text-[#30BD57]" : "text-[#ACACAC]"}`}>
              <Check aria-hidden="true" size={13} />
              {rule.label}
            </p>
          ))}
        </div>
        {confirm && !match ? <p className="text-xs font-semibold text-[#EDA415]">Les mots de passe ne correspondent pas.</p> : null}

        {error ? (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="h-13 w-full rounded-xl bg-[#EDA415] text-sm font-black tracking-[0.06em] text-white shadow-[0_8px_24px_rgba(237,164,21,0.32)] transition hover:-translate-y-0.5 hover:bg-[#EDA415]/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#ACACAC]/40 disabled:shadow-none"
        >
          {submitting ? "RÉINITIALISATION..." : "RÉINITIALISER"}
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
