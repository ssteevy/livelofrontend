import Image from "next/image";
import Link from "next/link";
import { AtSign, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck, Truck, Wallet } from "lucide-react";

const columns = [
  {
    title: "Marketplace",
    links: [
      { label: "Tous les produits", href: "/produits" },
      { label: "Devenir vendeur", href: "/devenir-vendeur" },
      { label: "Mon panier", href: "/panier" },
      { label: "Suivi commande", href: "/commandes" },
    ],
  },
  {
    title: "Mon compte",
    links: [
      { label: "Connexion", href: "/connexion" },
      { label: "Inscription", href: "/inscription" },
      { label: "Mon profil", href: "/profil" },
      { label: "Mes commandes", href: "/commandes" },
    ],
  },
  {
    title: "Vendeurs",
    links: [
      { label: "Ouvrir une boutique", href: "/devenir-vendeur" },
      { label: "Statut de ma demande", href: "/devenir-vendeur/statut" },
      { label: "Espace vendeur", href: "/vendeur" },
    ],
  },
];

const trust = [
  { icon: Wallet, label: "Paiement MonCash" },
  { icon: ShieldCheck, label: "Escrow sécurisé" },
  { icon: Truck, label: "Livraison nationale" },
];

export function Footer() {
  return (
    <footer id="support" className="mt-6 border-t border-[#B3D4E5] bg-white text-[#4E73C7]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="relative h-14 w-28">
            <Image src="/livelo-logo-transparent.png" alt="Livelo Haiti" fill sizes="112px" className="object-contain" />
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#ACACAC]">
            La marketplace e-commerce haïtienne : achetez auprès des boutiques locales, payez via MonCash et suivez votre livraison.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {trust.map((item) => {
              const Icon = item.icon;
              return (
                <span key={item.label} className="inline-flex items-center gap-1.5 rounded-full bg-[#E2F4FF] px-3 py-1.5 text-xs font-black text-[#4E73C7]">
                  <Icon aria-hidden="true" size={13} className="text-[#EDA415]" />
                  {item.label}
                </span>
              );
            })}
          </div>
          <div className="mt-5 space-y-2 text-sm text-[#ACACAC]">
            <p className="flex items-center gap-2"><Phone size={15} className="text-[#4E73C7]" /> +509 0000 0000</p>
            <p className="flex items-center gap-2"><Mail size={15} className="text-[#4E73C7]" /> contact@livelo.ht</p>
            <p className="flex items-center gap-2"><MapPin size={15} className="text-[#4E73C7]" /> Haïti — 10 départements</p>
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-black uppercase tracking-wide text-[#4E73C7]">{column.title}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-semibold text-[#ACACAC] transition hover:text-[#EDA415]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#B3D4E5]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-[#ACACAC] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Livelo Haiti — Full Bridge Digital</p>
          <div className="flex items-center gap-3">
            <a href="#facebook" aria-label="Facebook" className="text-[#4E73C7] transition hover:text-[#EDA415]"><MessageCircle size={18} /></a>
            <a href="#instagram" aria-label="Instagram" className="text-[#4E73C7] transition hover:text-[#EDA415]"><AtSign size={18} /></a>
            <a href="#linkedin" aria-label="LinkedIn" className="text-[#4E73C7] transition hover:text-[#EDA415]"><Send size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
