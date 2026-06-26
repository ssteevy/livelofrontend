import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Mot de passe oublié | Livelo Haiti",
  description: "Recevez un code pour réinitialiser le mot de passe de votre compte Livelo Haiti.",
};

export default function MotDePasseOubliePage() {
  return <ForgotPasswordForm />;
}
