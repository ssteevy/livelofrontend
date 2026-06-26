import type { Metadata } from "next";

import { ProfilePage } from "@/components/auth/ProfilePage";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Profil | Livelo Haiti",
  description: "Consultez votre profil Livelo Haiti, modifiez vos informations et votre ville.",
};

export default function ProfilPage() {
  return (
    <SiteShell>
      <ProfilePage />
    </SiteShell>
  );
}
