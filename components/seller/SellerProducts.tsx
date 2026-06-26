"use client";

import Image from "next/image";
import { ImageIcon, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import { formatHtg } from "@/lib/format";
import { categories } from "@/data/home";
import { productsApi, type Product } from "@/lib/products";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState, ErrorState } from "@/components/ui/StateBlocks";

const fieldClass =
  "h-12 w-full rounded-xl border border-[#B3D4E5] bg-white px-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none";

interface FormState {
  titre: string;
  description: string;
  prix: string;
  prix_promo: string;
  stock: string;
  categorie: string;
  sous_categorie: string;
}

const EMPTY_FORM: FormState = {
  titre: "",
  description: "",
  prix: "",
  prix_promo: "",
  stock: "0",
  categorie: categories[0]?.name ?? "",
  sous_categorie: "",
};

export function SellerProducts({ token, shopId }: { token: string; shopId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    productsApi
      .list({ shop_id: shopId, limit: 100 })
      .then((response) => setProducts(response.data))
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [shopId]);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFiles([]);
    setFormError("");
    setShowForm(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setForm({
      titre: product.titre,
      description: product.description ?? "",
      prix: String(product.prix),
      prix_promo: product.prix_promo ? String(product.prix_promo) : "",
      stock: String(product.stock),
      categorie: product.categorie,
      sous_categorie: product.sous_categorie ?? "",
    });
    setFiles([]);
    setFormError("");
    setShowForm(true);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prix = Number(form.prix);
    const stock = Number(form.stock);
    if (!form.titre.trim() || form.titre.trim().length < 2) {
      setFormError("Titre requis (min. 2 caractères).");
      return;
    }
    if (Number.isNaN(prix) || prix < 0) {
      setFormError("Prix invalide.");
      return;
    }
    const prixPromo = form.prix_promo ? Number(form.prix_promo) : undefined;
    if (prixPromo !== undefined && (Number.isNaN(prixPromo) || prixPromo > prix)) {
      setFormError("Le prix promo doit être inférieur au prix.");
      return;
    }

    setSaving(true);
    setFormError("");
    try {
      const payload = {
        titre: form.titre.trim(),
        description: form.description.trim() || undefined,
        prix,
        prix_promo: prixPromo,
        stock: Number.isNaN(stock) ? 0 : stock,
        categorie: form.categorie,
        sous_categorie: form.sous_categorie.trim() || undefined,
      };

      let productId: string;
      if (editing) {
        const updated = await productsApi.update(token, editing.id, payload);
        productId = updated.id;
      } else {
        const created = await productsApi.create(token, { ...payload, shop_id: shopId });
        productId = created.id;
      }

      if (files.length > 0) {
        await productsApi.uploadImages(token, productId, files);
      }

      setShowForm(false);
      load();
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function archive(product: Product) {
    if (!window.confirm(`Archiver « ${product.titre} » ?`)) return;
    try {
      await productsApi.archive(token, product.id);
      load();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-black text-[#4E73C7]">Mes produits</h2>
        <button onClick={openCreate} type="button" className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#EDA415] px-4 text-sm font-black text-white transition hover:bg-[#EDA415]/90">
          <Plus aria-hidden="true" size={18} />
          Nouveau produit
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border border-[#B3D4E5] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-black text-[#4E73C7]">{editing ? "Modifier le produit" : "Nouveau produit"}</h3>
            <button type="button" onClick={() => setShowForm(false)} aria-label="Fermer" className="text-[#ACACAC] hover:text-[#4E73C7]">
              <X size={20} />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={`${fieldClass} sm:col-span-2`} placeholder="Titre*" value={form.titre} onChange={(e) => update("titre", e.target.value)} />
            <textarea className={`${fieldClass} h-24 py-3 sm:col-span-2`} placeholder="Description" value={form.description} onChange={(e) => update("description", e.target.value)} />
            <input className={fieldClass} type="number" min="0" placeholder="Prix HTG*" value={form.prix} onChange={(e) => update("prix", e.target.value)} />
            <input className={fieldClass} type="number" min="0" placeholder="Prix promo HTG" value={form.prix_promo} onChange={(e) => update("prix_promo", e.target.value)} />
            <input className={fieldClass} type="number" min="0" placeholder="Stock*" value={form.stock} onChange={(e) => update("stock", e.target.value)} />
            <select className={fieldClass} value={form.categorie} onChange={(e) => update("categorie", e.target.value)} aria-label="Catégorie">
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <input className={`${fieldClass} sm:col-span-2`} placeholder="Sous-catégorie" value={form.sous_categorie} onChange={(e) => update("sous_categorie", e.target.value)} />
          </div>

          <div className="mt-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 5))}
            />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#B3D4E5] bg-white px-4 text-sm font-black text-[#4E73C7] transition hover:bg-[#E2F4FF]">
              <Upload aria-hidden="true" size={17} />
              {files.length > 0 ? `${files.length} image(s) sélectionnée(s)` : "Ajouter des images (max 5)"}
            </button>
          </div>

          {formError ? (
            <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {formError}
            </p>
          ) : null}

          <button type="submit" disabled={saving} className="mt-4 h-12 w-full rounded-xl bg-[#4E73C7] text-sm font-black text-white transition hover:bg-[#4E73C7]/90 disabled:opacity-50 sm:w-auto sm:px-8">
            {saving ? "Enregistrement..." : editing ? "Mettre à jour" : "Créer le produit"}
          </button>
        </form>
      ) : null}

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : products.length === 0 ? (
        <EmptyState title="Aucun produit actif" message="Créez votre premier produit pour le rendre visible dans le catalogue." />
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <article key={product.id} className="flex items-center gap-4 rounded-2xl border border-[#B3D4E5] bg-white p-3">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#E2F4FF]">
                {product.images?.[0] ? (
                  <Image src={product.images[0]} alt={product.titre} fill sizes="64px" className="object-cover" />
                ) : (
                  <ImageIcon aria-hidden="true" className="text-[#4E73C7]/50" size={24} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-[#4E73C7]">{product.titre}</p>
                <p className="text-xs font-semibold text-[#ACACAC]">
                  {formatHtg(product.prix_promo && product.prix_promo < product.prix ? product.prix_promo : product.prix)} · Stock {product.stock}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => openEdit(product)} aria-label="Modifier" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#B3D4E5] text-[#4E73C7] transition hover:bg-[#E2F4FF]">
                  <Pencil size={17} />
                </button>
                <button type="button" onClick={() => archive(product)} aria-label="Archiver" className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50">
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
