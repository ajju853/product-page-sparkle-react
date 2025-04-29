
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/services/productApi';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Card className="group overflow-hidden border transition-all duration-300 hover:shadow-md animate-scale-in">
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-brand-purple">
            {product.category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-semibold text-brand-purple">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-1">★</span>
              <span>{product.rating.rate} ({product.rating.count})</span>
            </div>
          </div>
          <Button 
            onClick={handleAddToCart} 
            variant="outline" 
            className="w-full mt-3 transition-colors hover:bg-brand-purple hover:text-white"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
