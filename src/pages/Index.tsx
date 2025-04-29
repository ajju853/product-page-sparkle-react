
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoriesSection from '@/components/CategoriesSection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';

const Index: React.FC = () => {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <CategoriesSection />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Index;
