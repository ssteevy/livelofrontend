"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { getApiErrorMessage } from "@/lib/api";

function AuthFooter() {
  return (
    <div className="mt-auto flex flex-col items-center gap-6 pb-8 pt-12 text-center text-sm text-black">
      <p>
        Besoin d&apos;aide ? Visitez notre centre d&apos;aide ou contactez-nous au{" "}
        <a href="tel:+50900000000" className="font-semibold text-[#4E73C7]">
          +509 0000 0000
        </a>
      </p>
      <Image
        src="/livelo-logo-transparent.png"
        alt="Livelo Haiti"
        width={116}
        height={78}
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length > 0;
  }, [email, password]);

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
    <div className="flex min-h-screen flex-col bg-white px-4">
      <main className="mx-auto w-full max-w-[432px] flex-1 pt-14 text-center sm:pt-20">
        <div className="relative mx-auto h-14 w-14 overflow-hidden rounded-xl shadow-[0_10px_28px_rgba(78,115,199,0.16)]">
          <Image
            src="/livelo-auth-favicon.png"
            alt="Livelo Haiti"
            fill
            priority
            sizes="56px"
            className="object-cover"
          />
        </div>

        <h1 className="mt-5 text-xl font-black text-black">Connexion à Livelo</h1>
        <p className="mt-3 text-base text-black/80">Accédez à votre compte avec votre email et votre mot de passe.</p>

        <form className="mt-9 space-y-4 text-left" onSubmit={handleSubmit}>
          <label className="relative block">
            <span className="sr-only">Email</span>
            <Mail aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={20} />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Adresse email*"
              autoComplete="email"
              className="h-14 w-full rounded-sm border border-[#ACACAC] bg-white px-4 pl-12 text-base text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none"
            />
          </label>

          <label className="relative block">
            <span className="sr-only">Mot de passe</span>
            <LockKeyhole aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mot de passe*"
              autoComplete="current-password"
              className="h-14 w-full rounded-sm border border-[#ACACAC] bg-white px-4 pl-12 pr-12 text-base text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none"
            />
            <button
              type="button"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ACACAC]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </label>

          <div className="flex items-center justify-end text-sm">
            <a href="#mot-de-passe-oublie" className="font-bold text-[#EDA415]">
              Mot de passe oublié ?
            </a>
          </div>

          {error ? (
            <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="mt-4 h-14 w-full rounded-md bg-[#EDA415] px-5 text-sm font-black tracking-[0.08em] text-white shadow-[0_4px_10px_rgba(78,115,199,0.16)] transition hover:bg-[#EDA415]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4E73C7] disabled:cursor-not-allowed disabled:bg-[#ACACAC]/40 disabled:text-[#ACACAC]"
          >
            {isSubmitting ? "CONNEXION..." : "SE CONNECTER"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm leading-6 text-black">
          Pas encore de compte ?{" "}
          <a href="/inscription" className="font-bold text-[#EDA415]">
            Créer un compte
          </a>
        </p>
      </main>
      <AuthFooter />
    </div>
  );
}
