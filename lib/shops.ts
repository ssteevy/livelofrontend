import { apiRequest } from "@/lib/api";

export type MoncashType = "standard" | "elargi";

export interface BecomeSellerInfo {
  titre: string;
  etapes: string[];
  documents_requis: string[];
  conditions: string[];
  delai_traitement: string;
}

export interface ShopPublic {
  id: string;
  nom: string;
  description?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  categorie_principale: string;
  statut: string;
  note_moyenne?: number | null;
  total_ventes?: number | null;
  created_at?: string;
}

export interface ShopOwner extends ShopPublic {
  seller_id: string;
  moncash_numero: string;
  moncash_type: MoncashType;
  updated_at?: string;
}

export interface ApplyShopPayload {
  email: string;
  telephone: string;
  prenom: string;
  nom: string;
  password: string;
  nom_boutique: string;
  description?: string;
  categorie_principale: string;
  moncash_numero: string;
  moncash_type: MoncashType;
  identite_url: string;
}

export interface ApplyShopResponse {
  application_id: string;
  statut: string;
  message: string;
}

export interface ApplicationStatus {
  id: string;
  statut: "pending" | "approved" | "rejected";
  motif_rejet: string | null;
  created_shop_id: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export interface UpdateShopPayload {
  nom?: string;
  description?: string;
  categorie_principale?: string;
  moncash_numero?: string;
  moncash_type?: MoncashType;
  logo_url?: string;
  banner_url?: string;
}

export interface DeliveryZone {
  id: string;
  city_id: string;
  prix_livraison_htg: number;
  actif: boolean;
  cities?: {
    id: string;
    nom: string;
    departments?: { nom: string } | null;
  } | null;
}

export interface ShopProduct {
  id: string;
  titre: string;
  description?: string | null;
  prix: number;
  prix_promo?: number | null;
  stock: number;
  categorie: string;
  sous_categorie?: string | null;
  images: string[];
  note_moyenne?: number | null;
  total_avis?: number | null;
  created_at?: string;
}

export const shopsApi = {
  /** Documentation : comment devenir vendeur (public). */
  becomeSellerInfo() {
    return apiRequest<BecomeSellerInfo>("/shops/become-seller/info");
  },
  /** Soumettre une demande vendeur (public). */
  apply(payload: ApplyShopPayload) {
    return apiRequest<ApplyShopResponse>("/shops/apply", {
      method: "POST",
      body: payload,
    });
  },
  /** Statut d'une demande vendeur (public). */
  applicationStatus(applicationId: string) {
    return apiRequest<ApplicationStatus>(`/shops/applications/${applicationId}/status`);
  },
  /** Boutiques du vendeur connecté (propriétaire). */
  mine(accessToken: string) {
    return apiRequest<ShopOwner[]>("/shops/me", { token: accessToken });
  },
  /** Profil public d'une boutique. */
  getOne(id: string) {
    return apiRequest<ShopPublic>(`/shops/${id}`);
  },
  /** Modifier sa boutique (propriétaire). */
  update(accessToken: string, id: string, payload: UpdateShopPayload) {
    return apiRequest<ShopOwner>(`/shops/${id}`, {
      method: "PUT",
      token: accessToken,
      body: payload,
    });
  },
  /** Zones de livraison + prix (public). */
  deliveryZones(id: string) {
    return apiRequest<DeliveryZone[]>(`/shops/${id}/delivery-zones`);
  },
  /** Ajouter / modifier une zone + prix (propriétaire). */
  upsertDeliveryZone(accessToken: string, id: string, cityId: string, prixLivraisonHtg: number) {
    return apiRequest<DeliveryZone>(`/shops/${id}/delivery-zones`, {
      method: "POST",
      token: accessToken,
      body: { city_id: cityId, prix_livraison_htg: prixLivraisonHtg },
    });
  },
  /** Supprimer une zone de livraison (propriétaire). */
  removeDeliveryZone(accessToken: string, id: string, cityId: string) {
    return apiRequest<{ message: string }>(`/shops/${id}/delivery-zones/${cityId}`, {
      method: "DELETE",
      token: accessToken,
    });
  },
  /** Produits actifs de la boutique (public). */
  products(id: string) {
    return apiRequest<ShopProduct[]>(`/shops/${id}/products`);
  },
};
