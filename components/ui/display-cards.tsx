"use client";

import { DisplayCard } from "./display-cards/display-card";
import { MobileCards } from "./display-cards/mobile-cards";
import { DesktopCards } from "./display-cards/desktop-cards";
import { Sparkles } from "lucide-react";

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className: "[grid-area:stack] scale-100 z-30 border-blue-500/30 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/30 grayscale-[30%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 sm:transform-gpu sm:transition-colors sm:duration-500 sm:ease-in-out sm:hover:shadow-xl sm:hover:shadow-blue-500/20 sm:after:bg-gradient-to-l sm:after:from-blue-500/5 sm:after:to-transparent",
      title: "Lightning Fast OCR",
      description: "Extract text from images in seconds with our advanced AI-powered OCR technology",
      date: "Active",
      icon: <Sparkles className="size-5 text-blue-300" />,
      titleClassName: "text-blue-500"
    },
    {
      className: "[grid-area:stack] ml-4 sm:ml-12 scale-95 z-20 border-slate-500/30 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/40 grayscale-[60%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 hover:border-slate-500/50 hover:shadow-lg hover:shadow-slate-500/10 sm:transform-gpu sm:transition-colors sm:duration-500 sm:ease-in-out sm:hover:shadow-xl sm:hover:shadow-slate-500/20 sm:after:bg-gradient-to-l sm:after:from-slate-500/5 sm:after:to-transparent",
      title: "Privacy Focused",
      description: "Your documents are processed securely and never stored without your permission",
      date: "Featured",
      icon: <span className="relative inline-block rounded-full bg-slate-800 p-1.5 shadow-inner flex-shrink-0">🛡️</span>,
      titleClassName: "text-slate-500"
    },
    {
      className: "[grid-area:stack] ml-8 sm:ml-24 scale-90 z-10 border-purple-500/30 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[90%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 sm:transform-gpu sm:transition-colors sm:duration-500 sm:ease-in-out sm:hover:shadow-xl sm:hover:shadow-purple-500/20 sm:after:bg-gradient-to-l sm:after:from-purple-500/5 sm:after:to-transparent",
      title: "Smart Analysis",
      description: "Automatically detect and extract structured data from receipts, IDs, and more",
      date: "Coming Soon",
      icon: <span className="relative inline-block rounded-full bg-purple-800 p-1.5 shadow-inner flex-shrink-0">📊</span>,
      titleClassName: "text-purple-500"
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 w-full px-2 sm:px-8 max-w-full h-[450px] sm:h-[500px]">
      <MobileCards cards={displayCards} />
      <DesktopCards cards={displayCards} />
    </div>
  );
}