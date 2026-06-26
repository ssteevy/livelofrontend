import type { Metadata } from "next";

import { CatalogView, type CatalogInitial } from "@/components/catalog/CatalogView";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Catalogue | Livelo Haiti",
  description: "Parcourez tous les produits des boutiques Livelo, filtrez par ville et catégorie.",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProduitsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initial: CatalogInitial = {
    search: first(params.search) ?? "",
    categorie: first(params.categorie) ?? "",
    cityId: first(params.city_id) ?? "",
    page: Number(first(params.page)) > 0 ? Number(first(params.page)) : 1,
  };

  return (
    <SiteShell>
      <CatalogView initial={initial} />
    </SiteShell>
  );
}
