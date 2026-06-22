import { CategoriesSection } from "@/components/home/CategoriesSection";
import { DeliveryCoverage } from "@/components/home/DeliveryCoverage";
import { FeaturedStores } from "@/components/home/FeaturedStores";
import { FlashDeals } from "@/components/home/FlashDeals";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MarketplaceStats } from "@/components/home/MarketplaceStats";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { PopularProducts } from "@/components/home/PopularProducts";
import { SearchBar } from "@/components/home/SearchBar";
import { SellerCTA } from "@/components/home/SellerCTA";
import { WhyLivelo } from "@/components/home/WhyLivelo";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <Navbar />
      <main>
        <HeroSection />
        <SearchBar />
        <FlashDeals />
        <CategoriesSection />
        <PopularProducts />
        <FeaturedStores />
        <WhyLivelo />
        <DeliveryCoverage />
        <HowItWorks />
        <MarketplaceStats />
        <SellerCTA />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
