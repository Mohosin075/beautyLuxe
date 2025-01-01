import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SectionTitle from "../../../components/SectionTitle";
import useTheme from "../../../hooks/useTheme";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const { theme } = useTheme();

  const faqs = [
    {
      question: "What is Beauty Luxe?",
      answer:
        "Beauty Luxe is your one-stop destination for high-quality beauty products, ranging from skincare to makeup and more.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and navigating to the 'My Orders' section.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes, we offer free shipping on orders above $50. For orders below this amount, a small shipping fee applies.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We have a 30-day return policy for unused and unopened products. Please check our Return Policy page for more details.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach out to our customer support team via email at support@beautyluxe.com or call us at 1-800-555-1234.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`py-12 px-4 ${
        theme === "dark"
          ? "bg-darkBackground text-textLight"
          : "bg-lightBackground text-textDark"
      }`}
    >
      <div className="container mx-auto">
        <SectionTitle
          title="Frequently Asked Questions"
          description="Find answers to some of the most common questions about our products and services."
        />
        <div className="divider"></div>
        <div className="container mx-auto px-4 lg:w-9/12">
          <div className="mt-8 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-primaryAccent pb-4"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center cursor-pointer">
                  <h3 className="text-lg font-semibold text-primaryAccent  transition duration-300">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <FiChevronUp className="text-xl transition-transform duration-300 transform rotate-180" />
                  ) : (
                    <FiChevronDown className=" text-xl transition-transform duration-300 transform" />
                  )}
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openIndex === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="mt-3 text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
