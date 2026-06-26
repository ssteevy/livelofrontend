"use client";

import { MapPin, Plus, Trash2 } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import { formatHtg } from "@/lib/format";
import { shopsApi, type DeliveryZone } from "@/lib/shops";
import { CitySelect } from "@/components/catalog/CitySelect";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState, ErrorState } from "@/components/ui/StateBlocks";

export function SellerZones({ token, shopId }: { token: string; shopId: string }) {
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cityId, setCityId] = useState("");
  const [price, setPrice] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    shopsApi
      .deliveryZones(shopId)
      .then(setZones)
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [shopId]);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  async function addZone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prix = Number(price);
    if (!cityId) {
      setFormError("Choisissez une ville.");
      return;
    }
    if (Number.isNaN(prix) || prix < 0) {
      setFormError("Prix de livraison invalide.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      await shopsApi.upsertDeliveryZone(token, shopId, cityId, prix);
      setCityId("");
      setPrice("");
      load();
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function removeZone(zone: DeliveryZone) {
    if (!window.confirm(`Supprimer la zone ${zone.cities?.nom ?? ""} ?`)) return;
    try {
      await shopsApi.removeDeliveryZone(token, shopId, zone.city_id);
      load();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <div>
      <h2 className="mb-1 text-lg font-black text-[#4E73C7]">Zones de livraison</h2>
      <p className="mb-5 text-sm font-semibold text-[#ACACAC]">Définissez les villes que vous livrez et leur prix (en HTG).</p>

      <form onSubmit={addZone} className="mb-6 grid gap-3 rounded-2xl border border-[#B3D4E5] bg-white p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
        <CitySelect value={cityId} onChange={(value) => setCityId(value)} placeholder="Choisir une ville" />
        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Prix HTG"
          className="h-11 rounded-xl border border-[#B3D4E5] bg-white px-3 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none"
        />
        <button type="submit" disabled={saving} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#EDA415] px-4 text-sm font-black text-white transition hover:bg-[#EDA415]/90 disabled:opacity-50">
          <Plus aria-hidden="true" size={18} />
          {saving ? "..." : "Ajouter"}
        </button>
        {formError ? (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 sm:col-span-3">
            {formError}
          </p>
        ) : null}
      </form>

      {loading ? (
        <Skeleton className="h-24 w-full" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : zones.length === 0 ? (
        <EmptyState title="Aucune zone" message="Ajoutez au moins une ville pour que vos produits apparaissent dans le catalogue." />
      ) : (
        <div className="space-y-3">
          {zones.map((zone) => (
            <article key={zone.id} className="flex items-center justify-between gap-4 rounded-2xl border border-[#B3D4E5] bg-white p-4">
              <p className="flex items-center gap-2 text-sm font-black text-[#4E73C7]">
                <MapPin aria-hidden="true" size={16} />
                {zone.cities?.nom ?? "Ville"}
                {zone.cities?.departments?.nom ? <span className="font-semibold text-[#ACACAC]">· {zone.cities.departments.nom}</span> : null}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-[#30BD57]">{formatHtg(zone.prix_livraison_htg)}</span>
                <button type="button" onClick={() => removeZone(zone)} aria-label="Supprimer" className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50">
                  <Trash2 size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
