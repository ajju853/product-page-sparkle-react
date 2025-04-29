
import React, { useState, useEffect, useRef } from 'react';
import { fetchProducts, fetchProductCategories, Product } from '@/services/productApi';
import ProductGrid from '@/components/ProductGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X, Sun, Moon, ArrowDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import ProductCardEnhanced from '@/components/ProductCardEnhanced';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchProductCategories()
        ]);
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
        
        // Set initial price range based on min/max product prices
        if (productsData.length > 0) {
          const prices = productsData.map(p => p.price);
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));
          setPriceRange([minPrice, maxPrice]);
        }

        toast({
          title: "Products loaded!",
          description: `Found ${productsData.length} amazing products for you.`,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Could not load products. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  // Apply filters and search
  useEffect(() => {
    if (products.length === 0) return;
    
    let filtered = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Default sorting (no change)
        break;
    }
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategories, priceRange, sortOption]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    const minPrice = Math.floor(Math.min(...products.map(p => p.price)));
    const maxPrice = Math.ceil(Math.max(...products.map(p => p.price)));
    setPriceRange([minPrice, maxPrice]);
    setSortOption('default');
    
    toast({
      title: "Filters cleared",
      description: "Showing all products",
    });
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: isDarkMode ? "Light mode activated" : "Dark mode activated",
      description: isDarkMode ? "Switching to light theme" : "Switching to dark theme",
    });
  };

  const handleToggleAnimations = () => {
    setAnimationsEnabled(!animationsEnabled);
    toast({
      title: animationsEnabled ? "Animations disabled" : "Animations enabled",
      description: animationsEnabled ? "Animations have been turned off" : "Animations have been turned on",
    });
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div 
        ref={headerRef}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? `${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-lg shadow-md` 
            : isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1 max-w-2xl w-full">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-brand-purple-light to-brand-purple-dark">
                  Discover Amazing Products
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Find the perfect item from our curated collection
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleToggleDarkMode}
                  className={`rounded-full transition-all duration-300 ${
                    isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleAnimations}
                  className={`rounded-full transition-all duration-300 ${
                    isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {animationsEnabled ? 'Disable Animations' : 'Enable Animations'}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className={`relative flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full overflow-hidden shadow-sm`}>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="search"
                  placeholder="Search for amazing products..."
                  className={`pl-12 pr-4 py-6 border-none rounded-full ${isDarkMode ? 'bg-gray-800 text-white placeholder:text-gray-400' : 'bg-white text-gray-900 placeholder:text-gray-500'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={`flex items-center gap-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-100'}`}
                    >
                      <SlidersHorizontal size={18} />
                      <span className="hidden sm:inline">Filters</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent 
                    side="right" 
                    className={isDarkMode ? 'bg-gray-900 text-white border-gray-800' : 'bg-white text-gray-900 border-gray-200'}
                  >
                    <SheetHeader>
                      <SheetTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        Product Filters
                      </SheetTitle>
                      <SheetDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Refine your search with these options
                      </SheetDescription>
                    </SheetHeader>
                    
                    <motion.div 
                      className="py-6 space-y-8"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Categories</h3>
                        <div className="space-y-2">
                          {categories.map(category => (
                            <motion.div 
                              key={category} 
                              className="flex items-center space-x-2"
                              whileHover={{ scale: 1.02 }}
                            >
                              <Checkbox
                                id={`category-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) => 
                                  handleCategoryChange(category, checked as boolean)
                                }
                              />
                              <Label 
                                htmlFor={`category-${category}`} 
                                className={`capitalize ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                              >
                                {category}
                              </Label>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Price Range</h3>
                        <Slider
                          defaultValue={priceRange}
                          min={0}
                          max={1000}
                          step={1}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className={isDarkMode ? 'bg-gray-800' : ''}
                        />
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            ${priceRange[0]}
                          </span>
                          <span className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            ${priceRange[1]}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Sort By</h3>
                        <div className="grid grid-cols-1 gap-2">
                          <Button
                            variant={sortOption === 'default' ? 'default' : 'outline'}
                            onClick={() => setSortOption('default')}
                            className="justify-start rounded-full"
                          >
                            Default
                          </Button>
                          <Button
                            variant={sortOption === 'price-asc' ? 'default' : 'outline'}
                            onClick={() => setSortOption('price-asc')}
                            className="justify-start rounded-full"
                          >
                            Price: Low to High
                          </Button>
                          <Button
                            variant={sortOption === 'price-desc' ? 'default' : 'outline'}
                            onClick={() => setSortOption('price-desc')}
                            className="justify-start rounded-full"
                          >
                            Price: High to Low
                          </Button>
                          <Button
                            variant={sortOption === 'rating' ? 'default' : 'outline'}
                            onClick={() => setSortOption('rating')}
                            className="justify-start rounded-full"
                          >
                            Highest Rated
                          </Button>
                          <Button
                            variant={sortOption === 'name-asc' ? 'default' : 'outline'}
                            onClick={() => setSortOption('name-asc')}
                            className="justify-start rounded-full"
                          >
                            Name: A-Z
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                    
                    <SheetFooter className="pt-4">
                      <SheetClose asChild>
                        <Button 
                          onClick={handleClearFilters} 
                          variant="outline" 
                          className="w-full rounded-full"
                        >
                          Reset Filters
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button className="w-full rounded-full bg-brand-purple hover:bg-brand-purple-dark">
                          Apply Filters
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                
                {(searchQuery || selectedCategories.length > 0 || sortOption !== 'default') && (
                  <Button 
                    variant="ghost" 
                    onClick={handleClearFilters} 
                    size="icon"
                    className={`rounded-full ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <X size={18} />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence>
          {selectedCategories.length > 0 && (
            <motion.div 
              className="mb-4 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {selectedCategories.map(category => (
                <motion.div 
                  key={category} 
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                    isDarkMode 
                      ? 'bg-brand-purple/30 text-white border border-brand-purple/50' 
                      : 'bg-brand-purple/10 text-brand-purple border border-brand-purple/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <span className="capitalize">{category}</span>
                  <button 
                    onClick={() => handleCategoryChange(category, false)}
                    className="ml-1 hover:bg-brand-purple-dark rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className={`mb-4 px-4 py-3 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-800/50 backdrop-blur border border-gray-700/30' 
              : 'bg-white/50 backdrop-blur shadow-sm border border-gray-100'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </span>
            <motion.button
              className={`flex items-center gap-1 text-sm ${
                isDarkMode ? 'text-brand-purple-light' : 'text-brand-purple'
              } hover:underline`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top <ArrowDown className="rotate-180" size={14} />
            </motion.button>
          </div>
        </motion.div>
        
        {animationsEnabled ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <ProductCardEnhanced 
              products={filteredProducts} 
              loading={isLoading} 
              isDarkMode={isDarkMode}
            />
          </motion.div>
        ) : (
          <div className="opacity-100">
            <ProductGrid products={filteredProducts} loading={isLoading} />
          </div>
        )}
        
        {!isLoading && filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-16 ${
              isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'
            } rounded-xl`}
          >
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-purple/10 mb-4">
              <Search className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No Results Found</h3>
            <p className={`mb-6 max-w-md mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              We couldn't find any products matching your criteria. Try adjusting your filters or search term.
            </p>
            <Button 
              onClick={handleClearFilters} 
              className="rounded-full bg-brand-purple hover:bg-brand-purple-dark"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
