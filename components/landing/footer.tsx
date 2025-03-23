"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import Link from "next/link";
import { FileImage } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 bg-gradient-to-b from-background to-muted/30">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/15 p-3 rounded-xl shadow-sm group">
                <FileImage className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-200" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                OCR AI - Document Reader
              </h3>
            </div>
            <p className="text-muted-foreground">
              Transform your documents into editable text with our powerful AI-driven OCR technology.
            </p>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ocr-tool" className="text-muted-foreground hover:text-primary transition-colors">
                  OCR Tool
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-bold text-lg">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-bold text-lg">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                Email: support@ocrai.com
              </li>
              <li className="text-muted-foreground">
                Phone: +1 (555) 123-4567
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 pt-8 border-t text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>© {currentYear} OCR AI - Document Reader. All rights reserved.</p>
        </motion.div>
      </Container>
    </footer>
  );
}