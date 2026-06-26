import { apiRequest, buildQuery } from "@/lib/api";

export type ProductStatut = "draft" | "active" | "out_of_stock" | "archived";

export interface ProductShopSummary {
  id: string;
  nom: string;
  logo_url?: string | null;
  statut?: string;
}

export interface Product {
  id: string;
  shop_id: string;
  titre: string;
  description?: string | null;
  prix: number;
  prix_promo?: number | null;
  stock: number;
  categorie: string;
  sous_categorie?: string | null;
  images: string[];
  statut: ProductStatut;
  note_moyenne?: number | null;
  total_avis?: number | null;
  created_at?: string;
  shops?: ProductShopSummary | null;
}

export interface ProductDetail extends Product {
  livraison_ville: {
    disponible: boolean;
    prix_livraison: number | null;
  } | null;
}

export interface PaginatedProducts {
  data: Product[];
  page: number;
  limit: number;
  total: number;
}

export interface ProductsQuery {
  city_id?: string;
  shop_id?: string;
  categorie?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AvailabilityItem {
  product_id: string;
  shop_id: string | null;
  disponible: boolean;
  prix_livraison: number | null;
}

export interface CreateProductPayload {
  shop_id: string;
  titre: string;
  description?: string;
  prix: number;
  prix_promo?: number;
  stock: number;
  categorie: string;
  sous_categorie?: string;
  images?: string[];
}

export type UpdateProductPayload = Partial<Omit<CreateProductPayload, "shop_id">> & {
  statut?: ProductStatut;
};

export const productsApi = {
  /** Catalogue public, filtrable et paginé. */
  list(query: ProductsQuery = {}) {
    return apiRequest<PaginatedProducts>(`/products${buildQuery({ ...query })}`);
  },
  /** Fiche produit (+ livraison si city_id fourni). */
  getOne(id: string, cityId?: string) {
    return apiRequest<ProductDetail>(`/products/${id}${buildQuery({ city_id: cityId })}`);
  },
  /** Disponibilité d'un panier dans une ville. */
  checkAvailability(productIds: string[], cityId: string) {
    return apiRequest<AvailabilityItem[]>("/products/check-availability", {
      method: "POST",
      body: { product_ids: productIds, city_id: cityId },
    });
  },
  /** Créer un produit (vendeur). */
  create(accessToken: string, payload: CreateProductPayload) {
    return apiRequest<Product>("/products", {
      method: "POST",
      token: accessToken,
      body: payload,
    });
  },
  /** Modifier un produit (propriétaire). */
  update(accessToken: string, id: string, payload: UpdateProductPayload) {
    return apiRequest<Product>(`/products/${id}`, {
      method: "PUT",
      token: accessToken,
      body: payload,
    });
  },
  /** Archiver un produit (propriétaire). */
  archive(accessToken: string, id: string) {
    return apiRequest<{ message: string }>(`/products/${id}`, {
      method: "DELETE",
      token: accessToken,
    });
  },
  /** Uploader des photos Cloudinary (max 5). */
  uploadImages(accessToken: string, id: string, files: File[]) {
    const form = new FormData();
    for (const file of files) form.append("images", file);
    return apiRequest<{ id: string; images: string[] }>(`/products/${id}/images`, {
      method: "POST",
      token: accessToken,
      body: form,
    });
  },
};
