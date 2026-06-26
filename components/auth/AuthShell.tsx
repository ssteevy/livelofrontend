import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, ShieldCheck, Truck, Wallet } from "lucide-react";

const perks = [
  { icon: Wallet, text: "Paiement mobile MonCash, simple et rapide" },
  { icon: ShieldCheck, text: "Escrow Livelo : payé seulement à la livraison" },
  { icon: Truck, text: "Livraison dans les 10 départements d'Haïti" },
  { icon: BadgeCheck, text: "Des milliers de produits de boutiques vérifiées" },
];

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* Panneau marque — desktop */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#4E73C7] to-[#4E73C7]/80 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-[#EDA415]/20 blur-3xl" />

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white">
            <Image src="/livelo-auth-favicon.png" alt="Livelo" width={48} height={48} className="h-full w-full object-cover" />
          </span>
          <span className="text-xl font-black">Livelo Haiti</span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-3xl font-black leading-tight xl:text-4xl">
            La marketplace qui rapproche Haïti de vous.
          </h2>
          <ul className="mt-8 space-y-4">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <li key={perk.text} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                    <Icon aria-hidden="true" size={20} className="text-[#EDA415]" />
                  </span>
                  <span className="text-sm font-semibold text-white/90">{perk.text}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="relative z-10 text-xs font-semibold text-white/70">
          © {new Date().getFullYear()} Livelo Haiti — Full Bridge Digital
        </p>
      </aside>

      {/* Colonne formulaire */}
      <main className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-4 pt-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415]">
            <ArrowLeft aria-hidden="true" size={18} />
            Accueil
          </Link>
          <span className="relative h-9 w-9 overflow-hidden rounded-xl lg:hidden">
            <Image src="/livelo-auth-favicon.png" alt="Livelo Haiti" fill sizes="36px" className="object-cover" />
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
          <div className="w-full max-w-md">{children}</div>
        </div>

        <p className="px-4 pb-8 text-center text-xs text-[#ACACAC]">
          Besoin d&apos;aide ?{" "}
          <a href="tel:+50900000000" className="font-bold text-[#4E73C7]">
            +509 0000 0000
          </a>
        </p>
      </main>
    </div>
  );
}
