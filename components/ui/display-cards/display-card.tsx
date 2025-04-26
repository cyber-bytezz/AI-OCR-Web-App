"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  titleClassName?: string;
}

export function DisplayCard({
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