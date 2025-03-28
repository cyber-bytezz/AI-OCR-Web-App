"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-auto min-h-36 w-full max-w-[18rem] sm:max-w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-3 sm:px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2 sm:hover:shadow-xl sm:hover:shadow-blue-500/5 sm:transition-all sm:duration-500 sm:ease-in-out sm:backdrop-blur-md sm:hover:backdrop-blur-lg sm:hover:bg-gradient-to-br sm:hover:from-muted/80 sm:hover:to-muted/60",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-base sm:text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="text-sm sm:text-base break-words whitespace-normal overflow-hidden">{description}</p>
      <p className="text-xs sm:text-sm text-muted-foreground">{date}</p>
    </div>
  );
}

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
      {/* Mobile view - cards stacked vertically with fixed positioning */}
      <div className="sm:hidden w-full max-w-full relative space-y-6 py-4 flex flex-col items-center">
        {displayCards.map((cardProps, index) => {
          // Create a modified version of props for mobile view
          const mobileProps = {
            ...cardProps,
            className: (cardProps.className?.replace(/translate-[xy]-\d+|hover:translate-[xy]-\d+/g, '') || '') + ' fade-in-50 duration-500'
          };
          return <DisplayCard key={`mobile-${index}`} {...mobileProps} />;
        })}
      </div>
      
      {/* Desktop view - 3D stacked cards with enhanced effects */}
      <div className="hidden sm:block transform-gpu w-full max-w-full relative perspective-[1500px]">
        {displayCards.map((cardProps, index) => (
          <DisplayCard key={`desktop-${index}`} {...cardProps} />
        ))}
      </div>
    </div>
  );
}