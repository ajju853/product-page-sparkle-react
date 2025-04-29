
import React, { useState, useEffect } from 'react';
import { fetchProducts, Product } from '@/services/productApi';
import ProductGrid from './ProductGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getProducts();
  }, []);
  
  const getCategoryProducts = (category: string) => {
    if (category === 'all') {
      return products.slice(0, 8);
    }
    return products
      .filter(product => product.category === category)
      .slice(0, 8);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Featured Products</h2>
        <p className="text-gray-600 text-center mb-8">
          Discover our collection of top rated products
        </p>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex flex-wrap justify-center mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <ProductGrid products={getCategoryProducts('all')} loading={isLoading} />
          </TabsContent>
          
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <ProductGrid products={getCategoryProducts(category)} loading={isLoading} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FeaturedProducts;
