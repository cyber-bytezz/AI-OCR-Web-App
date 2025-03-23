"use client";

import * as React from "react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export function FileDropzone({ onFileSelect, isLoading }: FileDropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length > 0 && !isLoading) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect, isLoading]
  );

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'application/pdf': ['.pdf']
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false)
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative grid h-56 w-full place-items-center overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300",
        isDragActive
          ? "border-primary/70 bg-primary/5 shadow-lg scale-[1.02]"
          : "border-primary/20 hover:border-primary/40 hover:bg-secondary/20 hover:shadow-md",
        isDragReject && "border-destructive/50 bg-destructive/10"
      )}
    >
      <input {...getInputProps()} />

      <div className="grid place-items-center gap-3 text-center p-6">
        {isLoading ? (
          <div className="grid place-items-center gap-3">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-75"></div>
              <Loader2 className="h-10 w-10 animate-spin text-primary relative z-10" />
            </div>
            <p className="text-base font-medium text-muted-foreground">Processing your document...</p>
          </div>
        ) : isDragActive ? (
          <div className="grid place-items-center gap-3">
            <div className="bg-primary/10 p-4 rounded-full">
              <Cloud className="h-10 w-10 text-primary animate-bounce" />
            </div>
            <p className="text-base font-medium">Drop your file here</p>
            <p className="text-sm text-muted-foreground">Release to upload</p>
          </div>
        ) : (
          <div className="grid place-items-center gap-4">
            <div className="bg-primary/5 p-5 rounded-full border border-primary/10 shadow-sm">
              <File className="h-10 w-10 text-primary" />
            </div>
            <div className="max-w-[200px] text-center space-y-1">
              <p className="text-base font-medium">Drop your file here or</p>
              <Button
                variant="link"
                className="h-auto p-0 text-base text-primary font-medium hover:underline"
              >
                click to upload
              </Button>
            </div>
            <p className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
              Supports JPEG, PNG, WebP and PDF
            </p>
          </div>
        )}
      </div>
    </div>
  );
}