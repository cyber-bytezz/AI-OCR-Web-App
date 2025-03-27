"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-primary/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
        scale: 1,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-primary/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const benefits = [
    { text: "Instant text extraction", delay: 0.3, color: "from-yellow-400 to-amber-500", icon: "⚡" },
    { text: "99% accuracy rate", delay: 0.4, color: "from-green-400 to-emerald-500", icon: <CheckCircle className="h-4 w-4 text-white" /> },
    { text: "Support for 50+ languages", delay: 0.5, color: "from-blue-400 to-indigo-500", icon: "🌐" },
    { text: "Table & layout preservation", delay: 0.6, color: "from-purple-400 to-violet-500", icon: "📊" }
  ];

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.12] via-transparent to-primary/[0.15] blur-3xl" />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* More particles with varied animations */}
        {[...Array(12)].map((_, i) => {
          // Use deterministic values based on index instead of random
          const size = 1 + (i % 3) + 1;
          const posX = (i * 8.33) % 100; // Distribute evenly across 100%
          const posY = (i * 7.7) % 100;  // Distribute evenly with offset
          const duration = 2 + (i % 3);  // 2-4 seconds duration
          const delay = (i * 0.2) % 2;   // 0-1.8 seconds delay
          const opacity = 10 + (i % 20); // 10-29 opacity value
          
          return (
            <motion.div 
              key={i}
              className={`absolute bg-primary/${opacity} rounded-full`}
              style={{ 
                top: `${posY}%`, 
                left: `${posX}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              animate={{ 
                y: [0, -15, 0],
                x: [0, (i % 10) - 5, 0], // Deterministic x movement
                scale: [1, 1 + ((i % 10) / 10), 1], // Deterministic scale
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{ 
                duration: duration, 
                repeat: Infinity, 
                delay: delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
        
        {/* Larger glowing particles */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary/40 rounded-full shadow-lg shadow-primary/20"
          animate={{ 
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.8, 0.3],
            boxShadow: [
              "0 0 5px 0px rgba(var(--primary), 0.3)",
              "0 0 20px 5px rgba(var(--primary), 0.5)",
              "0 0 5px 0px rgba(var(--primary), 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-primary/30 rounded-full shadow-lg shadow-primary/20"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.2, 0.7, 0.2],
            boxShadow: [
              "0 0 5px 0px rgba(var(--primary), 0.2)",
              "0 0 25px 8px rgba(var(--primary), 0.4)",
              "0 0 5px 0px rgba(var(--primary), 0.2)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/2 w-2.5 h-2.5 bg-primary/35 rounded-full shadow-lg shadow-primary/20"
          animate={{ 
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.7, 0.2],
            boxShadow: [
              "0 0 5px 0px rgba(var(--primary), 0.2)",
              "0 0 15px 5px rgba(var(--primary), 0.4)",
              "0 0 5px 0px rgba(var(--primary), 0.2)"
            ]
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-primary/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-primary/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-primary/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-primary/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-primary/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <Container className="relative z-10 mx-auto px-4 sm:px-5 md:px-6 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="max-w-3xl md:flex-1 text-center md:text-left mx-auto md:mx-0">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/[0.03] border border-primary/[0.08] mb-6"
            >
              <Circle className="h-2 w-2 fill-primary" />
              <span className="text-sm text-primary/80 tracking-wide">
                AI-Powered OCR Technology
              </span>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                <motion.span 
                  className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80 relative inline-block"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Transform Images
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary/60 to-transparent rounded-full shadow-sm shadow-primary/20"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                  <motion.div
                    className="absolute -inset-1 bg-primary/5 rounded-lg blur-lg z-[-1] opacity-0"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
                  />
                </motion.span>
                <br />
                <motion.span
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r from-primary/90 via-primary to-primary/80 relative inline-block"
                  )}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Into Text with AI
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary/60 to-transparent rounded-full shadow-sm shadow-primary/20"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  />
                  <motion.div
                    className="absolute -inset-1 bg-primary/10 rounded-lg blur-lg z-[-1] opacity-0"
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "loop", delay: 1.5 }}
                  />
                </motion.span>
              </h1>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="bg-gradient-to-r from-muted-foreground via-muted-foreground/90 to-muted-foreground bg-clip-text"
                >
                  Our advanced OCR technology extracts text from images, receipts, and documents with 
                  <span className="text-primary font-medium"> incredible accuracy</span> and
                  <span className="text-primary font-medium"> lightning speed</span>.
                </motion.span>
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 mx-auto sm:mx-0 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-primary/5 transition-all duration-300 backdrop-blur-sm border border-primary/10 shadow-sm hover:shadow-md"
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.4, delay: benefit.delay }}
                  whileHover={{ x: 5, scale: 1.03, backgroundColor: 'rgba(var(--primary), 0.08)' }}
                >
                  <div className={`bg-gradient-to-br ${benefit.color} p-3 rounded-full flex items-center justify-center relative group shadow-md`}>
                    <motion.div 
                      className="absolute inset-0 bg-white/30 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.div
                      className="absolute -inset-1 rounded-full blur-md opacity-0 group-hover:opacity-70"
                      style={{ background: `linear-gradient(to bottom right, var(--${benefit.color.split('-')[1]}), transparent)` }}
                      animate={{ scale: [0.9, 1.1, 0.9] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-white text-sm relative z-10">{benefit.icon}</span>
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="font-medium text-sm">{benefit.text}</span>
                    <span className="text-xs text-muted-foreground opacity-80 mt-1">AI-powered feature</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center sm:justify-start"
            >
              <Button size="lg" asChild className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group rounded-xl px-5 py-2.5 h-auto">
                <Link href="/ocr-tool" className="flex items-center">
                  <span className="font-medium text-sm">Get Started Now</span>
                  <motion.div 
                    className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 opacity-0 group-hover:opacity-100"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                  />
                  <motion.span 
                    className="ml-2 flex items-center"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="relative overflow-hidden border-primary/20 hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 group rounded-xl px-5 py-2.5 h-auto">
                <span className="font-medium text-sm">Learn More</span>
                <motion.div 
                  className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute inset-0 border border-primary/30 rounded-xl opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>
            </motion.div>
          </div>
          
          <HeroImage />
        </div>
      </Container>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </section>
  );
}

function HeroImage() {
  return (
    <motion.div 
      className="md:flex-1 relative h-[300px] sm:h-[350px] md:h-[450px] w-full max-w-[500px] mx-auto md:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-primary/20 mt-8 md:mt-0 group"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-primary/30 rounded-2xl z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-tr from-primary/20 to-transparent blur-2xl z-0 opacity-0 group-hover:opacity-100 transition-all duration-500" 
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <Image 
        src="/hero.webp" 
        alt="OCR Document Example"
        fill
        priority
        className="object-cover transition-transform duration-10000 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
        <motion.p 
          className="font-medium text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Intelligent Document Processing
        </motion.p>
        <motion.p 
          className="text-sm opacity-90 mt-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Extract text, tables, and data automatically
        </motion.p>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-gradient-to-br from-green-400/90 to-emerald-500/90 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/40 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.08, y: -5 }}
      >
        <motion.div 
          className="absolute -inset-0.5 bg-white/20 rounded-xl blur-md z-0 opacity-0"
          animate={{ opacity: [0, 0.5, 0], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="text-xs font-medium text-white">Accuracy Rate</div>
        <div className="text-2xl font-bold text-white flex items-center gap-1">
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            99%
          </motion.span> 
          <span className="text-sm opacity-90">✓</span>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute top-16 sm:top-24 left-4 sm:left-6 bg-gradient-to-br from-blue-400/90 to-indigo-500/90 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/40 shadow-xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.08, x: 5 }}
      >
        <motion.div 
          className="absolute -inset-0.5 bg-white/20 rounded-xl blur-md z-0 opacity-0"
          animate={{ opacity: [0, 0.5, 0], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <div className="text-xs font-medium text-white">Languages</div>
        <div className="text-2xl font-bold text-white flex items-center gap-1">
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
          >
            50+
          </motion.span> 
          <span className="text-sm opacity-90">🌐</span>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 sm:bottom-24 right-4 sm:right-6 bg-gradient-to-br from-yellow-400/90 to-amber-500/90 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/40 shadow-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        whileHover={{ scale: 1.08, rotate: 2 }}
      >
        <motion.div 
          className="absolute -inset-0.5 bg-white/20 rounded-xl blur-md z-0 opacity-0"
          animate={{ opacity: [0, 0.5, 0], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <div className="text-xs font-medium text-white">Processing Time</div>
        <div className="text-2xl font-bold text-white flex items-center gap-1">
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.6 }}
          >
            2s
          </motion.span> 
          <span className="text-sm opacity-90">⚡</span>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 sm:bottom-24 left-4 sm:left-6 bg-gradient-to-br from-purple-400/90 to-violet-500/90 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/40 shadow-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        whileHover={{ scale: 1.08, rotate: -2 }}
      >
        <motion.div 
          className="absolute -inset-0.5 bg-white/20 rounded-xl blur-md z-0 opacity-0"
          animate={{ opacity: [0, 0.5, 0], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
        <div className="text-xs font-medium text-white">Table Support</div>
        <div className="text-2xl font-bold text-white flex items-center gap-1">
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.9 }}
          >
            Yes
          </motion.span> 
          <span className="text-sm opacity-90">📊</span>
        </div>
      </motion.div>
    </motion.div>
  );
}