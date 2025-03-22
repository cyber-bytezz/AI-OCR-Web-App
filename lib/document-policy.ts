import * as fs from 'fs/promises';
// Document handling and privacy policy implementation

export interface DocumentPolicy {
  allowedTypes: string[];
  maxFileSize: number;
  retentionPeriod: number;
  sensitiveDataTypes: string[];
}

export const documentPolicy: DocumentPolicy = {
  // Allowed document types for OCR processing
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf'
  ],
  
  // Maximum file size in bytes (10MB)
  maxFileSize: 10 * 1024 * 1024,
  
  // File retention period in milliseconds (24 hours)
  retentionPeriod: 24 * 60 * 60 * 1000,
  
  // Types of sensitive data to detect and handle
  sensitiveDataTypes: [
    'credit_card',
    'ssn',
    'bank_account',
    'passport_number',
    'drivers_license'
  ]
};

// Validate document against policy
export function validateDocument(file: File): { valid: boolean; error?: string } {
  if (!documentPolicy.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Document type not supported. Please upload an image (JPEG, PNG, WebP) or PDF file.'
    };
  }

  if (file.size > documentPolicy.maxFileSize) {
    return {
      valid: false,
      error: 'File size exceeds maximum limit of 10MB.'
    };
  }

  return { valid: true };
}

// Clean up expired documents
export async function cleanupExpiredDocuments(filePath: string): Promise<void> {
  try {
    const stats = await fs.stat(filePath);
    const fileAge = Date.now() - stats.birthtimeMs;
    
    if (fileAge > documentPolicy.retentionPeriod) {
      await fs.unlink(filePath);
    }
  } catch (error) {
    console.error('Error cleaning up document:', error);
  }
}

// Detect and redact sensitive information
export function detectSensitiveData(text: string): string {
  let redactedText = text;
  
  // Credit card numbers (simple pattern)
  redactedText = redactedText.replace(/\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g, '[REDACTED CARD NUMBER]');
  
  // SSN (simple pattern)
  redactedText = redactedText.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED SSN]');
  
  // Add more patterns for other sensitive data types as needed
  
  return redactedText;
}