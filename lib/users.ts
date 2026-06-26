import { apiRequest } from "@/lib/api";
import type { UserProfile } from "@/lib/auth";

export interface UpdateProfilePayload {
  prenom?: string;
  nom?: string;
  telephone?: string;
}

export interface OrderItem {
  id: string;
  titre_snapshot: string;
  prix_unitaire: number;
  quantite: number;
  sous_total: number;
}

export interface Order {
  id: string;
  statut: string;
  montant_produits: number;
  frais_livraison: number;
  montant_total: number;
  adresse_livraison?: string | null;
  note_livraison?: string | null;
  payment_group_id?: string | null;
  created_at?: string;
  paid_at?: string | null;
  confirmed_at?: string | null;
  delivered_at?: string | null;
  completed_at?: string | null;
  shop?: { id: string; nom: string; logo_url?: string | null } | null;
  delivery_city?: { id: string; nom: string } | null;
  order_items?: OrderItem[];
}

export const usersApi = {
  /** Profil complet de l'utilisateur connecté. */
  me(accessToken: string) {
    return apiRequest<UserProfile>("/users/me", {
      token: accessToken,
    });
  },
  /** Modifier prénom, nom et téléphone. */
  updateProfile(accessToken: string, payload: UpdateProfilePayload) {
    return apiRequest<UserProfile>("/users/me", {
      method: "PUT",
      token: accessToken,
      body: payload,
    });
  },
  /** Changer de ville. */
  updateCity(accessToken: string, cityId: string) {
    return apiRequest<UserProfile>("/users/me/city", {
      method: "PUT",
      token: accessToken,
      body: { city_id: cityId },
    });
  },
  /** Historique des commandes. */
  orders(accessToken: string) {
    return apiRequest<Order[]>("/users/me/orders", {
      token: accessToken,
    });
  },
};
