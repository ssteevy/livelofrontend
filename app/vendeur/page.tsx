import type { Metadata } from "next";

import { SellerDashboard } from "@/components/seller/SellerDashboard";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Espace vendeur | Livelo Haiti",
  description: "Gérez votre boutique, vos produits et vos zones de livraison Livelo.",
};

export default function VendeurPage() {
  return (
    <SiteShell>
      <SellerDashboard />
    </SiteShell>
  );
}
