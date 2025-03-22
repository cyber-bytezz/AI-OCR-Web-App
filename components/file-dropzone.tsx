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
        "relative grid h-48 w-full place-items-center overflow-hidden rounded-lg border-2 border-dashed transition-colors duration-200",
        isDragActive
          ? "border-primary/50 bg-secondary/50"
          : "border-muted-foreground/25 hover:bg-secondary/25",
        isDragReject && "border-destructive/50 bg-destructive/10"
      )}
    >
      <input {...getInputProps()} />

      <div className="grid place-items-center gap-2 text-center">
        {isLoading ? (
          <div className="grid place-items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Processing...</p>
          </div>
        ) : isDragActive ? (
          <div className="grid place-items-center gap-2">
            <Cloud className="h-8 w-8 text-primary animate-bounce" />
            <p className="text-sm font-medium">Drop your file here</p>
          </div>
        ) : (
          <div className="grid place-items-center gap-2">
            <File className="h-8 w-8 text-muted-foreground" />
            <div className="max-w-[160px] text-center">
              <p className="text-sm font-medium">Drop your file here or</p>
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-primary"
              >
                click to upload
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Supports JPEG, PNG, WebP and PDF
            </p>
          </div>
        )}
      </div>
    </div>
  );
}