
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Discover Amazing 
              <span className="text-brand-purple"> Products</span>
              <br /> For Your Lifestyle
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Shop our curated collection of high-quality products designed to enhance your everyday life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-brand-purple hover:bg-brand-purple-dark text-white"
              >
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
              >
                <Link to="/categories">
                  Browse Categories
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="font-bold text-xl text-brand-purple">100+</div>
                <div className="text-sm text-gray-600">Brands</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl text-brand-purple">1000+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl text-brand-purple">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative animate-scale-in">
            <div className="bg-white rounded-lg shadow-xl p-4 md:p-8 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Product showcase" 
                className="w-full h-auto rounded"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-brand-purple rounded-lg -z-10"></div>
            <div className="absolute -top-6 -left-6 w-1/3 h-1/3 bg-gray-200 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
