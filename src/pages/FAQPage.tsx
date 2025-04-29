
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and navigating to the 'Orders' section. There you'll find a tracking number and link for each shipped order. Alternatively, you can use the tracking number provided in your shipping confirmation email.",
      category: "orders",
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery for most items in their original condition. To start a return, go to your account, find the order, and select 'Return or Replace Items'. Some products like intimate apparel or personalized items may not be eligible for return.",
      category: "returns",
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping is available for 1-2 business day delivery. International shipping times vary by destination, usually taking 7-14 business days. Shipping times may be longer during peak seasons or promotional events.",
      category: "shipping",
    },
    {
      id: 4,
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping fees and delivery times vary based on location. Import duties and taxes may apply and are the responsibility of the customer. Some products may not be available for international shipping due to local regulations.",
      category: "shipping",
    },
    {
      id: 5,
      question: "How do I change or cancel my order?",
      answer: "Orders can be modified or canceled within 1 hour of placement. After that, our system begins processing your order for shipment. To make changes, contact customer service immediately. Once an order has shipped, it cannot be canceled but can be returned according to our return policy.",
      category: "orders",
    },
    {
      id: 6,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. We also offer ShopSpark store credit and gift cards. All payments are securely processed and encrypted.",
      category: "payment",
    },
    {
      id: 7,
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer gift wrapping services for most products. During checkout, select the 'Gift Wrap' option and you can choose from several wrapping styles. You can also include a personalized message. Gift wrapping is available for a small additional fee.",
      category: "orders",
    },
    {
      id: 8,
      question: "How do I redeem a discount code?",
      answer: "To redeem a discount code, add items to your cart and proceed to checkout. On the payment page, you'll see a field labeled 'Discount Code' or 'Promo Code'. Enter your code there and click 'Apply' to see the discount reflected in your order total.",
      category: "payment",
    },
    {
      id: 9,
      question: "What should I do if my discount code doesn't work?",
      answer: "If your discount code isn't working, please verify that it's entered correctly, check if it has expired, and confirm that your purchase meets any minimum requirements (e.g., minimum purchase amount or specific products). Some codes cannot be combined with other offers. If you continue to have issues, please contact customer support.",
      category: "payment",
    },
    {
      id: 10,
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of our website. Fill in your email address, create a password, and provide your basic contact information. You can also sign up using your Google, Facebook, or Apple account for faster registration.",
      category: "account",
    },
    {
      id: 11,
      question: "How can I reset my password?",
      answer: "To reset your password, click on the 'Sign In' button, then select 'Forgot Password'. Enter the email associated with your account, and we'll send you a password reset link. Follow the instructions in the email to create a new password. For security reasons, reset links expire after 24 hours.",
      category: "account",
    },
    {
      id: 12,
      question: "Are your products guaranteed?",
      answer: "Yes, all our products come with a satisfaction guarantee. If you're not completely satisfied with your purchase, you can return it within 30 days. Certain products also come with manufacturer warranties that cover defects and functionality issues for longer periods, typically 1-2 years depending on the product.",
      category: "products",
    },
  ];

  const categories = ["all", "orders", "returns", "shipping", "payment", "account", "products"];
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      (activeCategory === "all" || faq.category === activeCategory) &&
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our products, ordering, shipping, and more.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search our FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-lg shadow-sm"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="flex flex-wrap justify-center mb-6">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
                {category !== "all" && (
                  <Badge variant="secondary" className="ml-2">
                    {
                      faqs.filter((faq) => faq.category === category).length
                    }
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <motion.div
                    key={faq.id}
                    variants={itemVariants}
                    className="overflow-hidden"
                  >
                    <Collapsible
                      open={openItems.includes(faq.id)}
                      onOpenChange={() => toggleItem(faq.id)}
                      className="border rounded-lg overflow-hidden"
                    >
                      <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors text-gray-800 font-medium">
                        <span className="text-lg">{faq.question}</span>
                        <div className="ml-2 h-6 w-6 shrink-0 text-brand-purple">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transform transition-transform ${
                              openItems.includes(faq.id) ? "rotate-180" : ""
                            }`}
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="bg-gray-50 px-4 py-3 text-gray-700 border-t">
                        <p className="p-2">{faq.answer}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-gray-600 mb-8">
                    We couldn't find any FAQs matching your search criteria.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-16 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-bold mb-2">Didn't find what you're looking for?</h3>
          <p className="text-gray-600 mb-6">
            Our customer support team is here to help.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Button variant="default">Contact Support</Button>
            <Button variant="outline">Browse Help Center</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
