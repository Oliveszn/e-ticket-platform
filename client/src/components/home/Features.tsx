"use client";
import { features } from "@/config/home";
import { useEffect, useState } from "react";

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-timer effect
  useEffect(() => {
    if (isPaused) return; // Don't run timer if paused

    const timer = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % features.length);
    }, 5000); // 5 seconds

    return () => clearInterval(timer); 
  }, [isPaused]);

  return (
    <section className="mx-auto max-w-7xl py-16 space-y-8">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-center">Key Features</h1>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="w-full md:w-1/2">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              onClick={() => setActiveTab(index)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className={`cursor-pointer py-6 px-4 border-l-4 transition-all ${
                activeTab === index
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
              }`}
            >
              <h3 className="md:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-800 text-xs sm:text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/2">
          <div className="relative h-96 flex items-center justify-center bg-gray-100 rounded-lg p-8 transition-all duration-300">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">
                {features[activeTab].title}
              </h2>
              <p className="text-gray-600">{features[activeTab].content}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
