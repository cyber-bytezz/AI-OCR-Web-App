"use client";


import { Header } from "@/components/header";
import { Features, Demo, HowItWorks, Testimonials, Footer, CTA, Hero } from "@/components/landing";
import { Zap, Shield, BarChart } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Lightning Fast OCR",
    description: "Extract text from images in seconds with our advanced AI-powered OCR technology"
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Privacy Focused",
    description: "Your documents are processed securely and never stored without your permission"
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Smart Analysis",
    description: "Automatically detect and extract structured data from receipts, IDs, and more"
  }
];

const testimonials = [
  {
    quote: "This OCR tool saved me hours of manual data entry. The accuracy is impressive!",
    author: "Sarah J., Small Business Owner"
  },
  {
    quote: "I use it daily to digitize receipts for expense tracking. Game changer for my workflow.",
    author: "Michael T., Freelancer"
  },
  {
    quote: "The table extraction feature is perfect for our research team analyzing documents.",
    author: "Dr. Lisa Chen, Research Lead"
  }
];

const documentTypes = [
  {
    name: "Receipts",
    image: "/recipt.webp",
    description: "Automatically extract vendor, date, items, and totals from receipts"
  },
  {
    name: "Documents",
    image: "/doc.webp",
    description: "Convert printed documents to editable text with high accuracy"
  },
  {
    name: "Handwritten",
    image: "/hand.webp",
    description: "Recognize handwritten notes and convert them to digital text"
  }
];

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features features={features} />
        <CTA />
        <Demo documentTypes={documentTypes} />
        <HowItWorks />
        <Testimonials testimonials={testimonials} />
      </main>
      <Footer />
    </div>
  );
}