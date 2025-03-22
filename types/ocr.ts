export interface OCROptions {
  enhancePreprocessing: boolean;
  documentType: 'receipt' | 'document' | 'handwritten' | 'card';
  extractTables: boolean;
}

export interface FileUploadProps {
  onFileSelect: (file: File, options: OCROptions) => void;
  isLoading: boolean;
}