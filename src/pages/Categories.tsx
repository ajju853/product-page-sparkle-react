
import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchProductCategories, Product } from '@/services/productApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Grid3X3, List, ShoppingBag } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';

const categoryImages: Record<string, string> = {
  "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&q=80",
  "jewelery": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&q=80",
  "men's clothing": "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&q=80",
  "women's clothing": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&q=80",
};

const CategoryHeader: React.FC<{ category: string | null }> = ({ category }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-brand-purple to-brand-purple-dark mb-8">
      <div className="absolute inset-0 opacity-20">
        {category && categoryImages[category] && (
          <img 
            src={categoryImages[category]} 
            alt={category} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="relative py-16 px-8 text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 capitalize">
          {category || "All Categories"}
        </h1>
        <p className="text-lg text-white/80 max-w-2xl">
          Discover our premium selection of {category || "products"} crafted with quality and style in mind. 
          From everyday essentials to unique finds.
        </p>
      </div>
    </div>
  );
};

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchProductCategories()
        ]);
        
        let filteredProducts = [...productsData];
        if (categoryParam) {
          filteredProducts = productsData.filter(product => 
            product.category.toLowerCase() === categoryParam.toLowerCase()
          );
        }
        
        setProducts(filteredProducts);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [categoryParam]);

  const handleCategoryClick = (category: string | null) => {
    if (category) {
      navigate(`/categories?category=${category}`);
    } else {
      navigate('/categories');
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <CategoryHeader category={categoryParam} />
      
      {/* Categories Navigation */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <Button 
          variant={!categoryParam ? "default" : "outline"}
          onClick={() => handleCategoryClick(null)} 
          className="capitalize"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button 
            key={category} 
            variant={categoryParam === category ? "default" : "outline"}
            onClick={() => handleCategoryClick(category)} 
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>
      
      <Separator className="mb-8" />
      
      {/* Product Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{products.length}</span> products
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === 'grid' ? "default" : "outline"} 
            size="icon" 
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 size={18} />
          </Button>
          <Button 
            variant={viewMode === 'list' ? "default" : "outline"} 
            size="icon" 
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
          </Button>
        </div>
      </div>
      
      {/* Products Display */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No Products Found</h3>
          <p className="text-muted-foreground mb-6">We couldn't find any products matching your criteria.</p>
          <Button onClick={() => handleCategoryClick(null)}>View All Products</Button>
        </div>
      ) : viewMode === 'grid' ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
        >
          <ProductGrid products={products} />
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              variants={item}
              className="flex flex-col md:flex-row gap-6 bg-white rounded-lg overflow-hidden border p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-full md:w-40 h-40 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="h-full w-full object-contain p-4"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-2">{product.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="mr-1">★</span>
                  <span>{product.rating.rate} ({product.rating.count} reviews)</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-semibold text-brand-purple">${product.price.toFixed(2)}</span>
                  <Button 
                    onClick={() => navigate(`/product/${product.id}`)}
                    variant="outline"
                    className="text-sm flex items-center gap-2"
                  >
                    View Details <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Related Categories */}
      {products.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Explore Related Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(cat => cat !== categoryParam).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <img 
                  src={categoryImages[category]} 
                  alt={category} 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-lg font-semibold text-white capitalize">{category}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
