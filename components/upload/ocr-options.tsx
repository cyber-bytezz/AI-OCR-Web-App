"use client";

import { OCROptions } from "@/types/ocr";

interface OCROptionsProps {
  documentType: OCROptions['documentType'];
  enhancePreprocessing: boolean;
  extractTables: boolean;
  onOptionsChange: (options: OCROptions) => void;
  isLoading: boolean;
}

export function OCROptionsForm({
  documentType,
  enhancePreprocessing,
  extractTables,
  onOptionsChange,
  isLoading
}: OCROptionsProps) {
  const handleDocumentTypeChange = (value: OCROptions['documentType']) => {
    onOptionsChange({
      documentType: value,
      enhancePreprocessing,
      extractTables
    });
  };

  const handleEnhanceChange = (value: boolean) => {
    onOptionsChange({
      documentType,
      enhancePreprocessing: value,
      extractTables
    });
  };

  const handleTablesChange = (value: boolean) => {
    onOptionsChange({
      documentType,
      enhancePreprocessing,
      extractTables: value
    });
  };

  return (
    <div className="w-full max-w-xs space-y-4 mb-4">
      <select
        className="w-full p-2 border rounded-md bg-background"
        value={documentType}
        onChange={(e) => handleDocumentTypeChange(e.target.value as OCROptions['documentType'])}
        disabled={isLoading}
      >
        <option value="document">General Document</option>
        <option value="receipt">Receipt</option>
        <option value="handwritten">Handwritten Text</option>
        <option value="card">Card/ID</option>
      </select>
      
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="enhance"
          checked={enhancePreprocessing}
          onChange={(e) => handleEnhanceChange(e.target.checked)}
          disabled={isLoading}
          className="rounded border-gray-300"
        />
        <label htmlFor="enhance" className="text-sm">Enhance Image Quality</label>
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="tables"
          checked={extractTables}
          onChange={(e) => handleTablesChange(e.target.checked)}
          disabled={isLoading}
          className="rounded border-gray-300"
        />
        <label htmlFor="tables" className="text-sm">Extract Tables</label>
      </div>
    </div>
  );
}