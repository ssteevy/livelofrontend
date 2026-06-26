import type { Metadata } from "next";

import { AdminApplications } from "@/components/admin/AdminApplications";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Demandes vendeur | Admin Livelo",
  description: "Validez ou rejetez les demandes des vendeurs Livelo.",
};

export default function AdminDemandesPage() {
  return (
    <SiteShell>
      <AdminApplications />
    </SiteShell>
  );
}
