"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, ListOrdered, LogOut, Mail, MapPin, Save, ShieldCheck, ShoppingBag, Store } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { getApiErrorMessage } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { usersApi } from "@/lib/users";
import { CitySelect } from "@/components/catalog/CitySelect";

const fieldClass =
  "h-12 w-full rounded-xl border border-[#B3D4E5] bg-white px-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none";

const ROLE_LABEL: Record<string, string> = {
  buyer: "Acheteur",
  seller: "Vendeur",
  livreur: "Livreur",
  admin: "Administrateur",
};

export function ProfilePage() {
  const router = useRouter();
  const { status, user, tokens, logout, refreshUser } = useAuth();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cityId, setCityId] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/connexion");
  }, [router, status]);

  useEffect(() => {
    if (!user) return;
    void Promise.resolve().then(() => {
      setPrenom(user.prenom ?? "");
      setNom(user.nom ?? "");
      setTelephone(user.telephone ?? "");
      setCityId(user.city_id ?? "");
    });
  }, [user]);

  if (status === "loading") {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 text-center">
        <p className="text-sm font-black uppercase tracking-[0.08em] text-[#4E73C7]">Chargement du profil...</p>
      </main>
    );
  }

  if (!user || !tokens) return null;

  const token = tokens.access_token;
  const isSeller = user.role === "seller";
  const isAdmin = user.role === "admin";
  const initials = [user.prenom?.[0], user.nom?.[0]].filter(Boolean).join("").toUpperCase() || "L";
  const fullName = [user.prenom, user.nom].filter(Boolean).join(" ") || "Utilisateur Livelo";

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);
    try {
      await usersApi.updateProfile(token, {
        prenom: prenom.trim() || undefined,
        nom: nom.trim() || undefined,
        telephone: telephone.trim() || undefined,
      });
      await refreshUser();
      setFeedback({ type: "success", message: "Profil mis à jour." });
    } catch (err) {
      setFeedback({ type: "error", message: getApiErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  }

  async function changeCity(value: string) {
    setCityId(value);
    if (!value) return;
    setFeedback(null);
    try {
      await usersApi.updateCity(token, value);
      await refreshUser();
      setFeedback({ type: "success", message: "Ville mise à jour." });
    } catch (err) {
      setFeedback({ type: "error", message: getApiErrorMessage(err) });
    }
  }

  const shortcuts = [
    { label: "Mes commandes", href: "/commandes", icon: ListOrdered, show: true },
    { label: "Mon panier", href: "/panier", icon: ShoppingBag, show: true },
    { label: "Espace vendeur", href: "/vendeur", icon: Store, show: isSeller },
    { label: "Espace admin", href: "/admin/demandes", icon: LayoutDashboard, show: isAdmin },
  ].filter((s) => s.show);

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="overflow-hidden rounded-3xl border border-[#B3D4E5] bg-white">
        <div className="h-24 bg-gradient-to-r from-[#4E73C7] to-[#4E73C7]/80 sm:h-28" />
        <div className="px-5 pb-5 sm:px-6">
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <span className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-[#EDA415] text-2xl font-black text-white shadow-lg">
                {initials}
              </span>
              <div className="pb-1">
                <h1 className="text-xl font-black text-[#4E73C7] sm:text-2xl">{fullName}</h1>
                <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#E2F4FF] px-3 py-1 text-xs font-black text-[#4E73C7]">
                  <ShieldCheck aria-hidden="true" size={13} className="text-[#30BD57]" />
                  {ROLE_LABEL[user.role] ?? user.role}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => logout().then(() => router.replace("/connexion"))}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#B3D4E5] bg-white px-4 text-sm font-black text-[#4E73C7] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut aria-hidden="true" size={17} />
              Déconnexion
            </button>
          </div>
          <p className="mt-3 text-xs font-semibold text-[#ACACAC]">Membre depuis {formatDate(user.created_at)}</p>
        </div>
      </div>

      {/* Raccourcis */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {shortcuts.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-[#B3D4E5] bg-white p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#EDA415]/50 hover:shadow-[0_12px_30px_rgba(78,115,199,0.12)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E2F4FF] text-[#4E73C7] transition group-hover:bg-[#EDA415] group-hover:text-white">
                <Icon aria-hidden="true" size={21} />
              </span>
              <span className="text-xs font-black text-[#4E73C7]">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {feedback ? (
        <p role="alert" className={`mt-5 rounded-xl px-4 py-3 text-sm font-semibold ${feedback.type === "success" ? "bg-[#E2F4FF] text-[#30BD57]" : "bg-red-50 text-red-700"}`}>
          {feedback.message}
        </p>
      ) : null}

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Infos personnelles */}
        <form onSubmit={saveProfile} className="rounded-2xl border border-[#B3D4E5] bg-white p-5 sm:p-6">
          <h2 className="text-lg font-black text-[#4E73C7]">Informations personnelles</h2>
          <div className="mt-4 grid gap-3">
            <input className={fieldClass} placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            <input className={fieldClass} placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            <input className={fieldClass} placeholder="Téléphone (+509...)" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            <div className="flex items-center gap-3 rounded-xl border border-[#B3D4E5] bg-[#F8FAFC] px-4 py-3">
              <Mail aria-hidden="true" size={18} className="text-[#4E73C7]" />
              <span className="truncate text-sm font-semibold text-gray-700">{user.email}</span>
            </div>
          </div>
          <button type="submit" disabled={saving} className="mt-4 inline-flex h-12 items-center gap-2 rounded-xl bg-[#4E73C7] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#4E73C7]/90 disabled:opacity-50">
            <Save aria-hidden="true" size={17} />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>

        {/* Ville */}
        <div className="rounded-2xl border border-[#B3D4E5] bg-white p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-black text-[#4E73C7]">
            <MapPin aria-hidden="true" size={18} />
            Ma ville de livraison
          </h2>
          <p className="mb-3 mt-1 text-sm font-semibold text-[#ACACAC]">
            {user.cities?.nom
              ? `Actuelle : ${user.cities.nom}${user.cities.departments?.nom ? `, ${user.cities.departments.nom}` : ""}`
              : "Aucune ville renseignée."}
          </p>
          <CitySelect value={cityId} onChange={(value) => changeCity(value)} placeholder="Choisir ma ville" />
          <p className="mt-3 rounded-xl bg-[#E2F4FF] px-4 py-3 text-xs font-semibold text-[#4E73C7]">
            Votre ville détermine les boutiques et produits livrables près de vous.
          </p>
        </div>
      </div>
    </section>
  );
}
