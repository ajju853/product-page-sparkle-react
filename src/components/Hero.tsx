
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  // Add a scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroImage = document.getElementById('hero-image');
      const overlayShapes = document.querySelectorAll('.overlay-shape');
      
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
      
      overlayShapes.forEach((shape, index) => {
        const el = shape as HTMLElement;
        el.style.transform = `translateY(${scrollY * (0.05 + index * 0.02)}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover Amazing 
              <span className="text-brand-purple"> Products</span>
              <br /> For Your Lifestyle
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Shop our curated collection of high-quality products designed to enhance your everyday life.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-brand-purple hover:bg-brand-purple-dark text-white group"
              >
                <Link to="/products" className="flex items-center">
                  Shop Now 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group"
              >
                <Link to="/categories" className="flex items-center">
                  Browse Categories
                  <MousePointerClick className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
            </motion.div>
            <motion.div 
              className="mt-8 grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="font-bold text-xl text-brand-purple">100+</div>
                <div className="text-sm text-gray-600">Brands</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="font-bold text-xl text-brand-purple">1000+</div>
                <div className="text-sm text-gray-600">Products</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="font-bold text-xl text-brand-purple">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl p-4 md:p-8 relative z-10"
              animate={{ 
                y: [0, -10, 0],
                boxShadow: [
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)", 
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1)", 
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                ]
              }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut", 
                times: [0, 0.5, 1],
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img 
                id="hero-image"
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Modern workspace with laptop" 
                className="w-full h-auto rounded"
              />
              
              {/* Floating elements animation */}
              <motion.div 
                className="absolute top-1/3 -left-8 w-16 h-16 bg-brand-purple rounded-full opacity-30 overlay-shape"
                animate={{ 
                  scale: [1, 1.2, 1],
                  x: [0, -5, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 5, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.div 
                className="absolute bottom-1/4 -right-5 w-12 h-12 bg-brand-purple-light rounded-lg opacity-30 overlay-shape"
                animate={{ 
                  scale: [1, 0.8, 1],
                  rotate: [0, 15, 0],
                  y: [0, 15, 0]
                }}
                transition={{ 
                  duration: 7, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
            <motion.div 
              className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-brand-purple rounded-lg -z-10 overlay-shape"
              animate={{ 
                rotate: [0, 2, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 8, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute -top-6 -left-6 w-1/3 h-1/3 bg-gray-200 rounded-lg -z-10 overlay-shape"
              animate={{ 
                rotate: [0, -3, 0],
                scale: [1, 0.98, 1]
              }}
              transition={{ 
                duration: 6, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
