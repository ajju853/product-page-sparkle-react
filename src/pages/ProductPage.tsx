
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct, fetchProducts, Product } from '@/services/productApi';
import ProductDetails from '@/components/ProductDetails';
import ProductGrid from '@/components/ProductGrid';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProductData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const productData = await fetchProduct(Number(id));
        
        if (!productData) {
          setError('Product not found');
          return;
        }
        
        setProduct(productData);
        
        // Fetch related products from the same category
        const allProducts = await fetchProducts();
        const related = allProducts
          .filter(p => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4);
        
        setRelatedProducts(related);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    getProductData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg aspect-square animate-pulse"></div>
          <div className="space-y-6">
            <div className="h-8 bg-gray-100 w-3/4 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-100 w-1/4 rounded animate-pulse"></div>
            <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-500">{error || 'Product not found'}</h1>
        <p className="mt-4 text-gray-600">
          We couldn't find the product you're looking for.
        </p>
      </div>
    );
  }

  return (
    <>
      <ProductDetails product={product} />
      
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </>
  );
};

export default ProductPage;
