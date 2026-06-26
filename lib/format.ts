/** Formate un montant en HTG : 1250 → "1 250 HTG". */
export function formatHtg(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${Math.round(value).toLocaleString("fr-FR").replace(/ /g, " ")} HTG`;
}

/** Calcule le pourcentage de réduction entre prix et prix_promo. */
export function discountLabel(prix: number, prixPromo?: number | null) {
  if (!prixPromo || prixPromo >= prix || prix <= 0) return null;
  return `-${Math.round((1 - prixPromo / prix) * 100)}%`;
}

/** Date ISO → "26 juin 2026". */
export function formatDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
