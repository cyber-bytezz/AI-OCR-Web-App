"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImagePreviewProps {
  preview: string | null;
  onClear: () => void;
  isLoading: boolean;
}

export function ImagePreview({ preview, onClear, isLoading }: ImagePreviewProps) {
  if (!preview) return null;

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <Image
        src={preview}
        alt="Preview"
        width={320}
        height={256}
        className="w-full h-auto max-h-64 object-contain rounded-md"
      />
      <Button
        variant="outline"
        size="sm"
        className="mt-2 w-full"
        onClick={(e) => {
          e.stopPropagation();
          onClear();
        }}
        disabled={isLoading}
      >
        Change Image
      </Button>
    </div>
  );
}