import type { Metadata } from "next";

import { ProductDetailView } from "@/components/catalog/ProductDetailView";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Produit | Livelo Haiti",
  description: "Détail du produit, prix et disponibilité de livraison par ville.",
};

export default async function ProduitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <SiteShell>
      <ProductDetailView productId={id} />
    </SiteShell>
  );
}
