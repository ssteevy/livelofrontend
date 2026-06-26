import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe | Livelo Haiti",
  description: "Définissez un nouveau mot de passe pour votre compte Livelo Haiti.",
};

export default async function ReinitialiserMotDePassePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialEmail = Array.isArray(params.email) ? params.email[0] : params.email ?? "";

  return <ResetPasswordForm initialEmail={initialEmail} />;
}
