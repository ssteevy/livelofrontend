export const colors = {
  primary: "#4E73C7",
  accent: "#EDA415",
  success: "#30BD57",
  background: "#F8FAFC",
  surface: "#E2F4FF",
  border: "#B3D4E5",
  neutral: "#ACACAC",
};

export type IconName =
  | "Smartphone"
  | "Shirt"
  | "Watch"
  | "Footprints"
  | "Sparkles"
  | "Home"
  | "Utensils"
  | "Baby"
  | "Dumbbell"
  | "Package"
  | "Wallet"
  | "Truck"
  | "MapPin"
  | "Store"
  | "ShieldCheck"
  | "Headphones";

export interface Category {
  name: string;
  description: string;
  icon: IconName;
}

export interface Product {
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  city: string;
  shop: string;
  category: string;
  imageStyle: "phone" | "beauty" | "appliance" | "grocery" | "fashion" | "home" | "baby" | "sport" | "laptop" | "shoe" | "tv" | "fan";
}

export interface StoreItem {
  name: string;
  city: string;
  products: string;
  rating: string;
  specialty: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: IconName;
}

export const categories: Category[] = [
  { name: "Téléphones & Technologie", description: "Smartphones, TV, accessoires", icon: "Smartphone" },
  { name: "Mode Femme", description: "Robes, blouses, tenues locales", icon: "Shirt" },
  { name: "Mode Homme", description: "Chemises, costumes, sportswear", icon: "Watch" },
  { name: "Chaussures", description: "Sneakers, sandales, enfants", icon: "Footprints" },
  { name: "Beauté & Santé", description: "Soins, parfums, hygiène", icon: "Sparkles" },
  { name: "Maison & Cuisine", description: "Électroménager, ustensiles", icon: "Home" },
  { name: "Alimentation", description: "Produits locaux, épicerie", icon: "Utensils" },
  { name: "Bébé & Enfant", description: "Jouets, vêtements, accessoires", icon: "Baby" },
  { name: "Sport & Loisirs", description: "Outdoor, jeux, équipements", icon: "Dumbbell" },
  { name: "Autres", description: "Bureau, livres, auto-moto", icon: "Package" },
];

export const products: Product[] = [
  { name: "Samsung Galaxy A06 6.7 pouces double SIM", price: "18 900 HTG", oldPrice: "21 500 HTG", discount: "-12%", city: "Port-au-Prince", shop: "Tech Lakay", category: "Technologie", imageStyle: "phone" },
  { name: "Blender Silver Crest 2L industriel", price: "7 450 HTG", oldPrice: "9 900 HTG", discount: "-25%", city: "Delmas", shop: "Maison Nord", category: "Maison", imageStyle: "appliance" },
  { name: "Power kit solaire rechargeable maison", price: "36 000 HTG", oldPrice: "42 800 HTG", discount: "-16%", city: "Cap-Haïtien", shop: "Soleil Tech", category: "Technologie", imageStyle: "home" },
  { name: "Déodorant Rexona édition spéciale", price: "850 HTG", oldPrice: "1 100 HTG", discount: "-23%", city: "Pétion-Ville", shop: "Belle Nature", category: "Beauté", imageStyle: "beauty" },
  { name: "Smartphone Redmi A7 Pro 128Go", price: "24 500 HTG", oldPrice: "29 400 HTG", discount: "-17%", city: "Tabarre", shop: "Mobile Plus", category: "Technologie", imageStyle: "phone" },
  { name: "TV QLED Royal 65 pouces connectée", price: "96 000 HTG", oldPrice: "120 000 HTG", discount: "-20%", city: "Jacmel", shop: "Royal Store", category: "Maison", imageStyle: "tv" },
  { name: "Laptop Asus Zenbook Duo tactile", price: "128 500 HTG", oldPrice: "141 000 HTG", discount: "-9%", city: "Port-au-Prince", shop: "Tech Lakay", category: "Ordinateurs", imageStyle: "laptop" },
  { name: "Vaseline Men hydration extra protect", price: "1 250 HTG", oldPrice: "1 550 HTG", discount: "-19%", city: "Les Cayes", shop: "Belle Nature", category: "Beauté", imageStyle: "beauty" },
  { name: "Ventilateur solaire Sun King 16 pouces", price: "8 750 HTG", oldPrice: "12 900 HTG", discount: "-32%", city: "Gonaïves", shop: "Soleil Tech", category: "Maison", imageStyle: "fan" },
  { name: "Cuisinière Skyrun 4 brûleurs four inclus", price: "19 800 HTG", oldPrice: "25 600 HTG", discount: "-23%", city: "Hinche", shop: "Maison Nord", category: "Cuisine", imageStyle: "appliance" },
  { name: "Sneakers Adidas Levato femme bleu", price: "4 950 HTG", oldPrice: "8 500 HTG", discount: "-42%", city: "Delmas", shop: "Step Haiti", category: "Chaussures", imageStyle: "shoe" },
  { name: "Panier épicerie locale semaine", price: "2 150 HTG", oldPrice: "2 800 HTG", discount: "-23%", city: "Les Cayes", shop: "Marché Sud", category: "Alimentation", imageStyle: "grocery" },
];

export const stores: StoreItem[] = [
  { name: "Tech Lakay", city: "Port-au-Prince", products: "128 produits", rating: "4.8", specialty: "Téléphones & accessoires" },
  { name: "Mode Soleil", city: "Pétion-Ville", products: "86 produits", rating: "4.9", specialty: "Mode femme haïtienne" },
  { name: "Marché Sud", city: "Les Cayes", products: "64 produits", rating: "4.7", specialty: "Alimentation locale" },
];

export const features: Feature[] = [
  { title: "Paiement MonCash", description: "Paiement mobile simple avec escrow Livelo pour sécuriser la commande.", icon: "Wallet" },
  { title: "Livraison nationale", description: "Prix de livraison visibles selon la ville configurée par chaque vendeur.", icon: "Truck" },
  { title: "Suivi temps réel", description: "Tracking livreur via Geolocation API et notifications de statut.", icon: "MapPin" },
  { title: "Marketplace multi-vendeurs", description: "Boutiques locales, catalogue filtré et gestion vendeur complète.", icon: "Store" },
  { title: "Sécurité des paiements", description: "Commissions calculées côté serveur et transactions traçables.", icon: "ShieldCheck" },
  { title: "Support client", description: "Accompagnement acheteurs, vendeurs et gestion des litiges.", icon: "Headphones" },
];

export const departments = [
  "Ouest",
  "Nord",
  "Sud",
  "Artibonite",
  "Centre",
  "Nord-Ouest",
  "Nord-Est",
  "Sud-Est",
  "Grand'Anse",
  "Nippes",
];

export const stats = [
  { value: "100+", label: "Boutiques actives" },
  { value: "15+", label: "Villes couvertes" },
  { value: "100+", label: "Commandes / jour" },
  { value: "90%+", label: "Livraisons réussies" },
];
