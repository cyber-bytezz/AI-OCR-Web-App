"use client";

import { OCROptions } from "@/types/ocr";

interface OCROptionsProps {
  documentType: OCROptions['documentType'];
  enhancePreprocessing: boolean;
  extractTables: boolean;
  language: OCROptions['language'];
  onOptionsChange: (options: OCROptions) => void;
  isLoading: boolean;
}

export function OCROptionsForm({
  documentType,
  enhancePreprocessing,
  extractTables,
  language,
  onOptionsChange,
  isLoading
}: OCROptionsProps) {

  const handleChange = (updatedOptions: Partial<OCROptions>) => {
    onOptionsChange({
      documentType,
      enhancePreprocessing,
      extractTables,
      language,
      ...updatedOptions
    });
  };

  return (
    <div className="w-full max-w-xs space-y-5 mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Document Type</label>
        <select
          className="w-full p-2.5 border border-input rounded-lg"
          value={documentType}
          onChange={(e) => handleChange({ documentType: e.target.value as OCROptions['documentType'] })}
          disabled={isLoading}
        >
          <option value="document">General Document</option>
          <option value="receipt">Receipt</option>
          <option value="handwritten">Handwritten Text</option>
          <option value="card">Card/ID</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">OCR Language</label>
        <select
          className="w-full p-2.5 border border-input rounded-lg"
          value={language}
          onChange={(e) => handleChange({ language: e.target.value as OCROptions['language'] })}
          disabled={isLoading}
        >
          <option value="english">English/General OCR</option>
          <option value="tamil">Tamil OCR</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={enhancePreprocessing}
          onChange={(e) => handleChange({ enhancePreprocessing: e.target.checked })}
          disabled={isLoading}
          className="rounded"
        />
        <label className="text-sm font-medium">Enhance Image Quality</label>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={extractTables}
          onChange={(e) => handleChange({ extractTables: e.target.checked })}
          disabled={isLoading}
          className="rounded"
        />
        <label className="text-sm font-medium">Extract Tables</label>
      </div>
    </div>
  );
}
