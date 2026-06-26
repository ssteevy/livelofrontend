import type { Metadata } from "next";

import { CartView } from "@/components/cart/CartView";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Mon panier | Livelo Haiti",
  description: "Consultez votre panier, ajustez les quantités et vérifiez la livraison dans votre ville.",
};

export default function PanierPage() {
  return (
    <SiteShell>
      <CartView />
    </SiteShell>
  );
}
