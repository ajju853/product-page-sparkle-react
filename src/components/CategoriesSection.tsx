
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductCategories } from '@/services/productApi';

interface CategoryCardProps {
  title: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image }) => {
  return (
    <Link 
      to={`/categories?category=${title}`} 
      className="group relative overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
    >
      <div className="aspect-square bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
        <h3 className="text-lg font-semibold text-white capitalize">{title}</h3>
      </div>
    </Link>
  );
};

const categoryImages: Record<string, string> = {
  "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&q=80",
  "jewelery": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&q=80",
  "men's clothing": "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&q=80",
  "women's clothing": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&q=80",
};

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProductCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Browse Categories</h2>
            <p className="text-gray-600 mt-2">Find products by category</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-square rounded-lg bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Browse Categories</h2>
          <p className="text-gray-600 mt-2">Find products by category</p>
          <div className="mt-4">
            <Link 
              to="/categories" 
              className="inline-flex items-center text-brand-purple hover:underline font-medium"
            >
              View All Categories
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              title={category}
              image={categoryImages[category]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
