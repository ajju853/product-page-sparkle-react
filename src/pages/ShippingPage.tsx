
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Package, Clock, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ShippingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Shipping & Returns</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about our shipping policies, delivery times, and return process.
        </p>
      </motion.div>

      <Tabs defaultValue="shipping" className="max-w-4xl mx-auto">
        <TabsList className="flex justify-center mb-8">
          <TabsTrigger value="shipping">Shipping Policy</TabsTrigger>
          <TabsTrigger value="returns">Returns & Exchanges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shipping">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">Shipping Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-brand-purple/10 p-2 rounded-full">
                      <Truck className="h-6 w-6 text-brand-purple" />
                    </div>
                    <div>
                      <CardTitle>Standard Shipping</CardTitle>
                      <CardDescription>3-5 business days</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">
                      Free for orders over $50
                    </p>
                    <p className="text-base font-medium">$4.99 for orders under $50</p>
                  </CardContent>
                </Card>
                
                <Card className="border-brand-purple">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-brand-purple p-2 rounded-full">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>Express Shipping</CardTitle>
                      <CardDescription>1-2 business days</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">
                      Available for all orders
                    </p>
                    <p className="text-base font-medium">$9.99 flat rate</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-brand-purple/10 p-2 rounded-full">
                      <Globe className="h-6 w-6 text-brand-purple" />
                    </div>
                    <div>
                      <CardTitle>International</CardTitle>
                      <CardDescription>7-14 business days</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">
                      Available to most countries
                    </p>
                    <p className="text-base font-medium">Starting at $14.99</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">Shipping Process</h2>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-purple text-white font-bold text-sm mr-3 mt-1">1</span>
                  <div>
                    <h3 className="font-medium text-lg">Order Processing</h3>
                    <p className="text-gray-600">
                      Once your order is placed, it typically takes 1-2 business days to process, verify, and prepare for shipping.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-purple text-white font-bold text-sm mr-3 mt-1">2</span>
                  <div>
                    <h3 className="font-medium text-lg">Shipping Confirmation</h3>
                    <p className="text-gray-600">
                      You'll receive a shipping confirmation email with tracking information once your order ships.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-purple text-white font-bold text-sm mr-3 mt-1">3</span>
                  <div>
                    <h3 className="font-medium text-lg">In Transit</h3>
                    <p className="text-gray-600">
                      Your package is on its way! You can track your order using the provided tracking number.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-purple text-white font-bold text-sm mr-3 mt-1">4</span>
                  <div>
                    <h3 className="font-medium text-lg">Delivery</h3>
                    <p className="text-gray-600">
                      Your order will be delivered according to the selected shipping method's timeframe.
                    </p>
                  </div>
                </li>
              </ol>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Shipping FAQs</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">Do you ship to P.O. boxes?</h3>
                  <p className="text-gray-600">
                    Yes, we ship to P.O. boxes for standard shipping, but not for express shipping.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-lg">What happens if I'm not home for delivery?</h3>
                  <p className="text-gray-600">
                    For most shipments, the carrier will leave the package at your door. For packages requiring signature, they'll leave a notice and attempt delivery again.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Can I change my shipping address after placing an order?</h3>
                  <p className="text-gray-600">
                    Address changes can only be made within 1 hour of placing your order. Please contact customer service immediately if you need to make changes.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="returns">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <Package className="h-6 w-6 text-brand-purple mr-3" />
                  <h3 className="font-semibold text-lg">30-Day Returns</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We offer a 30-day return policy for most items in their original condition. Items must be unused, unworn, and in the original packaging with all tags attached.
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Eligible for Returns:</p>
                  <ul className="list-disc list-inside text-gray-600 pl-4 mb-4">
                    <li>Unworn clothing with tags attached</li>
                    <li>Unopened beauty products</li>
                    <li>Unused accessories</li>
                    <li>Electronics within 30 days (must be unopened for full refund)</li>
                  </ul>
                  
                  <p className="font-medium">Not Eligible for Returns:</p>
                  <ul className="list-disc list-inside text-gray-600 pl-4">
                    <li>Intimate apparel and swimwear</li>
                    <li>Personalized or custom-made items</li>
                    <li>Final sale items (marked as such)</li>
                    <li>Gift cards</li>
                    <li>Opened beauty products</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">Return Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-brand-purple/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-brand-purple">1</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-center mb-2">Start Your Return</h3>
                  <p className="text-center text-gray-600">
                    Log in to your account, find your order, and select "Return or Replace Items."
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-brand-purple/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-brand-purple">2</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-center mb-2">Package Your Return</h3>
                  <p className="text-center text-gray-600">
                    Pack items in original packaging with all tags. Include the return form in the package.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-brand-purple/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-brand-purple">3</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-center mb-2">Ship It Back</h3>
                  <p className="text-center text-gray-600">
                    Use the provided return label or ship it to our returns address with tracking.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-brand-purple mr-3" />
                  <h3 className="font-semibold text-lg">Refund Processing</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Once we receive your return, we'll inspect the items and process your refund within 5-7 business days. The refund will be issued to your original payment method.
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Please note:</span> Return shipping costs are the responsibility of the customer unless the return is due to our error or a defective product.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
              <p className="text-gray-600 mb-6">
                Need a different size or color? We make exchanges easy. Instead of returning and reordering, you can request an exchange directly through your account.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">How to Request an Exchange</h3>
                  <ol className="list-decimal list-inside text-gray-600 pl-4">
                    <li className="mb-2">Log in to your account and go to "Order History"</li>
                    <li className="mb-2">Select the order containing the item you want to exchange</li>
                    <li className="mb-2">Click "Return or Exchange" next to the item</li>
                    <li className="mb-2">Select "Exchange for a different size/color"</li>
                    <li>Complete the exchange form and follow the shipping instructions</li>
                  </ol>
                </div>
              </div>
              
              <div className="mt-6">
                <Button>Start a Return or Exchange</Button>
              </div>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShippingPage;
