import ContentWrapper from "@/components/common/ContentWrapper";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import HeroSection from "@/components/home/HeroSection";
import Reviews from "@/components/home/Reviews";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <ContentWrapper>
        <Categories />
        <Features />
        <Reviews />
      </ContentWrapper>
    </main>
  );
}
