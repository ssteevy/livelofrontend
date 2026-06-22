import Image from "next/image";
import { AtSign, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

const columns = [
  { title: "Marketplace", links: ["Produits", "Catégories", "Boutiques", "Promotions"] },
  { title: "Vendeurs", links: ["Créer une boutique", "Dashboard", "Prix livraison", "Commissions"] },
  { title: "Support", links: ["Aide", "Suivi commande", "Litiges", "Sécurité"] },
];

export function Footer() {
  return (
    <footer id="support" className="bg-[#4E73C7] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="relative h-24 w-44 sm:h-28 sm:w-56">
            <Image
              src="/livelo-logo-transparent.png"
              alt="Livelo Haiti"
              fill
              sizes="(min-width: 640px) 224px, 176px"
              className="object-contain"
            />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#E2F4FF]">
            Marketplace e-commerce haïtienne pour acheter, vendre, payer via MonCash et suivre la livraison en temps réel.
          </p>
          <div className="mt-6 space-y-3 text-sm text-[#E2F4FF]">
            <p className="flex items-center gap-2"><Phone size={16} /> +509 0000 0000</p>
            <p className="flex items-center gap-2"><Mail size={16} /> contact@livelo.ht</p>
            <p className="flex items-center gap-2"><MapPin size={16} /> Haïti, 10 départements</p>
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-base font-black">{column.title}</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#E2F4FF]">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#EDA415]">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[#B3D4E5]/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-[#E2F4FF] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© Livelo Haiti - Full Bridge Digital</p>
          <div className="flex items-center gap-3">
            <a href="#facebook" aria-label="Facebook" className="hover:text-[#EDA415]"><MessageCircle size={18} /></a>
            <a href="#instagram" aria-label="Instagram" className="hover:text-[#EDA415]"><AtSign size={18} /></a>
            <a href="#linkedin" aria-label="LinkedIn" className="hover:text-[#EDA415]"><Send size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
