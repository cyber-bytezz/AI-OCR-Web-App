"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/container";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const defaultTestimonials = [
    {
      quote: "This OCR tool saved me hours of manual data entry. The accuracy is impressive!",
      author: "Sarah J.",
      role: "Small Business Owner"
    },
    {
      quote: "I use it daily to digitize receipts for expense tracking. Game changer for my workflow.",
      author: "Michael T.",
      role: "Freelancer"
    },
    {
      quote: "The table extraction feature is perfect for our research team analyzing documents.",
      author: "Dr. Lisa Chen",
      role: "Research Lead"
    }
  ];

  const displayTestimonials = testimonials || defaultTestimonials;

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent inline-block">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
            Join thousands of satisfied users who trust our OCR technology.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Card className={`h-full transition-all duration-300 hover:shadow-xl relative overflow-hidden ${hoveredIndex === index ? 'border-primary' : ''}`}>
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-primary/10 rounded-full z-0" />
                <CardContent className="pt-8 pb-8 relative z-10">
                  <div className="absolute -left-3 -top-3 text-primary/20">
                    <Quote size={48} />
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="text-primary"
                        animate={hoveredIndex === index ? { scale: [1, 1.2, 1], rotate: [0, 5, 0] } : {}}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </motion.svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-lg font-medium mb-6">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                  
                  
                  <div className="flex flex-col">
                    <p className="font-semibold">{testimonial.author}</p>
                    {testimonial.role && (
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}