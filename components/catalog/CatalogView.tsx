"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { buildQuery, getApiErrorMessage } from "@/lib/api";
import { productsApi, type Product } from "@/lib/products";
import { categories } from "@/data/home";
import { CitySelect } from "@/components/catalog/CitySelect";
import { ProductGrid } from "@/components/catalog/ProductGrid";

const LIMIT = 24;

export interface CatalogInitial {
  search: string;
  categorie: string;
  cityId: string;
  page: number;
}

export function CatalogView({ initial }: { initial: CatalogInitial }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(initial.search);
  const [search, setSearch] = useState(initial.search);
  const [categorie, setCategorie] = useState(initial.categorie);
  const [cityId, setCityId] = useState(initial.cityId);
  const [page, setPage] = useState(initial.page);

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    productsApi
      .list({ search, categorie, city_id: cityId, page, limit: LIMIT })
      .then((response) => {
        setProducts(response.data);
        setTotal(response.total);
      })
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [search, categorie, cityId, page]);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  // Garde l'URL synchronisée pour le partage / rechargement.
  useEffect(() => {
    const qs = buildQuery({ search, categorie, city_id: cityId, page: page > 1 ? page : undefined });
    router.replace(`/produits${qs}`, { scroll: false });
  }, [router, search, categorie, cityId, page]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-sm font-black uppercase text-[#EDA415]">Catalogue</p>
        <h1 className="mt-1 text-3xl font-black text-[#4E73C7]">Tous les produits</h1>
      </header>

      <div className="mb-8 grid gap-3 rounded-2xl border border-[#B3D4E5] bg-white p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
        <form onSubmit={submitSearch} className="relative">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ACACAC]" size={18} />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Rechercher un produit..."
            className="h-11 w-full rounded-xl border border-[#B3D4E5] bg-[#F8FAFC] pl-10 pr-4 text-sm font-semibold text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none"
          />
        </form>

        <select
          value={categorie}
          onChange={(event) => {
            setPage(1);
            setCategorie(event.target.value);
          }}
          aria-label="Filtrer par catégorie"
          className="h-11 rounded-xl border border-[#B3D4E5] bg-white px-3 text-sm font-semibold text-[#4E73C7] focus:border-[#4E73C7] focus:outline-none"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="min-w-44">
          <CitySelect
            value={cityId}
            onChange={(value) => {
              setPage(1);
              setCityId(value);
            }}
            placeholder="Toutes les villes"
          />
        </div>
      </div>

      {!loading && !error ? (
        <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#ACACAC]">
          <SlidersHorizontal aria-hidden="true" size={16} />
          {total} produit{total > 1 ? "s" : ""} trouvé{total > 1 ? "s" : ""}
          {cityId ? " livrable(s) dans la ville sélectionnée" : ""}
        </p>
      ) : null}

      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        onRetry={load}
        emptyTitle="Aucun produit"
        emptyMessage={
          cityId
            ? "Aucune boutique ne livre encore dans cette ville pour ces filtres."
            : "Aucun produit ne correspond à votre recherche."
        }
        skeletonCount={LIMIT}
      />

      {totalPages > 1 ? (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex h-11 items-center gap-1 rounded-xl border border-[#B3D4E5] bg-white px-4 text-sm font-black text-[#4E73C7] transition hover:bg-[#E2F4FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
            Précédent
          </button>
          <span className="text-sm font-black text-[#4E73C7]">
            Page {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex h-11 items-center gap-1 rounded-xl border border-[#B3D4E5] bg-white px-4 text-sm font-black text-[#4E73C7] transition hover:bg-[#E2F4FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Suivant
            <ChevronRight size={18} />
          </button>
        </div>
      ) : null}
    </section>
  );
}
