import type { Metadata } from "next";

import { OrdersView } from "@/components/buyer/OrdersView";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Mes commandes | Livelo Haiti",
  description: "Suivez l'historique et le statut de vos commandes Livelo.",
};

export default function CommandesPage() {
  return (
    <SiteShell>
      <OrdersView />
    </SiteShell>
  );
}
