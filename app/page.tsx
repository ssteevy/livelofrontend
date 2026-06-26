import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FlashDeals } from "@/components/home/FlashDeals";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { PopularProducts } from "@/components/home/PopularProducts";
import { SellerCTA } from "@/components/home/SellerCTA";
import { TrustStrip } from "@/components/home/TrustStrip";
import { SiteShell } from "@/components/layout/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <CategoriesSection />
      <FlashDeals />
      <PopularProducts />
      <TrustStrip />
      <SellerCTA />
      <NewsletterSection />
    </SiteShell>
  );
}
