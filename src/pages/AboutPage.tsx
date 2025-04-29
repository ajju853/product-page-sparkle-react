
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Users, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About <span className="text-brand-purple">ShopSpark</span>
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We're on a mission to transform online shopping with curated collections of high-quality products that enhance your lifestyle.
        </motion.p>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            To provide exceptional products that bring joy and functionality to our customers' lives while promoting sustainable and ethical practices throughout our supply chain.
          </p>
          <p className="text-gray-600">
            We carefully select each item in our store, ensuring it meets our high standards for quality, design, and sustainability.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-4">
            To become the premier destination for mindful shoppers seeking quality products that enhance their lives without compromising their values.
          </p>
          <p className="text-gray-600">
            We envision a world where conscious consumerism is the norm, and every purchase is an opportunity to make a positive impact.
          </p>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do, from product selection to customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-brand-purple h-12 w-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              We never compromise on quality, ensuring that each product meets the highest standards.
            </p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="bg-brand-purple h-12 w-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              We're committed to reducing our environmental footprint and promoting sustainable practices.
            </p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-brand-purple h-12 w-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We constantly seek new ways to improve our products, services, and customer experience.
            </p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="bg-brand-purple h-12 w-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              We build meaningful relationships with our customers, partners, and the communities we serve.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the passionate individuals who make ShopSpark possible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            {name: "Sarah Johnson", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"},
            {name: "Michael Chen", role: "Chief Product Officer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"},
            {name: "Aisha Patel", role: "Head of Design", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"},
            {name: "David Kim", role: "Lead Developer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"},
          ].map((member, index) => (
            <motion.div 
              key={member.name}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover object-center" 
              />
              <div className="p-6">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-brand-purple">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Join Us Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Whether you're a customer, partner, or potential team member, we'd love to connect with you and explore how we can create something amazing together.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-brand-purple hover:bg-brand-purple-dark">
            Shop Our Products
          </Button>
          <Button variant="outline" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
