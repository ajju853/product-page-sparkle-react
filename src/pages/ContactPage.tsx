
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
      duration: 3000,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help! Choose the best
          way to reach us below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-start">
            <div className="bg-brand-purple rounded-full p-3 mr-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Call Us</h3>
              <p className="text-gray-600 mb-1">Customer Support</p>
              <p className="font-medium">+1 (555) 123-4567</p>
              <p className="text-gray-600 mt-2 text-sm">
                Mon-Fri: 8am - 8pm EST
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start">
            <div className="bg-brand-purple rounded-full p-3 mr-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Email Us</h3>
              <p className="text-gray-600 mb-1">Customer Service</p>
              <p className="font-medium">support@shopspark.com</p>
              <p className="text-gray-600 mb-1 mt-2">Partnership Inquiries</p>
              <p className="font-medium">partners@shopspark.com</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start">
            <div className="bg-brand-purple rounded-full p-3 mr-4">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-1">ShopSpark Main Office</p>
              <p className="font-medium">
                123 Commerce Street
                <br />
                New York, NY 10001
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start">
            <div className="bg-brand-purple rounded-full p-3 mr-4">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-2">
                Available 24/7 for immediate assistance
              </p>
              <Button>Start Chat</Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="font-medium text-gray-700">
                  First Name
                </label>
                <Input
                  id="firstName"
                  placeholder="Your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="font-medium text-gray-700">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="font-medium text-gray-700">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="How can we help you?"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="font-medium text-gray-700">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Please provide details about your inquiry..."
                className="min-h-[150px]"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
