import { CategoriesSection } from "@/components/home/CategoriesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularProducts } from "@/components/home/PopularProducts";
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
        <CategoriesSection />
        <PopularProducts />
      </main>
      <Footer />
    </div>
  );
}
