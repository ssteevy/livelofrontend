"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { AuthShell } from "@/components/auth/AuthShell";
import { getApiErrorMessage } from "@/lib/api";

const fieldClass =
  "h-13 w-full rounded-xl border border-[#B3D4E5] bg-[#F8FAFC] pl-11 pr-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] transition focus:border-[#4E73C7] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4E73C7]/10";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length > 0,
    [email, password],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-black text-[#4E73C7] sm:text-3xl">Bon retour 👋</h1>
        <p className="mt-2 text-sm font-medium text-[#ACACAC]">Connectez-vous pour continuer vos achats sur Livelo.</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="relative block">
          <span className="sr-only">Email</span>
          <Mail aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={19} />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Adresse email"
            autoComplete="email"
            className={fieldClass}
          />
        </label>

        <label className="relative block">
          <span className="sr-only">Mot de passe</span>
          <LockKeyhole aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={19} />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Mot de passe"
            autoComplete="current-password"
            className={`${fieldClass} pr-11`}
          />
          <button
            type="button"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#ACACAC] transition hover:text-[#4E73C7]"
          >
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </label>

        <div className="flex justify-end">
          <Link href="/mot-de-passe-oublie" className="text-sm font-bold text-[#EDA415] hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        {error ? (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="h-13 w-full rounded-xl bg-[#EDA415] text-sm font-black tracking-[0.06em] text-white shadow-[0_8px_24px_rgba(237,164,21,0.32)] transition hover:-translate-y-0.5 hover:bg-[#EDA415]/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#ACACAC]/40 disabled:text-white disabled:shadow-none"
        >
          {isSubmitting ? "CONNEXION..." : "SE CONNECTER"}
        </button>
      </form>

      <div className="mt-7 flex items-center gap-3 text-xs font-semibold text-[#ACACAC]">
        <span className="h-px flex-1 bg-[#B3D4E5]" />
        ou
        <span className="h-px flex-1 bg-[#B3D4E5]" />
      </div>

      <p className="mt-6 text-center text-sm font-medium text-[#4E73C7]">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-black text-[#EDA415] hover:underline">
          Créer un compte
        </Link>
      </p>
    </AuthShell>
  );
}
