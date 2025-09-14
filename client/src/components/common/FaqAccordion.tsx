"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const FaqAccordion = () => {
  const items = [
    {
      value: "item-1",
      question: "Do I pay to set up my event?",
      answer:
        "No. You can set up your event for free. We only charge a small fee on each transaction made through the platform.",
    },
    {
      value: "item-2",
      question: "Are there limits to the number of events I can create?",
      answer:
        "No, you can create as many events as you like without restrictions.",
    },
    {
      value: "item-3",
      question: "How do I receive my money?",
      answer:
        "After creating your account, you can link your bank account and request payouts at any time from your dashboard.",
    },
    {
      value: "item-4",
      question: "How does the voting work?",
      answer:
        "You can set up your event (e.g., pageantry or awards), upload contestants, set your voting price, and share your event link. People can start voting immediately.",
    },
    {
      value: "item-5",
      question: "How long does it take to receive a payout?",
      answer:
        "Payouts are typically processed within 24–48 hours, depending on your bank and verification status.",
    },
    {
      value: "item-6",
      question: "How do I track ticket sales and voting progress?",
      answer:
        "Your dashboard provides real-time insights into ticket sales, votes, and total revenue for each event.",
    },
  ];
  return (
    <section className="max-w-4xl mx-auto py-12">
      <div className="space-y-4 mb-10">
        <h2 className="text-3xl font-inter">Frequently Asked Questions</h2>
        <p className="text-[#666666] text-sm sm:text-base">
          Explore our Frequently Asked Questions for short answers that provide
          clarity about our services.
        </p>
      </div>
      <div>
        <Accordion
          type="single"
          collapsible
          // value={openItem ?? undefined}
          // onValueChange={setOpenItem}
          className="space-y-4"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="border border-gray-200 rounded-xl shadow-sm bg-white px-4"
            >
              <AccordionTrigger className="py-4 text-lg font-medium text-gray-800 flex items-center justify-between">
                <span className="text-sm md:text-base">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-gray-600 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqAccordion;
