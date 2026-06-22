import type { Metadata } from "next";

import { SignupFlow } from "@/components/auth/SignupFlow";

export const metadata: Metadata = {
  title: "Inscription | Livelo Haiti",
  description: "Créez votre compte Livelo Haiti avec vérification email, mot de passe sécurisé et informations personnelles.",
};

export default function InscriptionPage() {
  return <SignupFlow />;
}
