"use client";

import { FileImage } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="border-b py-6 mb-8 bg-gradient-to-r from-primary/20 via-accent/10 to-transparent backdrop-blur-sm transition-all duration-300">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/15 p-3 rounded-xl shadow-sm hover:shadow-md hover:bg-primary/20 transition-all duration-200 group">
            <FileImage className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-200" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            OCR AI - Document Reader
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}