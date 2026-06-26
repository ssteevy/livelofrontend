"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { getApiErrorMessage } from "@/lib/api";
import { productsApi, type Product } from "@/lib/products";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Reveal } from "@/components/ui/Reveal";

export function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    productsApi
      .list({ limit: 14 })
      .then((response) => setProducts(response.data))
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  return (
    <section id="produits" className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="w-full">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#EDA415]">Produits populaires</p>
            <h2 className="mt-2 text-3xl font-black text-[#4E73C7] sm:text-4xl">Les meilleures offres près de vous</h2>
          </div>
          <Link href="/produits" className="inline-flex items-center gap-2 text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415]">
            Voir tout le catalogue
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </Reveal>
        <div className="mt-8">
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onRetry={load}
            emptyTitle="Catalogue en construction"
            emptyMessage="Aucun produit n'est encore publié. Revenez bientôt !"
            skeletonCount={14}
          />
        </div>
      </div>
    </section>
  );
}
