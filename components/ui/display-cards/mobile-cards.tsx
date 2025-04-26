"use client";

import { DisplayCard, DisplayCardProps } from "./display-card";

interface MobileCardsProps {
  cards: DisplayCardProps[];
}

export function MobileCards({ cards }: MobileCardsProps) {
  return (
    <div className="sm:hidden w-full max-w-full relative space-y-6 py-4 flex flex-col items-center">
      {cards.map((cardProps, index) => {
        const mobileProps = {
          ...cardProps,
          className: 'fade-in-50 duration-500'
        };
        return <DisplayCard key={`mobile-${index}`} {...mobileProps} />;
      })}
    </div>
  );
}