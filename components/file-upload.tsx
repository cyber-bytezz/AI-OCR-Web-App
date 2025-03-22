"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileImage } from "lucide-react";
import { OCROptions } from "@/types/ocr";
import { OCROptionsForm } from "./upload/ocr-options";
import { ImagePreview } from "./upload/image-preview";

interface FileUploadProps {
  onFileSelect: (file: File, options: OCROptions) => void;
  isLoading: boolean;
}

export function FileUpload({ onFileSelect, isLoading }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<OCROptions['documentType']>('document');
  const [enhancePreprocessing, setEnhancePreprocessing] = useState(false);
  const [extractTables, setExtractTables] = useState(false);

  const handleOptionsChange = (options: OCROptions) => {
    setDocumentType(options.documentType);
    setEnhancePreprocessing(options.enhancePreprocessing);
    setExtractTables(options.extractTables);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        
        onFileSelect(file, {
          documentType,
          enhancePreprocessing,
          extractTables
        });
      }
    },
    [onFileSelect, documentType, enhancePreprocessing, extractTables]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    },
    maxFiles: 1,
    disabled: isLoading
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary/50"} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <OCROptionsForm
            documentType={documentType}
            enhancePreprocessing={enhancePreprocessing}
            extractTables={extractTables}
            onOptionsChange={handleOptionsChange}
            isLoading={isLoading}
          />
          <ImagePreview
            preview={preview}
            onClear={() => setPreview(null)}
            isLoading={isLoading}
          />
          {!preview && (
            <>
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <div>
                <p className="font-medium text-lg">Drag & drop your image here</p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse files
                </p>
              </div>
              <FileImage className="h-16 w-16 text-muted-foreground/50" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}