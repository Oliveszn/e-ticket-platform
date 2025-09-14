import { optionsData, pricingPlans } from "@/config/pricing";
import Image from "next/image";
import React from "react";

const Pricing = () => {
  return (
    <main className="py-16 bg-[url('/pricingpattern.png')] bg-no-repeat bg-top bg-contain px-6 sm:px-8 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <section className="space-y-1 ">
          <p className="text-blue-500">Pricing</p>
          <div className="space-y-4">
            <p className="font-semibold text-4xl font-raleway">
              Simple, transparent pricing
            </p>
            <p className="text-gray-500">
              We only charge a small fee for each transaction. No hidden costs,
              no surprises.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-16 sm:py-24">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className="border border-gray-200/50 rounded-2xl z-20 relative"
            >
              <div
                className={`rounded-2xl px-4 pt-4 pb-10 border border-blue-100 p-4 flex flex-col gap-5 ${
                  plan.gradient
                    ? "bg-gradient-to-t from-blue-50 to-transparent"
                    : ""
                }`}
              >
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{plan.title}</p>
                  <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                </div>
                <p className="text-4xl font-semibold flex items-center gap-2">
                  {plan.price}
                </p>
                <a href="/dashboard/events/create">
                  <button
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 h-10 px-4 py-2 w-full text-white hover:opacity-90 ${plan.buttonBg}`}
                  >
                    Get Started
                  </button>
                </a>
              </div>
              <div className="p-5 flex flex-col gap-5">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <img
                      src="/icons/pricing.svg"
                      alt="star"
                      className="w-5 h-5"
                    />
                    <p className="text-gray-500">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="bg-blue-50 rounded-xl py-16 px-2 sm:px-0 mt-10">
          <h2 className="text-xl font-raleway font-bold text-center mb-12">
            Fees payment option
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            {optionsData.map((option, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-4"
              >
                <span className="bg-white rounded-xl shadow p-4 mb-6 flex items-center justify-center">
                  {option.svg}
                </span>

                <h3 className="font-semibold text-xl mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm">{option.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Pricing;
