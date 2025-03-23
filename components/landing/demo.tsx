"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface DocumentType {
  name: string;
  image: string;
  description: string;
}

interface DemoProps {
  documentTypes: DocumentType[];
}

export function Demo({ documentTypes }: DemoProps) {
  const [activeTab, setActiveTab] = useState(documentTypes[0].name.toLowerCase());
  
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background overflow-hidden" aria-labelledby="demo-heading" role="region">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="demo-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent inline-block">See It In Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
            Try our OCR with different document types to see how it works.
          </p>
        </motion.div>
        
        <Tabs 
          defaultValue={documentTypes[0].name.toLowerCase()} 
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          onValueChange={setActiveTab}
        >
          <div className="relative mb-12">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-full blur-xl -z-10 opacity-70"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto relative z-10" aria-label="Document types">
              {documentTypes.map((type) => (
                <TabsTrigger 
                  key={type.name} 
                  value={type.name.toLowerCase()}
                  className="relative overflow-hidden transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  role="tab"
                  aria-selected={activeTab === type.name.toLowerCase()}
                >
                  {type.name}
                  {activeTab === type.name.toLowerCase() && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTabLine"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {documentTypes.map((type) => (
            <TabsContent key={type.name} value={type.name.toLowerCase()} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center px-4 sm:px-6 lg:px-8">
                <motion.div 
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-xl border border-primary/20"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 rounded-xl z-10" />
                  <Image 
                    src={type.image} 
                    alt={type.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-contain p-4"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-20">
                    <Sparkles className="h-3 w-3" />
                    {type.name} Sample
                  </div>
                </motion.div>
                
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{type.name} OCR</h3>
                  <p className="text-lg text-muted-foreground">{type.description}</p>
                  
                  <div className="space-y-3 sm:space-y-4 mt-6">
                    {[1, 2, 3].map((i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div 
                          className="bg-primary/20 p-2 rounded-full"
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--primary), 0.3)' }}
                        >
                          <Check className="h-5 w-5 text-primary" />
                        </motion.div>
                        <p className="font-medium">
                          {type.name === "Receipts" 
                            ? ["Vendor detection", "Item extraction", "Total calculation"][i-1]
                            : type.name === "Documents"
                              ? ["Layout preservation", "Table extraction", "Formatting retention"][i-1]
                              : ["Handwriting recognition", "Multiple styles support", "Contextual correction"][i-1]}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="pt-4"
                  >
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
                      asChild
                    >
                      <Link href="/ocr-tool">
                        Try {type.name} OCR <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </section>
  );
}