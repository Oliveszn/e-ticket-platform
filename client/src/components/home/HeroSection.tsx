import { heroConfig } from "@/config/home";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const { image, title, description, cta } = heroConfig;
  return (
    <section className="h-[550px] relative w-full">
      <Image
        alt={image.alt}
        src={image.src}
        fill
        className="object-cover"
        priority
      />
      <div className="flex flex-col items-center justify-center text-center absolute inset-0 text-white bg-black/70">
        <div className="max-w-2xl px-4 space-y-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-200">
            {description}
          </p>
          <div className="pt-2">
            <Link
              className="inline-block bg-blue text-white font-medium px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 ease-in-out"
              href={cta.href}
            >
              {cta.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
