"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/container";
import DisplayCards from "@/components/ui/display-cards";

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

  // Create enhanced cards for DisplayCards component based on features
  const featureCards = features.map((feature, index) => ({
    icon: feature.icon,
    title: feature.title,
    description: feature.description,
    date: index === activeFeature ? "Active" : "Featured",
    iconClassName: index === activeFeature ? "text-primary" : "text-primary/70",
    titleClassName: index === activeFeature ? "text-primary font-bold" : "text-primary/70",
    className: `
      ${index === activeFeature ? "border-primary shadow-lg" : "border-transparent"} 
      ${index === 0 
        ? "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0" 
        : index === 1 
          ? "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0" 
          : "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10"
      }
      ${index === activeFeature ? "grayscale-0" : "grayscale-[80%]"}
      transition-all duration-500 ease-in-out
      backdrop-blur-sm
      ${index === activeFeature ? "bg-primary/5" : "bg-muted/70"}
      hover:bg-primary/10
      hover:scale-105
    `
  }));

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
        
        {/* Enhanced Display Cards for mobile view */}
        <motion.div 
          className="md:hidden mb-16 max-w-md mx-auto relative px-4 sm:px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute -z-10 w-full h-full blur-3xl bg-primary/5 rounded-full" />
          <motion.div
            animate={{
              scale: [0.95, 1, 0.95],
              rotateZ: [-1, 1, -1]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          >
            <DisplayCards cards={featureCards} />
          </motion.div>
          <div className="mt-8 flex justify-center gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeFeature ? 'bg-primary w-6' : 'bg-primary/30'}`}
                onClick={() => setActiveFeature(index)}
                aria-label={`View feature ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Traditional cards for larger screens */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6">
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
                className={`h-full transition-all duration-500 hover:shadow-xl border-2 ${index === activeFeature ? 'border-primary shadow-md bg-primary/5' : 'border-transparent'} focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 backdrop-blur-sm hover:bg-primary/10 hover:scale-105`}
                onClick={() => setActiveFeature(index)}
                tabIndex={0}
                role="button"
                aria-pressed={index === activeFeature}
                onKeyDown={(e) => e.key === 'Enter' && setActiveFeature(index)}
              >
                <CardHeader>
                  <motion.div 
                    className="p-4 bg-primary/10 rounded-full w-fit mb-4 relative overflow-hidden"
                    animate={index === activeFeature ? {
                      scale: [1, 1.1, 1],
                      backgroundColor: ['rgba(var(--primary), 0.1)', 'rgba(var(--primary), 0.2)', 'rgba(var(--primary), 0.1)'],
                    } : {}}
                    transition={{ duration: 1.5, repeat: index === activeFeature ? Infinity : 0, repeatType: "reverse" }}
                    whileHover={{ scale: 1.15, rotate: [0, 5, 0] }}
                  >
                    {index === activeFeature && (
                      <motion.div 
                        className="absolute inset-0 bg-primary/10 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0.8 }}
                    animate={index === activeFeature ? { opacity: 1, y: [2, 0, 2] } : { opacity: 0.8 }}
                    transition={{ duration: 3, repeat: index === activeFeature ? Infinity : 0, repeatType: "reverse" }}
                  >
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}