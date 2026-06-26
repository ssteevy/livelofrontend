import { AtSign, Mail, MessageCircle, Phone, Send } from "lucide-react";

export function Header() {
  return (
    <header className="hidden bg-[#4E73C7] text-white lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 text-sm font-medium sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <a href="tel:+50900000000" className="inline-flex items-center gap-2 hover:text-[#E2F4FF]">
            <Phone aria-hidden="true" size={15} />
            +509 0000 0000
          </a>
          <a href="mailto:contact@livelo.ht" className="inline-flex items-center gap-2 hover:text-[#E2F4FF]">
            <Mail aria-hidden="true" size={15} />
            contact@livelo.ht
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/90">Livraison dans les 10 départements d&apos;Haïti</span>
          <div className="flex items-center gap-2" aria-label="Réseaux sociaux Livelo">
            <a href="#facebook" aria-label="Facebook" className="hover:text-[#EDA415]"><MessageCircle size={15} /></a>
            <a href="#instagram" aria-label="Instagram" className="hover:text-[#EDA415]"><AtSign size={15} /></a>
            <a href="#linkedin" aria-label="LinkedIn" className="hover:text-[#EDA415]"><Send size={15} /></a>
          </div>
        </div>
      </div>
    </header>
  );
}
