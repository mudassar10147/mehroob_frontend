import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import BestSellingProducts from "@/components/sections/BestSellingProducts";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <CategoriesSection />
      <BestSellingProducts />
    </main>
  );
}
