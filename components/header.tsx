"use client";

import { useState, useEffect } from "react";
import { Menu, X, Scan, Zap, Globe, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle component mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "OCR Tool", href: "/ocr-tool" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
  ];
  
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <motion.header 
      className={cn(
        "sticky top-0 z-50 py-3 transition-all duration-300 overflow-hidden",
        scrolled 
          ? "bg-background/90 backdrop-blur-md border-b border-border/30 shadow-lg" 
          : "bg-gradient-to-r from-background via-background/95 to-background/90 backdrop-blur-sm"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-40" />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-1 h-1 bg-primary/40 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-primary/30 rounded-full"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-6 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-3 group relative" aria-label="Home">
          <div className="relative w-[180px] h-[50px] overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }}
              transition={{ duration: 0.5 }}
              className="absolute -left-3 -top-3 w-12 h-12 bg-primary/10 rounded-full blur-xl z-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }}
              transition={{ duration: 0.5 }}>
              <Image 
                src="/logo.svg" 
                alt="OCR AI Logo" 
                width={180}
                height={50}
                priority
                className="object-contain z-10 drop-shadow-sm"
              />
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -10 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="hidden sm:flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">AI Powered</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <motion.nav 
            className="relative bg-background/40 backdrop-blur-sm px-5 py-2.5 rounded-full border border-border/30 shadow-md overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -10 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            role="navigation"
            aria-label="Main Navigation"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
            <ul className="flex items-center gap-2 relative z-10">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -10 }}
                  transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                >
                  <Link 
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 font-medium text-sm transition-all duration-300 rounded-full flex items-center gap-1.5 overflow-hidden group",
                      isActive(item.href) 
                        ? "text-primary-foreground bg-primary shadow-md" 
                        : "text-foreground hover:text-primary hover:bg-muted/80"
                    )}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.name === "Home" ? (
                      <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : item.name === "OCR Tool" ? (
                      <Scan className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : item.name === "Features" ? (
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{item.name}</span>
                    {!isActive(item.href) && (
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
          <div className="flex items-center gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div 
                className="absolute inset-0 bg-primary/5 rounded-full blur-lg opacity-0"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.2, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
              />
              <ThemeToggle />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div 
                className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
              />
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-medium rounded-full px-6 border border-primary/20 relative overflow-hidden group"
              >
                <Link href="/ocr-tool" className="flex items-center gap-2">
                  <motion.span
                    className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ 
                      x: ['-100%', '100%'],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatType: "loop",
                      ease: "linear"
                    }}
                  />
                  <Scan className="h-4 w-4" aria-hidden="true" />
                  <span>Try Now</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeToggle />
          </motion.div>
          <motion.button
            onClick={toggleMenu}
            className="p-2.5 text-foreground bg-gradient-to-r from-background to-muted/30 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-full border border-border/40 shadow-md relative overflow-hidden"
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="absolute inset-0 bg-primary/5 opacity-0"
              animate={{ 
                opacity: isMenuOpen ? 0.5 : 0,
                scale: isMenuOpen ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-primary/10 rounded-full opacity-0"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0, 0.2, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "loop" 
              }}
            />
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t bg-background/95 backdrop-blur-md shadow-xl relative z-10 overflow-hidden"
            role="navigation"
            aria-label="Mobile Navigation"
          >
            {/* Mobile menu decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-50" />
              <motion.div 
                className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary/20 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-primary/20 rounded-full"
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [0.1, 0.4, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </div>
            
            <nav className="container py-8 px-6 relative z-10">
              <ul className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 text-base transition-all duration-200 block py-3 px-5 rounded-xl relative overflow-hidden group",
                        isActive(item.href) 
                          ? "bg-primary/10 text-primary font-medium border border-primary/20 shadow-sm" 
                          : "text-foreground hover:text-primary hover:bg-muted/50 border border-transparent"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-primary/5 opacity-0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%", opacity: 0.5 }}
                        transition={{ duration: 0.3 }}
                      />
                      {item.name === "Home" ? (
                        <Globe className="h-5 w-5" aria-hidden="true" />
                      ) : item.name === "OCR Tool" ? (
                        <Scan className="h-5 w-5" aria-hidden="true" />
                      ) : item.name === "Features" ? (
                        <Sparkles className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Zap className="h-5 w-5" aria-hidden="true" />
                      )}
                      <span className="relative z-10">{item.name}</span>
                      <motion.div 
                        className="ml-auto h-2 w-2 rounded-full bg-primary/40 opacity-0"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: isActive(item.href) ? [0.4, 0.7, 0.4] : 0
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.li>
                ))}
                <motion.li 
                  className="pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 font-medium py-6 rounded-xl border border-primary/20 relative overflow-hidden group" 
                    asChild
                    size="lg"
                  >
                    <Link href="/ocr-tool" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2">
                      <motion.span
                        className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ 
                          x: ['-100%', '100%'],
                          opacity: [0, 0.3, 0]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          repeatType: "loop",
                          ease: "linear"
                        }}
                        aria-hidden="true"
                      />
                      <Scan className="h-5 w-5" aria-hidden="true" />
                      <span>Try Now</span>
                    </Link>
                  </Button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}