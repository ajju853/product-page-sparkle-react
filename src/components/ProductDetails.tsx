
import React, { useState } from 'react';
import { Product } from '@/services/productApi';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductDetailsProps {
  product: Product;
  relatedProducts?: Product[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, relatedProducts = [] }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
          <div className="aspect-square p-8 flex items-center justify-center bg-gray-50">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2 bg-brand-purple">{product.category}</Badge>
            <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
            
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating.rate) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          </div>
          
          <div className="text-3xl font-bold text-brand-purple">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-gray-600">{product.description}</p>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">Quantity:</span>
              <div className="flex items-center border rounded">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                className="flex-1 bg-brand-purple hover:bg-brand-purple-dark"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4">
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <p className="text-gray-600">{product.description}</p>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">Features</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>High-quality material</li>
              <li>Expertly crafted</li>
              <li>Built for durability</li>
              <li>Modern design</li>
              <li>Perfect for everyday use</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="reviews" className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <Button variant="outline">Write a Review</Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-brand-purple text-white flex items-center justify-center font-semibold">
                      JD
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">John Doe</p>
                    <div className="flex items-center mt-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">1 month ago</span>
                    </div>
                    <p className="text-gray-600">
                      Great product! Exactly what I was looking for. The quality exceeded my expectations and it arrived quickly.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-brand-purple-light text-white flex items-center justify-center font-semibold">
                      AS
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Anna Smith</p>
                    <div className="flex items-center mt-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="text-gray-600">
                      Absolutely love this! The description is spot on and it's even better in person. Would definitely buy again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="p-4">
            <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
            <p className="text-gray-600 mb-4">
              We ship worldwide with various delivery options. Standard shipping takes 3-5 business days within the continental US.
            </p>
            
            <h3 className="text-lg font-semibold mb-2 mt-4">Return Policy</h3>
            <p className="text-gray-600">
              If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange.
              Please note that items must be returned in their original condition and packaging.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
