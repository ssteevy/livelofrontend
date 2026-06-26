import type { Metadata } from "next";

import { ShopView } from "@/components/catalog/ShopView";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Boutique | Livelo Haiti",
  description: "Découvrez la boutique, ses produits et ses zones de livraison.",
};

export default async function BoutiquePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <SiteShell>
      <ShopView shopId={id} />
    </SiteShell>
  );
}
