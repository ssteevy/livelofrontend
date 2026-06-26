import { BadgeCheck, ShieldCheck, Truck, Wallet } from "lucide-react";

const items = [
  { icon: Truck, text: "Livraison dans les 10 départements d'Haïti" },
  { icon: Wallet, text: "Paiement sécurisé via MonCash" },
  { icon: ShieldCheck, text: "Escrow Livelo — vous êtes protégé" },
  { icon: BadgeCheck, text: "Boutiques locales vérifiées" },
];

export function PromoBar() {
  return (
    <div className="overflow-hidden bg-[#4E73C7] text-white">
      <div className="flex w-max animate-marquee items-center gap-10 py-1.5 pr-10">
        {[...items, ...items].map((item, index) => {
          const Icon = item.icon;
          return (
            <span key={index} className="flex shrink-0 items-center gap-2 text-xs font-bold">
              <Icon aria-hidden="true" size={14} className="text-[#EDA415]" />
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
