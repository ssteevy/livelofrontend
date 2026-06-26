import type { Metadata } from "next";

import { ApplicationStatusView } from "@/components/seller/ApplicationStatusView";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Statut de ma demande | Livelo Haiti",
  description: "Suivez l'état de votre demande pour devenir vendeur sur Livelo.",
};

export default async function StatutDemandePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialId = Array.isArray(params.id) ? params.id[0] : params.id ?? "";

  return (
    <SiteShell>
      <ApplicationStatusView initialId={initialId} />
    </SiteShell>
  );
}
