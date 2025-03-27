import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { ocr } from 'llama-ocr';

interface OCROptions {
  enhancePreprocessing?: boolean;
  documentType?: 'receipt' | 'document' | 'handwritten' | 'card';
  extractTables?: boolean;
  language?: 'english' | 'tamil' | 'auto';
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

// ⬇️ Call to FastAPI Tamil OCR
const callTamilOCR = async (filePath: string): Promise<string> => {
  const res = await fetch('http://127.0.0.1:5001/tamil-ocr', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file_path: filePath }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.detail || 'Tamil OCR failed');
  }

  const data = await res.json();
  return data.markdown;
};

export async function POST(req: NextRequest) {
  try {
    const { filePath, options = {} }: { filePath: string; options: OCROptions } = await req.json();

    if (!filePath) {
      return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
    }

    const localFilePath = path.join(process.cwd(), 'public', filePath);

    // ✅ Use FastAPI OCR if Tamil
    if (options.language === 'tamil') {
      const markdown = await callTamilOCR(localFilePath);
      return NextResponse.json({ markdown });
    }

    // ✅ Default llama-ocr configuration
    const ocrConfig: OCRConfig = {
      filePath: localFilePath,
      apiKey: process.env.TOGETHER_API_KEY,
      model: process.env.OCR_MODEL || 'Llama-3.2-90B-Vision',
      temperature: 0.7,
      maxTokens: 1000,
    };

    if (options.documentType) {
      const prompts = {
        receipt: 'Extract items, prices, and total from this receipt.',
        document: 'Extract and structure the main content from this document.',
        handwritten: 'Carefully transcribe this handwritten text.',
        card: 'Extract key information from this card.',
      };
      ocrConfig.systemPrompt = prompts[options.documentType];
    }

    if (options.enhancePreprocessing) {
      ocrConfig.preprocessingOptions = {
        denoise: true,
        deskew: true,
        contrast: true,
      };
    }

    if (options.extractTables) {
      ocrConfig.extractTables = true;
      ocrConfig.tableFormat = 'markdown';
    }

    const markdown = await ocr({
      filePath: ocrConfig.filePath,
      apiKey: ocrConfig.apiKey,
      model: ocrConfig.model as "Llama-3.2-90B-Vision" | "Llama-3.2-11B-Vision" | "free",
    });

    return NextResponse.json({ markdown });

  } catch (error) {
    console.error('OCR error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({
      error: 'OCR processing failed',
      details: errorMessage,
      status: 'error',
    }, { status: 500 });
  }
}

