"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { useEffect } from "react";

import { useAuth } from "@/components/auth/AuthProvider";

function ProfileRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#B3D4E5] bg-white p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E2F4FF] text-[#4E73C7]">
        <Icon aria-hidden="true" size={19} />
      </span>
      <span>
        <span className="block text-xs font-black uppercase text-[#EDA415]">{label}</span>
        <span className="mt-1 block text-sm font-semibold text-gray-700">{value}</span>
      </span>
    </div>
  );
}

export function ProfilePage() {
  const router = useRouter();
  const { status, user, logout } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/connexion");
  }, [router, status]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 text-center">
        <p className="text-sm font-black uppercase tracking-[0.08em] text-[#4E73C7]">Chargement du profil...</p>
      </main>
    );
  }

  if (!user) return null;

  const fullName = [user.prenom, user.nom].filter(Boolean).join(" ") || "Utilisateur Livelo";
  const city = user.cities?.nom
    ? `${user.cities.nom}${user.cities.departments?.nom ? `, ${user.cities.departments.nom}` : ""}`
    : "Ville non renseignée";

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-2xl border border-[#B3D4E5] bg-white p-6 shadow-[0_24px_70px_rgba(78,115,199,0.12)] sm:p-8">
        <Link
          href="/"
          aria-label="Retour à l'accueil"
          className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#B3D4E5] text-[#4E73C7] transition hover:bg-[#E2F4FF]"
        >
          <ArrowLeft aria-hidden="true" size={20} />
        </Link>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl shadow-[0_10px_28px_rgba(78,115,199,0.16)]">
              <Image
                src="/livelo-auth-favicon.png"
                alt="Livelo Haiti"
                fill
                priority
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-black uppercase text-[#EDA415]">Compte connecté</p>
              <h1 className="mt-1 text-2xl font-black text-[#4E73C7]">{fullName}</h1>
              <p className="mt-1 text-sm font-semibold text-gray-700">{user.role}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => logout().then(() => router.replace("/connexion"))}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#EDA415] px-5 text-sm font-black text-white transition hover:bg-[#EDA415]/90"
          >
            <LogOut aria-hidden="true" size={18} />
            Déconnexion
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ProfileRow icon={Mail} label="Email" value={user.email} />
          <ProfileRow icon={Phone} label="Téléphone" value={user.telephone || "Non renseigné"} />
          <ProfileRow icon={MapPin} label="Ville" value={city} />
          <ProfileRow icon={UserRound} label="Date d'inscription" value={user.created_at ? new Date(user.created_at).toLocaleDateString("fr-FR") : "Non disponible"} />
        </div>
      </section>
    </main>
  );
}
