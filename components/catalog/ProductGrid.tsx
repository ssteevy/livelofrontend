import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { EmptyState, ErrorState } from "@/components/ui/StateBlocks";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyMessage?: string;
  skeletonCount?: number;
}

const GRID =
  "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7";

export function ProductGrid({
  products,
  loading = false,
  error = null,
  onRetry,
  emptyTitle = "Aucun produit",
  emptyMessage = "Aucun produit disponible pour le moment.",
  skeletonCount = 12,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className={GRID}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (products.length === 0) return <EmptyState title={emptyTitle} message={emptyMessage} />;

  return (
    <div className={GRID}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
