
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart,
  User,
  Search,
  Menu,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center text-xl font-bold">
          <span className="text-brand-purple">Shop</span>
          <span>Spark</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
            Products
          </Link>
          <Link to="/categories" className="text-sm font-medium transition-colors hover:text-primary">
            Categories
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span className="font-medium">{user?.name || 'User'}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/orders" className="w-full">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Sign In</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  {authType === 'login' ? 'Sign In' : 'Create Account'}
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
          
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/categories" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Categories
            </Link>
            <Link to="/about" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <div className="pt-2">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full"
              />
            </div>
            <div className="pt-2">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Hello, {user?.name || 'User'}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Profile
                      </Button>
                    </Link>
                    <Button onClick={logout} variant="outline" size="sm" className="w-full">
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => setAuthType('login')}
                        variant="outline" 
                        size="sm"
                        className="w-full"
                      >
                        Sign In
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>
                        {authType === 'login' ? 'Sign In' : 'Create Account'}
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => setAuthType('register')}
                        variant="outline" 
                        size="sm"
                        className="w-full"
                      >
                        Sign Up
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>
                        {authType === 'login' ? 'Sign In' : 'Create Account'}
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
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 w-full bg-white p-4 shadow-md border-t z-10 hidden md:block">
          <div className="container mx-auto flex items-center">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full"
              autoFocus
            />
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(false)}
              className="ml-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
