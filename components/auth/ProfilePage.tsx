"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LayoutDashboard, ListOrdered, LogOut, Mail, MapPin, Save, ShieldCheck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { getApiErrorMessage } from "@/lib/api";
import { usersApi } from "@/lib/users";
import { CitySelect } from "@/components/catalog/CitySelect";

const fieldClass =
  "h-12 w-full rounded-xl border border-[#B3D4E5] bg-white px-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none";

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

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/" aria-label="Retour à l'accueil" className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#B3D4E5] text-[#4E73C7] transition hover:bg-[#E2F4FF]">
        <ArrowLeft aria-hidden="true" size={20} />
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase text-[#EDA415]">Mon compte</p>
          <h1 className="mt-1 text-2xl font-black text-[#4E73C7]">
            {[user.prenom, user.nom].filter(Boolean).join(" ") || user.email}
          </h1>
          <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold capitalize text-gray-700">
            <ShieldCheck aria-hidden="true" size={15} className="text-[#30BD57]" />
            {user.role}
          </p>
        </div>
        <button
          type="button"
          onClick={() => logout().then(() => router.replace("/connexion"))}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#EDA415] px-4 text-sm font-black text-white transition hover:bg-[#EDA415]/90"
        >
          <LogOut aria-hidden="true" size={17} />
          Déconnexion
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/commandes" className="inline-flex items-center gap-2 rounded-xl border border-[#B3D4E5] bg-white px-4 py-2.5 text-sm font-black text-[#4E73C7] transition hover:bg-[#E2F4FF]">
          <ListOrdered aria-hidden="true" size={17} />
          Mes commandes
        </Link>
        {isSeller ? (
          <Link href="/vendeur" className="inline-flex items-center gap-2 rounded-xl border border-[#B3D4E5] bg-white px-4 py-2.5 text-sm font-black text-[#4E73C7] transition hover:bg-[#E2F4FF]">
            <LayoutDashboard aria-hidden="true" size={17} />
            Espace vendeur
          </Link>
        ) : null}
        {isAdmin ? (
          <Link href="/admin/demandes" className="inline-flex items-center gap-2 rounded-xl border border-[#B3D4E5] bg-white px-4 py-2.5 text-sm font-black text-[#4E73C7] transition hover:bg-[#E2F4FF]">
            <LayoutDashboard aria-hidden="true" size={17} />
            Espace admin
          </Link>
        ) : null}
      </div>

      {feedback ? (
        <p
          role="alert"
          className={`mt-6 rounded-xl px-4 py-3 text-sm font-semibold ${
            feedback.type === "success" ? "bg-[#E2F4FF] text-[#30BD57]" : "bg-red-50 text-red-700"
          }`}
        >
          {feedback.message}
        </p>
      ) : null}

      <form onSubmit={saveProfile} className="mt-6 rounded-2xl border border-[#B3D4E5] bg-white p-5 sm:p-6">
        <h2 className="text-lg font-black text-[#4E73C7]">Informations personnelles</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input className={fieldClass} placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
          <input className={fieldClass} placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
          <input className={`${fieldClass} sm:col-span-2`} placeholder="Téléphone (+509...)" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#B3D4E5] bg-[#F8FAFC] px-4 py-3">
          <Mail aria-hidden="true" size={18} className="text-[#4E73C7]" />
          <span className="text-sm font-semibold text-gray-700">{user.email}</span>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="mt-4 inline-flex h-12 items-center gap-2 rounded-xl bg-[#4E73C7] px-6 text-sm font-black text-white transition hover:bg-[#4E73C7]/90 disabled:opacity-50"
        >
          <Save aria-hidden="true" size={17} />
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </form>

      <div className="mt-6 rounded-2xl border border-[#B3D4E5] bg-white p-5 sm:p-6">
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
      </div>
    </section>
  );
}
