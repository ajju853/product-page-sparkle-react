
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/services/productApi';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Maximize2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ProductCardEnhancedProps {
  products: Product[];
  loading?: boolean;
  isDarkMode?: boolean;
}

const ProductCardEnhanced: React.FC<ProductCardEnhancedProps> = ({ 
  products, 
  loading = false,
  isDarkMode = false
}) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [favoriteItems, setFavoriteItems] = useState<number[]>([]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card 
            key={index} 
            className={`overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur border-gray-700' 
                : 'bg-white/60 backdrop-blur border-gray-100'
            } animate-pulse`}
          >
            <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);

    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const toggleFavorite = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favoriteItems.includes(productId)) {
      setFavoriteItems(favoriteItems.filter(id => id !== productId));
      toast({
        title: "Removed from favorites",
        description: "Item removed from your wishlist",
      });
    } else {
      setFavoriteItems([...favoriteItems, productId]);
      toast({
        title: "Added to favorites!",
        description: "Item added to your wishlist",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div 
          key={product.id}
          className="h-full"
          variants={itemVariants}
          whileHover={{ 
            y: -5, 
            transition: { duration: 0.2 } 
          }}
        >
          <Card className={`group h-full overflow-hidden relative border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/40 backdrop-blur-sm border-gray-700 hover:border-brand-purple/50 hover:shadow-lg hover:shadow-brand-purple/20' 
              : 'bg-white/60 backdrop-blur-sm border-gray-100 hover:border-brand-purple/30 hover:shadow-xl hover:shadow-brand-purple/10'
          }`}>
            <Link to={`/product/${product.id}`} className="block h-full">
              <div className="aspect-square w-full overflow-hidden relative">
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center p-6 bg-white dark:bg-gray-900 z-10"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <img
                    src={product.image}
                    alt=""
                    className="w-1/2 h-1/2 object-contain filter blur-xl"
                  />
                </motion.div>
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 z-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <Badge 
                  className={`absolute top-3 left-3 z-30 ${
                    isDarkMode 
                      ? 'bg-brand-purple/30 text-white backdrop-blur-sm border border-brand-purple/50' 
                      : 'bg-brand-purple/10 text-brand-purple backdrop-blur-sm border border-brand-purple/30'
                  }`}
                >
                  {product.category}
                </Badge>
                <motion.button
                  className={`absolute top-3 right-3 p-2 rounded-full z-30 ${
                    favoriteItems.includes(product.id)
                      ? 'bg-red-500/10 backdrop-blur-sm border border-red-500/30'
                      : isDarkMode 
                        ? 'bg-gray-700/30 backdrop-blur-sm border border-gray-600'
                        : 'bg-gray-100/30 backdrop-blur-sm border border-gray-200'
                  }`}
                  onClick={(e) => toggleFavorite(e, product.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart 
                    size={18} 
                    fill={favoriteItems.includes(product.id) ? "#f43f5e" : "none"}
                    className={favoriteItems.includes(product.id) ? "text-red-500" : "text-gray-500"}
                  />
                </motion.button>
                
                {/* Quick view button */}
                <motion.button
                  className={`absolute bottom-3 right-3 p-2 rounded-full z-30 ${
                    isDarkMode 
                      ? 'bg-gray-700/30 backdrop-blur-sm border border-gray-600' 
                      : 'bg-gray-100/30 backdrop-blur-sm border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Maximize2 size={18} className="text-gray-500" />
                    </HoverCardTrigger>
                    <HoverCardContent 
                      className={`w-80 p-0 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="p-4">
                        <h4 className="text-sm font-medium mb-1">{product.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-3">{product.description}</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.button>
                
                <div className={`absolute bottom-0 left-0 right-0 h-1/3 ${isDarkMode ? 'bg-gradient-to-t from-gray-900/80 to-transparent' : 'bg-gradient-to-t from-white/80 to-transparent'}`}></div>
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className={`font-medium text-sm line-clamp-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    {product.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.round(product.rating.rate) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className={`ml-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      ({product.rating.count})
                    </span>
                  </div>
                  <span className={`font-semibold ${isDarkMode ? 'text-brand-purple-light' : 'text-brand-purple'}`}>
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Button 
                    onClick={(e) => handleAddToCart(e, product)} 
                    className="w-full mt-3 rounded-full bg-brand-purple hover:bg-brand-purple-dark transition-colors"
                    size="sm"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </motion.div>
              </div>
            </Link>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductCardEnhanced;
