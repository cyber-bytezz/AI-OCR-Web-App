"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

interface ImagePreviewProps {
  preview: string | null;
  onClear: () => void;
  isLoading: boolean;
}

export function ImagePreview({ preview, onClear, isLoading }: ImagePreviewProps) {
  if (!preview) return null;

  return (
    <motion.div 
      className="relative w-full max-w-xs mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div 
        className="relative overflow-hidden rounded-lg shadow-md border border-primary/10 bg-muted/20"
        whileHover={{ scale: 1.03, rotate: 0.5 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Image
            src={preview}
            alt="Preview"
            width={320}
            height={256}
            className="w-full h-auto max-h-64 object-contain p-2"
          />
        </motion.div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <motion.span 
              className="text-xs font-medium text-white bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              Preview Image
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          disabled={isLoading}
        >
          Change Image
        </Button>
      </motion.div>
    </motion.div>
  );
}