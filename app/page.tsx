import { CategoriesSection } from "@/components/home/CategoriesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularProducts } from "@/components/home/PopularProducts";
import { SiteShell } from "@/components/layout/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <CategoriesSection />
      <PopularProducts />
    </SiteShell>
  );
}
