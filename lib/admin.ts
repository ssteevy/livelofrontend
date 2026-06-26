import { apiRequest, buildQuery } from "@/lib/api";
import type { MoncashType } from "@/lib/shops";

export type ApplicationStatut = "pending" | "approved" | "rejected";

export interface ApplicationListItem {
  id: string;
  email: string;
  prenom: string;
  nom: string;
  nom_boutique: string;
  categorie_principale: string;
  statut: ApplicationStatut;
  created_at: string;
  reviewed_at: string | null;
}

export interface ApplicationDetail extends ApplicationListItem {
  telephone: string;
  description: string | null;
  moncash_numero: string;
  moncash_type: MoncashType;
  identite_url: string;
  motif_rejet: string | null;
  created_user_id: string | null;
  created_shop_id: string | null;
  reviewed_by: string | null;
}

export interface ApproveResponse {
  user_id: string;
  shop_id: string;
}

export const adminApi = {
  /** Liste des demandes vendeur (admin), filtrable par statut. */
  listApplications(accessToken: string, statut?: ApplicationStatut) {
    return apiRequest<ApplicationListItem[]>(
      `/admin/shop-applications${buildQuery({ statut })}`,
      { token: accessToken },
    );
  },
  /** Détail d'une demande vendeur (admin). */
  getApplication(accessToken: string, id: string) {
    return apiRequest<ApplicationDetail>(`/admin/shop-applications/${id}`, {
      token: accessToken,
    });
  },
  /** Approuver → crée le compte vendeur + la boutique. */
  approveApplication(accessToken: string, id: string) {
    return apiRequest<ApproveResponse>(`/admin/shop-applications/${id}/approve`, {
      method: "POST",
      token: accessToken,
    });
  },
  /** Rejeter une demande avec motif. */
  rejectApplication(accessToken: string, id: string, motif: string) {
    return apiRequest<{ message: string }>(`/admin/shop-applications/${id}/reject`, {
      method: "POST",
      token: accessToken,
      body: { motif },
    });
  },
};
