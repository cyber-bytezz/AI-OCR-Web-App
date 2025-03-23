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
    <div className="w-full max-w-xs space-y-5 mb-6">
      <div className="space-y-2">
        <label htmlFor="docType" className="text-sm font-medium text-muted-foreground">Document Type</label>
        <select
          id="docType"
          className="w-full p-2.5 border border-input rounded-lg bg-background/50 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/30 outline-none transition-all duration-200"
          value={documentType}
          onChange={(e) => handleDocumentTypeChange(e.target.value as OCROptions['documentType'])}
          disabled={isLoading}
        >
          <option value="document">General Document</option>
          <option value="receipt">Receipt</option>
          <option value="handwritten">Handwritten Text</option>
          <option value="card">Card/ID</option>
        </select>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
          <input
            type="checkbox"
            id="enhance"
            checked={enhancePreprocessing}
            onChange={(e) => handleEnhanceChange(e.target.checked)}
            disabled={isLoading}
            className="rounded border-primary/30 text-primary h-4 w-4 focus:ring-primary/20"
          />
          <label htmlFor="enhance" className="text-sm font-medium cursor-pointer select-none">Enhance Image Quality</label>
        </div>
        
        <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
          <input
            type="checkbox"
            id="tables"
            checked={extractTables}
            onChange={(e) => handleTablesChange(e.target.checked)}
            disabled={isLoading}
            className="rounded border-primary/30 text-primary h-4 w-4 focus:ring-primary/20"
          />
          <label htmlFor="tables" className="text-sm font-medium cursor-pointer select-none">Extract Tables</label>
        </div>
      </div>
    </div>
  );
}