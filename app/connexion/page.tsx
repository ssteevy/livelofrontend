import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Connexion | Livelo Haiti",
  description: "Connectez-vous à votre compte Livelo Haiti avec votre email et votre mot de passe.",
};

export default function ConnexionPage() {
  return <LoginForm />;
}
