"use client";

import { DisplayCard, DisplayCardProps } from "./display-card";

interface DesktopCardsProps {
  cards: DisplayCardProps[];
}

export function DesktopCards({ cards }: DesktopCardsProps) {
  return (
    <div className="hidden sm:block transform-gpu w-full max-w-full relative perspective-[1500px]">
      {cards.map((cardProps, index) => (
        <DisplayCard key={`desktop-${index}`} {...cardProps} />
      ))}
    </div>
  );
}