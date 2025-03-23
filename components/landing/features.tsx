"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/container";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  features: Feature[];
}

export function Features({ features }: FeaturesProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-muted/30" aria-labelledby="features-heading" role="region">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="features-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent inline-block">Powerful OCR Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
            Our AI-powered OCR technology makes document digitization faster and more accurate than ever.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
            >
              <Card 
                className={`h-full transition-all duration-300 hover:shadow-xl border-2 ${index === activeFeature ? 'border-primary shadow-md' : 'border-transparent'} focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2`}
                onClick={() => setActiveFeature(index)}
                tabIndex={0}
                role="button"
                aria-pressed={index === activeFeature}
                onKeyDown={(e) => e.key === 'Enter' && setActiveFeature(index)}
              >
                <CardHeader>
                  <motion.div 
                    className="p-4 bg-primary/10 rounded-full w-fit mb-4"
                    animate={index === activeFeature ? {
                      scale: [1, 1.1, 1],
                      backgroundColor: ['rgba(var(--primary), 0.1)', 'rgba(var(--primary), 0.2)', 'rgba(var(--primary), 0.1)'],
                    } : {}}
                    transition={{ duration: 1.5, repeat: index === activeFeature ? Infinity : 0, repeatType: "reverse" }}
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}