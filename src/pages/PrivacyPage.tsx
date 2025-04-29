
import React from "react";
import { motion } from "framer-motion";
import { Shield, LockKeyhole, Eye, FileLock } from "lucide-react";

const PrivacyPage = () => {
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

  // Last updated date
  const lastUpdated = "April 15, 2025";

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600">
          Last Updated: {lastUpdated}
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-brand-purple mr-3" />
              <h2 className="text-2xl font-bold">Introduction</h2>
            </div>
            <p className="text-gray-700 mb-4">
              At ShopSpark, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
            <p className="text-gray-700">
              This privacy policy applies to all information collected through our website, as well as any related services, sales, marketing, or events.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <LockKeyhole className="h-6 w-6 text-brand-purple mr-3" />
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">Personal Information You Disclose to Us</h3>
            <p className="text-gray-700 mb-4">
              We collect personal information that you voluntarily provide to us when you register on our website, express an interest in obtaining information about us or our products and services, participate in activities on the website, or otherwise contact us.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="font-semibold mb-2">The personal information we collect may include:</p>
              <ul className="list-disc list-inside text-gray-700 pl-4">
                <li className="mb-1">Names</li>
                <li className="mb-1">Email addresses</li>
                <li className="mb-1">Mailing addresses</li>
                <li className="mb-1">Phone numbers</li>
                <li className="mb-1">Billing information</li>
                <li className="mb-1">Usernames</li>
                <li className="mb-1">Passwords</li>
                <li>Profile information (gender, purchase history, preferences)</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">Information Automatically Collected</h3>
            <p className="text-gray-700 mb-4">
              We automatically collect certain information when you visit, use, or navigate our website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our website, and other technical information.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-brand-purple mr-3" />
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              We use the information we collect or receive for the following purposes:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Business Operations</h4>
                <ul className="list-disc list-inside text-gray-700 pl-2">
                  <li>Process and fulfill orders</li>
                  <li>Manage user accounts</li>
                  <li>Send administrative information</li>
                  <li>Respond to inquiries and customer service requests</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Marketing & Communication</h4>
                <ul className="list-disc list-inside text-gray-700 pl-2">
                  <li>Send marketing communications</li>
                  <li>Deliver targeted advertising</li>
                  <li>Share promotional offers</li>
                  <li>Request feedback and surveys</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">User Experience</h4>
                <ul className="list-disc list-inside text-gray-700 pl-2">
                  <li>Personalize user experience</li>
                  <li>Improve our website</li>
                  <li>Analyze usage patterns</li>
                  <li>Develop new products and services</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Legal & Safety</h4>
                <ul className="list-disc list-inside text-gray-700 pl-2">
                  <li>Protect our rights and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                  <li>Address disputes and enforce agreements</li>
                  <li>Ensure website security</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <FileLock className="h-6 w-6 text-brand-purple mr-3" />
              <h2 className="text-2xl font-bold">Information Sharing and Disclosure</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              We may share your information in the following situations:
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Third-Party Service Providers</h3>
                <p className="text-gray-700">
                  We may share your data with third-party service providers that help us operate our website, conduct our business, or service you.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Business Transfers</h3>
                <p className="text-gray-700">
                  We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Legal Obligations</h3>
                <p className="text-gray-700">
                  We may disclose your information where we are legally required to do so to comply with applicable law, governmental requests, judicial proceedings, court orders, or legal processes.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">With Your Consent</h3>
                <p className="text-gray-700">
                  We may disclose your personal information for any other purpose with your consent.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
            
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have the following data protection rights:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 pl-4 mb-6">
              <li className="mb-2">The right to access, update, or delete your personal information.</li>
              <li className="mb-2">The right of rectification - to have your information corrected if it is inaccurate or incomplete.</li>
              <li className="mb-2">The right to object to our processing of your personal data.</li>
              <li className="mb-2">The right of restriction - to request that we restrict the processing of your personal information.</li>
              <li className="mb-2">The right to data portability - to receive a copy of your personal data in a structured, machine-readable format.</li>
              <li>The right to withdraw consent at any time where we relied on your consent to process your personal information.</li>
            </ul>
            
            <p className="text-gray-700">
              To exercise these rights, please contact us using the contact information provided below.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Security of Your Information</h2>
            
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
            
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date at the top of this privacy policy. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            
            <p className="text-gray-700 mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">ShopSpark, Inc.</h3>
              <p className="text-gray-700 mb-1">123 Commerce Street</p>
              <p className="text-gray-700 mb-1">New York, NY 10001</p>
              <p className="text-gray-700 mb-1">United States</p>
              <p className="text-gray-700 mb-1">Email: privacy@shopspark.com</p>
              <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default PrivacyPage;
