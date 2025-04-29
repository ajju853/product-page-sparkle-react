
import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchProductCategories, Product } from '@/services/productApi';
import ProductGrid from '@/components/ProductGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
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

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');

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
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

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
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your product search with these filters
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <Label htmlFor={`category-${category}`} className="capitalize">
                          {category}
                        </Label>
                      </div>
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
                  />
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sort By</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant={sortOption === 'default' ? 'default' : 'outline'}
                      onClick={() => setSortOption('default')}
                      className="justify-start"
                    >
                      Default
                    </Button>
                    <Button
                      variant={sortOption === 'price-asc' ? 'default' : 'outline'}
                      onClick={() => setSortOption('price-asc')}
                      className="justify-start"
                    >
                      Price: Low to High
                    </Button>
                    <Button
                      variant={sortOption === 'price-desc' ? 'default' : 'outline'}
                      onClick={() => setSortOption('price-desc')}
                      className="justify-start"
                    >
                      Price: High to Low
                    </Button>
                    <Button
                      variant={sortOption === 'rating' ? 'default' : 'outline'}
                      onClick={() => setSortOption('rating')}
                      className="justify-start"
                    >
                      Highest Rated
                    </Button>
                    <Button
                      variant={sortOption === 'name-asc' ? 'default' : 'outline'}
                      onClick={() => setSortOption('name-asc')}
                      className="justify-start"
                    >
                      Name: A-Z
                    </Button>
                  </div>
                </div>
              </div>
              
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={handleClearFilters} variant="outline" className="w-full sm:w-auto">
                    Clear Filters
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="w-full sm:w-auto">
                    Apply Filters
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          {(searchQuery || selectedCategories.length > 0 || sortOption !== 'default') && (
            <Button variant="ghost" onClick={handleClearFilters} size="icon">
              <X size={18} />
            </Button>
          )}
        </div>
      </div>
      
      <div className="mb-4 flex flex-wrap gap-2">
        {selectedCategories.map(category => (
          <div key={category} className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <span className="capitalize">{category}</span>
            <button 
              onClick={() => handleCategoryChange(category, false)}
              className="ml-1 hover:bg-brand-purple-dark rounded-full"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        <span className="text-gray-500">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </span>
      </div>
      
      <ProductGrid products={filteredProducts} loading={isLoading} />
    </div>
  );
};

export default ProductsPage;
