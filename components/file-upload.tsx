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
  const [language, setLanguage] = useState<OCROptions['language']>('english');

  const handleOptionsChange = (options: OCROptions) => {
    setDocumentType(options.documentType);
    setEnhancePreprocessing(options.enhancePreprocessing);
    setExtractTables(options.extractTables);
    setLanguage(options.language);
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
          extractTables,
          language
        });
      }
    },
    [onFileSelect, documentType, enhancePreprocessing, extractTables, language]
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
    <div className="w-full space-y-6">
      {/* Move OCROptionsForm OUTSIDE dropzone */}
      <OCROptionsForm
        documentType={documentType}
        enhancePreprocessing={enhancePreprocessing}
        extractTables={extractTables}
        language={language}
        onOptionsChange={handleOptionsChange}
        isLoading={isLoading}
      />

      {/* Dropzone UI */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${isDragActive ? "border-primary bg-primary/10 scale-[1.01]" : "border-primary/20 hover:border-primary/40 hover:bg-muted/20"} ${isLoading ? "opacity-80 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <ImagePreview
            preview={preview}
            onClear={() => setPreview(null)}
            isLoading={isLoading}
          />
          {!preview && (
            <>
              <div className="p-5 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 shadow-md border border-primary/10">
                <Upload className="h-12 w-12 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="font-medium text-xl">Drag & drop your image here</p>
                <p className="text-base text-muted-foreground">
                  or click to browse files
                </p>
              </div>
              <div className="bg-muted/30 px-4 py-2 rounded-full mt-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <FileImage className="h-4 w-4" />
                  Supports JPEG, PNG, WebP and PDF
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
