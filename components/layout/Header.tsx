"use client";

import { AtSign, Mail, MessageCircle, Phone, Send } from "lucide-react";

import { AccountMenu } from "@/components/auth/AccountMenu";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";

export function Header() {
  const { status } = useAuth();
  const isAuthenticated = status === "authenticated";

  return (
    <header className="bg-[#4E73C7] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-sm font-medium sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <a href="tel:+50900000000" className="inline-flex items-center gap-2 hover:text-[#E2F4FF]">
            <Phone aria-hidden="true" size={16} />
            +509 0000 0000
          </a>
          <a href="mailto:contact@livelo.ht" className="inline-flex items-center gap-2 hover:text-[#E2F4FF]">
            <Mail aria-hidden="true" size={16} />
            contact@livelo.ht
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href="#support" className="hover:text-[#E2F4FF]">Support</a>
          <a href="#suivi" className="hover:text-[#E2F4FF]">Suivi commande</a>
          <div className="flex items-center gap-2" aria-label="Réseaux sociaux Livelo">
            <a href="#facebook" aria-label="Facebook" className="hover:text-[#EDA415]"><MessageCircle size={16} /></a>
            <a href="#instagram" aria-label="Instagram" className="hover:text-[#EDA415]"><AtSign size={16} /></a>
            <a href="#linkedin" aria-label="LinkedIn" className="hover:text-[#EDA415]"><Send size={16} /></a>
          </div>
          {isAuthenticated ? (
            <AccountMenu />
          ) : status === "loading" ? null : (
            <>
              <Button href="/connexion" variant="ghost" className="min-h-9 px-3 py-2">Connexion</Button>
              <Button href="/inscription" variant="accent" className="min-h-9 px-3 py-2">Inscription</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
