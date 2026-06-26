"use client";

import Link from "next/link";
import { CheckCircle2, FileCheck, ListChecks, Store } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import { categories } from "@/data/home";
import { shopsApi, type ApplyShopPayload, type BecomeSellerInfo, type MoncashType } from "@/lib/shops";

const HAITI_PHONE = /^\+509[234]\d{7}$/;
const STRONG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const EMPTY: ApplyShopPayload = {
  email: "",
  telephone: "",
  prenom: "",
  nom: "",
  password: "",
  nom_boutique: "",
  description: "",
  categorie_principale: categories[0]?.name ?? "",
  moncash_numero: "",
  moncash_type: "standard",
  identite_url: "",
};

const fieldClass =
  "h-12 w-full rounded-xl border border-[#B3D4E5] bg-white px-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none";

export function BecomeSellerView() {
  const [info, setInfo] = useState<BecomeSellerInfo | null>(null);
  const [form, setForm] = useState<ApplyShopPayload>(EMPTY);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  useEffect(() => {
    shopsApi.becomeSellerInfo().then(setInfo).catch(() => setInfo(null));
  }, []);

  function update<K extends keyof ApplyShopPayload>(key: K, value: ApplyShopPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): string | null {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Email invalide.";
    if (!HAITI_PHONE.test(form.telephone)) return "Téléphone invalide (format +509XXXXXXXX).";
    if (!form.prenom.trim() || !form.nom.trim()) return "Prénom et nom requis.";
    if (!STRONG_PASSWORD.test(form.password))
      return "Mot de passe : min. 8 caractères avec majuscule, minuscule, chiffre et caractère spécial.";
    if (form.nom_boutique.trim().length < 2) return "Nom de boutique requis.";
    if (!HAITI_PHONE.test(form.moncash_numero)) return "Numéro MonCash invalide (format +509XXXXXXXX).";
    if (!form.identite_url.trim()) return "Le lien vers votre pièce d'identité est requis.";
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const response = await shopsApi.apply({
        ...form,
        description: form.description?.trim() ? form.description : undefined,
      });
      setApplicationId(response.application_id);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (applicationId) {
    return (
      <section className="mx-auto w-full max-w-xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E2F4FF] text-[#30BD57]">
          <CheckCircle2 aria-hidden="true" size={34} />
        </span>
        <h1 className="mt-4 text-2xl font-black text-[#4E73C7]">Demande envoyée 🎉</h1>
        <p className="mt-2 text-sm font-semibold text-gray-700">
          Votre demande sera examinée sous 24-48h. Conservez votre numéro de suivi :
        </p>
        <p className="mt-3 break-all rounded-xl bg-[#F8FAFC] px-4 py-3 text-sm font-black text-[#4E73C7]">{applicationId}</p>
        <Link
          href={`/devenir-vendeur/statut?id=${applicationId}`}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-[#EDA415] px-6 text-sm font-black text-white transition hover:bg-[#EDA415]/90"
        >
          Suivre ma demande
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
      <div>
        <p className="text-sm font-black uppercase text-[#EDA415]">Vendeurs</p>
        <h1 className="mt-1 text-3xl font-black text-[#4E73C7]">{info?.titre ?? "Devenir vendeur sur Livelo"}</h1>

        {info ? (
          <div className="mt-6 space-y-6">
            <InfoBlock icon={ListChecks} title="Étapes" items={info.etapes} ordered />
            <InfoBlock icon={FileCheck} title="Documents requis" items={info.documents_requis} />
            <InfoBlock icon={Store} title="Conditions" items={info.conditions} />
            <p className="rounded-xl bg-[#E2F4FF] px-4 py-3 text-sm font-bold text-[#4E73C7]">
              Délai de traitement : {info.delai_traitement}
            </p>
          </div>
        ) : null}

        <p className="mt-6 text-sm font-semibold text-[#ACACAC]">
          Vous avez déjà déposé une demande ?{" "}
          <Link href="/devenir-vendeur/statut" className="font-black text-[#EDA415]">
            Suivez son statut
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-[#B3D4E5] bg-white p-5 sm:p-6">
        <h2 className="text-lg font-black text-[#4E73C7]">Formulaire de candidature</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <input className={fieldClass} type="email" placeholder="Email*" value={form.email} onChange={(e) => update("email", e.target.value)} />
          <input className={fieldClass} placeholder="Téléphone* (+509...)" value={form.telephone} onChange={(e) => update("telephone", e.target.value)} />
          <input className={fieldClass} placeholder="Prénom*" value={form.prenom} onChange={(e) => update("prenom", e.target.value)} />
          <input className={fieldClass} placeholder="Nom*" value={form.nom} onChange={(e) => update("nom", e.target.value)} />
          <input className={`${fieldClass} sm:col-span-2`} type="password" placeholder="Mot de passe*" value={form.password} onChange={(e) => update("password", e.target.value)} autoComplete="new-password" />
          <input className={`${fieldClass} sm:col-span-2`} placeholder="Nom de la boutique*" value={form.nom_boutique} onChange={(e) => update("nom_boutique", e.target.value)} />
          <textarea className={`${fieldClass} h-24 py-3 sm:col-span-2`} placeholder="Description de la boutique (optionnel)" value={form.description} onChange={(e) => update("description", e.target.value)} />
          <select className={fieldClass} value={form.categorie_principale} onChange={(e) => update("categorie_principale", e.target.value)} aria-label="Catégorie principale">
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select className={fieldClass} value={form.moncash_type} onChange={(e) => update("moncash_type", e.target.value as MoncashType)} aria-label="Type MonCash">
            <option value="standard">MonCash standard</option>
            <option value="elargi">MonCash élargi</option>
          </select>
          <input className={`${fieldClass} sm:col-span-2`} placeholder="Numéro MonCash* (+509...)" value={form.moncash_numero} onChange={(e) => update("moncash_numero", e.target.value)} />
          <input className={`${fieldClass} sm:col-span-2`} placeholder="Lien photo pièce d'identité* (URL)" value={form.identite_url} onChange={(e) => update("identite_url", e.target.value)} />
        </div>

        {error ? (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 h-12 w-full rounded-xl bg-[#EDA415] text-sm font-black tracking-[0.06em] text-white transition hover:bg-[#EDA415]/90 disabled:cursor-not-allowed disabled:bg-[#ACACAC]/40"
        >
          {submitting ? "ENVOI..." : "ENVOYER MA DEMANDE"}
        </button>
      </form>
    </section>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  items,
  ordered = false,
}: {
  icon: typeof ListChecks;
  title: string;
  items: string[];
  ordered?: boolean;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-black uppercase text-[#4E73C7]">
        <Icon aria-hidden="true" size={16} />
        {title}
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, index) => (
          <li key={item} className="flex gap-2 text-sm text-gray-700">
            <span className="font-black text-[#EDA415]">{ordered ? `${index + 1}.` : "•"}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
