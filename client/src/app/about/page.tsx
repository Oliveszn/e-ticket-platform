import { Metadata } from "next";
import Image from "next/image";
import eventImage from "../../../public/event.jpg";
import { experiences } from "@/config/about";
import Testimonial from "@/components/common/Testimonial";

export const metadata: Metadata = {
  title: "About | My App",
  description: "Learn more about My App",
};

const About = () => {
  return (
    <main className="py-16 bg-[url('/pricingpattern.png')] bg-no-repeat bg-top bg-contain px-6 sm:px-8 lg:px-10">
      <div className="max-w-6xl mx-auto ">
        <div className="max-w-2xl px-4 sm:px-0 mx-auto z-20 relative space-y-4">
          <p className="font-raleway text-3xl sm:text-6xl text-center font-bold">
            We help you focus on what matters
          </p>
          <p className="text-gray-500  text-sm sm:text-base text-center">
            Turning Event Visions into Seamless Realities.
          </p>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-20 relative py-16">
          <div>
            <Image
              src={eventImage}
              alt="about"
              loading="lazy"
              placeholder="blur"
              width={500}
              height={400}
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="rounded-2xl p-4 flex flex-col gap-4 items-center justify-center">
            <p className="text-gray-800">
              At Pevent.ng, we understand the challenges event organizers and
              ticket resellers face—from geographical barriers to inefficient
              record-keeping and difficulties in fund collection. Our team of
              passionate event enthusiasts developed Pevent.ng to simplify event
              curation, planning, and execution.
            </p>
            <p className="text-gray-800">
              Our mission is to take the stress off event creators by providing
              a seamless, reliable, and efficient solution for managing events.
              With centralized ticket management and effective event promotion,
              we ensure organizers can focus on delivering unforgettable
              experiences.
            </p>
          </div>
        </section>
      </div>

      <div className="-mx-6 sm:-mx-8 lg:-mx-10">
        <Testimonial />
      </div>

      <div className="max-w-6xl mx-auto ">
        <section className="py-16 sm:py-20">
          <div className="z-20 relative space-y-4 py-6 text-center">
            <p className="text-3xl font-semibold">Onsite Experiences</p>
            <p className="w-3/5 mx-auto text-sm sm:text-base text-gray-500">
              Whether you're planning a corporate conference, a grand
              celebration, a trade show, or a virtual webinar, Pevent simplifies
              the entire process.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-2xl p-2 flex flex-col gap-4 items-center justify-center"
              >
                <Image
                  alt={exp.alt}
                  loading="lazy"
                  width={500}
                  height={400}
                  decoding="async"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-all duration-300"
                  src={exp.src}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
