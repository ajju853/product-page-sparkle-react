
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const [authType, setAuthType] = React.useState<'login' | 'register'>('login');

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button className="bg-brand-purple hover:bg-brand-purple-dark">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {/* Cart Items */}
          {items.map(item => (
            <div key={item.product.id} className="flex flex-col sm:flex-row border rounded-lg p-4 gap-4">
              <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                <div className="w-full sm:w-24 h-24 bg-gray-50 rounded">
                  <img 
                    src={item.product.image} 
                    alt={item.product.title} 
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              </Link>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between">
                  <Link to={`/product/${item.product.id}`} className="font-medium hover:underline">
                    {item.product.title}
                  </Link>
                  <span className="font-semibold text-brand-purple">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                
                <span className="text-sm text-gray-500 mb-2">
                  ${item.product.price.toFixed(2)} each
                </span>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border rounded">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value > 0) {
                          updateQuantity(item.product.id, value);
                        }
                      }}
                      className="h-8 w-12 border-none text-center p-0"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(getTotalPrice() + getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
            </div>
            
            {isAuthenticated ? (
              <Button className="w-full bg-brand-purple hover:bg-brand-purple-dark">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-brand-purple hover:bg-brand-purple-dark">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>
                    {authType === 'login' ? 'Sign In to Continue' : 'Create Account'}
                  </DialogTitle>
                  {authType === 'login' ? (
                    <div className="space-y-4">
                      <LoginForm />
                      <div className="text-center">
                        <span className="text-sm text-gray-500">Don't have an account? </span>
                        <Button 
                          variant="link" 
                          className="p-0" 
                          onClick={() => setAuthType('register')}
                        >
                          Sign Up
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <RegisterForm />
                      <div className="text-center">
                        <span className="text-sm text-gray-500">Already have an account? </span>
                        <Button 
                          variant="link" 
                          className="p-0" 
                          onClick={() => setAuthType('login')}
                        >
                          Sign In
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
