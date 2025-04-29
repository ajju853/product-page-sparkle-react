
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Customer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "I absolutely love shopping here! The quality of products is exceptional, and the customer service is second to none. Will definitely be a returning customer!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Thompson",
    role: "Verified Customer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Fast shipping and the products are exactly as described. I've been shopping here for months and have never been disappointed.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Verified Customer",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    content: "The selection of products is amazing! I always find what I'm looking for at reasonable prices. The website is also very easy to navigate.",
    rating: 4
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          <p className="text-gray-600 mt-2">Trusted by thousands of satisfied customers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                    }`} 
                  />
                ))}
              </div>
              
              <blockquote className="text-gray-600 italic mb-6">"{testimonial.content}"</blockquote>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
