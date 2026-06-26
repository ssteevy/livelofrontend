"use client";

import { Save } from "lucide-react";
import { FormEvent, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import { categories } from "@/data/home";
import { shopsApi, type MoncashType, type ShopOwner } from "@/lib/shops";

const fieldClass =
  "h-12 w-full rounded-xl border border-[#B3D4E5] bg-white px-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none";

export function SellerShopForm({
  token,
  shop,
  onUpdated,
}: {
  token: string;
  shop: ShopOwner;
  onUpdated: (shop: ShopOwner) => void;
}) {
  const [nom, setNom] = useState(shop.nom);
  const [description, setDescription] = useState(shop.description ?? "");
  const [categorie, setCategorie] = useState(shop.categorie_principale);
  const [moncashNumero, setMoncashNumero] = useState(shop.moncash_numero);
  const [moncashType, setMoncashType] = useState<MoncashType>(shop.moncash_type);
  const [logoUrl, setLogoUrl] = useState(shop.logo_url ?? "");
  const [bannerUrl, setBannerUrl] = useState(shop.banner_url ?? "");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);
    try {
      const updated = await shopsApi.update(token, shop.id, {
        nom: nom.trim(),
        description: description.trim() || undefined,
        categorie_principale: categorie,
        moncash_numero: moncashNumero.trim(),
        moncash_type: moncashType,
        logo_url: logoUrl.trim() || undefined,
        banner_url: bannerUrl.trim() || undefined,
      });
      onUpdated(updated);
      setFeedback({ type: "success", message: "Boutique mise à jour." });
    } catch (err) {
      setFeedback({ type: "error", message: getApiErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[#B3D4E5] bg-white p-5 sm:p-6">
      <h2 className="text-lg font-black text-[#4E73C7]">Ma boutique</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input className={`${fieldClass} sm:col-span-2`} placeholder="Nom de la boutique" value={nom} onChange={(e) => setNom(e.target.value)} />
        <textarea className={`${fieldClass} h-24 py-3 sm:col-span-2`} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select className={fieldClass} value={categorie} onChange={(e) => setCategorie(e.target.value)} aria-label="Catégorie principale">
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <select className={fieldClass} value={moncashType} onChange={(e) => setMoncashType(e.target.value as MoncashType)} aria-label="Type MonCash">
          <option value="standard">MonCash standard</option>
          <option value="elargi">MonCash élargi</option>
        </select>
        <input className={`${fieldClass} sm:col-span-2`} placeholder="Numéro MonCash (+509...)" value={moncashNumero} onChange={(e) => setMoncashNumero(e.target.value)} />
        <input className={fieldClass} placeholder="URL du logo" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
        <input className={fieldClass} placeholder="URL de la bannière" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} />
      </div>

      {feedback ? (
        <p role="alert" className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${feedback.type === "success" ? "bg-[#E2F4FF] text-[#30BD57]" : "bg-red-50 text-red-700"}`}>
          {feedback.message}
        </p>
      ) : null}

      <button type="submit" disabled={saving} className="mt-4 inline-flex h-12 items-center gap-2 rounded-xl bg-[#4E73C7] px-6 text-sm font-black text-white transition hover:bg-[#4E73C7]/90 disabled:opacity-50">
        <Save aria-hidden="true" size={17} />
        {saving ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
}
