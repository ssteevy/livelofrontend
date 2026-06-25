import type { Metadata } from "next";

import { ProfilePage } from "@/components/auth/ProfilePage";

export const metadata: Metadata = {
  title: "Profil | Livelo Haiti",
  description: "Consultez votre profil Livelo Haiti et gérez votre session.",
};

export default function ProfilPage() {
  return <ProfilePage />;
}
