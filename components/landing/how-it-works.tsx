"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Upload, Cpu, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/container";

interface Step {
  step: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface HowItWorksProps {
  steps?: Step[];
}

export function HowItWorks({ steps }: HowItWorksProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  const defaultSteps = [
    {
      step: 1,
      title: "Upload Your Document",
      description: "Drag and drop or select an image or PDF file to upload",
      icon: <Upload className="h-6 w-6 text-primary" />
    },
    {
      step: 2,
      title: "AI Processing",
      description: "Our advanced AI analyzes and extracts text from your document",
      icon: <Cpu className="h-6 w-6 text-primary" />
    },
    {
      step: 3,
      title: "Get Results",
      description: "View, edit, and download the extracted text in seconds",
      icon: <FileText className="h-6 w-6 text-primary" />
    }
  ];

  const displaySteps = steps || defaultSteps;

  // Animation for the flow line
  const flowLineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
        repeatDelay: 1
      }
    }
  };

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent inline-block">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
            Our OCR process is simple, fast, and accurate.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
          {/* Animated connection lines for desktop */}
          <div className="hidden md:block absolute top-1/3 left-1/3 right-1/3 z-0">
            <svg width="100%" height="4" viewBox="0 0 100 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M0 2H100"
                stroke="hsl(var(--primary) / 0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                variants={flowLineVariants}
                initial="hidden"
                animate="visible"
              />
            </svg>
          </div>
          
          {displaySteps.map((item, index) => (
            <motion.div 
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
            >
              <Card className={`h-full transition-all duration-300 ${hoveredStep === index ? 'shadow-xl border-primary' : 'shadow-md'}`}>
                <CardHeader>
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    animate={hoveredStep === index ? { scale: 1.1, backgroundColor: 'rgba(var(--primary), 0.2)' } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon ? (
                      <motion.div
                        animate={hoveredStep === index ? { rotate: 360 } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                    ) : (
                      <span className="text-xl font-bold text-primary">{item.step}</span>
                    )}
                  </motion.div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardContent>
              </Card>
              
              {index < displaySteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-8 w-8 text-primary/50" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}        </div>
      </Container>
    </section>
  );
}
