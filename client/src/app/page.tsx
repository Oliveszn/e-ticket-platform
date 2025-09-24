import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import Reviews from "@/components/home/Reviews";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <section className="min-h-screen relative w-full">
        <Image
          alt="hero image"
          src="/hero-img.jpg"
          fill
          className="object-cover"
          priority
        />
        <div className="flex flex-col items-center justify-center text-center absolute inset-0 text-white bg-black/70 text-secondary">
          <div className="max-w-2xl px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
              Bringing you closer to all the events you love
            </h1>
            <p className="text-sm sm:text-base lg:text-lg mb-6">
              Find events and make memories that last a lifetime. Your next
              great experience is just a click away.
            </p>
          </div>
          <div className="">
            <Link
              className="inline-block bg-blue text-secondary font-medium px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 ease-in-out whitespace-nowrap"
              href="/explore"
            >
              Discover events
            </Link>
          </div>
        </div>
      </section>

      <div className="px-6 sm:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <Categories />
          <Features />
          <Reviews />
        </div>
      </div>
    </main>
  );
}
