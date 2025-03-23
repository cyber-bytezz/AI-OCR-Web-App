export interface OCROptions {
  enhancePreprocessing: boolean;
  documentType: 'receipt' | 'document' | 'handwritten' | 'card';
  extractTables: boolean;
  language?: 'english' | 'tamil' | 'auto';
}

export interface FileUploadProps {
  onFileSelect: (file: File, options: OCROptions) => void;
  isLoading: boolean;
}