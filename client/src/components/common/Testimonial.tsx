"use client";
import { testimonial } from "@/config/about";
import { useScroller } from "@/hooks/useScroller";
import Image from "next/image";

const Testimonial = () => {
  const { scrollerRef, scrollerInnerRef } = useScroller();

  return (
    <section className="bg-[#F3F4F6] space-y-12 py-12">
      <div>
        <h1 className="text-center text-xl font-bold">
          Trusted by these brands
        </h1>
      </div>

      <div ref={scrollerRef} className="scroller">
        <div
          className="flex overflow-hidden items-center gap-30 scroller__inner"
          ref={scrollerInnerRef}
        >
          {testimonial.map((exp) => (
            <div key={exp.id} className="">
              <Image
                alt={exp.alt}
                loading="lazy"
                width={150}
                height={150}
                decoding="async"
                className="object-cover flex-shrink-0 max-h-20 max-w-[150px] filter grayscale hover:grayscale-0 transition duration-300"
                src={exp.src}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
