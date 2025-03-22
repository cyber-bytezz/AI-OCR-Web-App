import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { ocr } from 'llama-ocr';

interface OCROptions {
  enhancePreprocessing?: boolean;
  documentType?: 'receipt' | 'document' | 'handwritten' | 'card';
  extractTables?: boolean;
}

interface OCRConfig {
  filePath: string;
  apiKey: string | undefined;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt?: string;
  preprocessingOptions?: {
    denoise: boolean;
    deskew: boolean;
    contrast: boolean;
  };
  extractTables?: boolean;
  tableFormat?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { filePath, options = {} } = await req.json() as { filePath: string; options?: OCROptions };
    if (!filePath) {
      return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
    }

    // Construct absolute path
    const localFilePath = path.join(process.cwd(), 'public', filePath);
    console.log('Local file path for OCR:', localFilePath);

    // Configure OCR options based on document type and preprocessing preferences
    const ocrConfig: OCRConfig = {
      filePath: localFilePath,
      apiKey: process.env.TOGETHER_API_KEY,
      model: process.env.OCR_MODEL || 'Llama-3.2-90B-Vision',
      temperature: 0.7,
      maxTokens: 1000,
    };

    // Add document type specific prompts
    if (options.documentType) {
      const prompts = {
        receipt: 'Extract items, prices, and total from this receipt.',
        document: 'Extract and structure the main content from this document.',
        handwritten: 'Carefully transcribe this handwritten text.',
        card: 'Extract key information from this card.'
      };
      ocrConfig.systemPrompt = prompts[options.documentType];
    }

    // Enable enhanced preprocessing if requested
    if (options.enhancePreprocessing) {
      ocrConfig.preprocessingOptions = {
        denoise: true,
        deskew: true,
        contrast: true
      };
    }

    // Enable table extraction if requested
    if (options.extractTables) {
      ocrConfig.extractTables = true;
      ocrConfig.tableFormat = 'markdown';
    }

    const markdown = await ocr({
      filePath: ocrConfig.filePath,
      apiKey: ocrConfig.apiKey,
      model: ocrConfig.model as "Llama-3.2-90B-Vision" | "Llama-3.2-11B-Vision" | "free"
    });
    return NextResponse.json({ markdown });

  } catch (error) {
    console.error('OCR error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ 
      error: 'OCR processing failed', 
      details: errorMessage,
      status: 'error'
    }, { status: 500 });
  }
}
