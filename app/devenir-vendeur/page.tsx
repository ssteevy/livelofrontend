import type { Metadata } from "next";

import { BecomeSellerView } from "@/components/seller/BecomeSellerView";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Devenir vendeur | Livelo Haiti",
  description: "Ouvrez votre boutique sur Livelo : conditions, étapes et formulaire de candidature.",
};

export default function DevenirVendeurPage() {
  return (
    <SiteShell>
      <BecomeSellerView />
    </SiteShell>
  );
}
