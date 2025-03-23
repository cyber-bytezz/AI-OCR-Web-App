"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const benefits = [
    { text: "Instant text extraction", delay: 0.3 },
    { text: "99% accuracy rate", delay: 0.4 },
    { text: "Support for 50+ languages", delay: 0.5 }
  ];

  return (
    <section className="pt-2 md:pt-4 pb-12 overflow-hidden bg-gradient-to-b from-primary/15 via-primary/5 to-background relative">
      <Container className="relative max-w-6xl mx-auto">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-primary/10 rounded-full blur-3xl opacity-40 animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-primary/15 rounded-full blur-2xl opacity-20 animate-pulse delay-500" />
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-25 animate-pulse delay-700" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 pt-2 md:pt-4">
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tracking-tight leading-tight">
                Transform Images into Text with AI
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our advanced OCR technology extracts text from images, receipts, and documents with incredible accuracy.
            </motion.p>
            
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: benefit.delay }}
                >
                  <div className="bg-primary/10 p-1 rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button size="default" asChild className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Link href="/ocr-tool">
                  Get Started <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
              <Button size="default" variant="outline" className="border-primary/20 hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1">
                Learn More
              </Button>
            </motion.div>
          </div>
          
          <HeroImage />
        </div>
      </Container>
    </section>
  );
}

function HeroImage() {
  return (
    <motion.div 
      className="flex-1 relative h-[350px] w-full rounded-xl overflow-hidden shadow-xl border border-primary/10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-primary/20 rounded-xl z-10" />
      <Image 
        src="/hero.webp" 
        alt="OCR Document Example"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <p className="font-medium text-lg">Intelligent Document Processing</p>
        <p className="text-xs opacity-90 mt-1">Extract text, tables, and data automatically</p>
      </div>
    </motion.div>
  );
}