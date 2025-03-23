"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
      <Container>
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Documents?</h2>
          <p className="text-xl text-muted-foreground">
            Start using our OCR tool today and experience the power of AI-driven text extraction.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" asChild>
              <Link href="/ocr-tool">
                Try It Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}